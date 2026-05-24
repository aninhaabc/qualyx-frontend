/**
 * Storage simples de usuários e tokens em arquivo JSON.
 *
 * Em produção: substitua estas funções por queries SQL no MySQL que o backend
 * já usa. Os tipos `User` e `MagicToken` mapeiam direto para as tabelas
 * sugeridas no README. Nenhum outro código toca o arquivo JSON.
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const TOKENS_FILE = path.join(DATA_DIR, "magic-tokens.json");

export type Plan = "free" | "pro" | "enterprise";

export type User = {
  id: string;
  cliente_id: number; // ID numérico usado pelo backend FastAPI
  email: string;
  name: string;
  company: string;
  passwordHash: string;
  plan: Plan;
  emailVerified: boolean;
  createdAt: string;
};

export type MagicToken = {
  token: string;
  userId: string;
  expiresAt: number; // ms epoch
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await ensureDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// ---------- Users ----------

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await readJson<User[]>(USERS_FILE, []);
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await readJson<User[]>(USERS_FILE, []);
  return users.find((u) => u.id === id) || null;
}

export async function createUser(
  input: Omit<User, "id" | "cliente_id" | "createdAt" | "emailVerified">
): Promise<User> {
  const users = await readJson<User[]>(USERS_FILE, []);

  // cliente_id sequencial — o mesmo ID que o backend FastAPI espera.
  const maxClienteId = users.reduce((m, u) => Math.max(m, u.cliente_id), 0);

  const user: User = {
    ...input,
    id: crypto.randomUUID(),
    cliente_id: maxClienteId + 1,
    emailVerified: false,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeJson(USERS_FILE, users);
  return user;
}

export async function markEmailVerified(userId: string) {
  const users = await readJson<User[]>(USERS_FILE, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return;
  users[idx].emailVerified = true;
  await writeJson(USERS_FILE, users);
}

// ---------- Magic tokens (link enviado por email) ----------

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24; // 24h

export async function createMagicToken(userId: string): Promise<string> {
  const tokens = await readJson<MagicToken[]>(TOKENS_FILE, []);
  const now = Date.now();
  // expira tokens antigos enquanto está aqui
  const fresh = tokens.filter((t) => t.expiresAt > now);

  const token = crypto.randomBytes(32).toString("base64url");
  fresh.push({ token, userId, expiresAt: now + TOKEN_TTL_MS });
  await writeJson(TOKENS_FILE, fresh);
  return token;
}

export async function consumeMagicToken(token: string): Promise<string | null> {
  const tokens = await readJson<MagicToken[]>(TOKENS_FILE, []);
  const now = Date.now();
  const found = tokens.find((t) => t.token === token && t.expiresAt > now);
  if (!found) return null;

  // single-use: remove o token usado
  const remaining = tokens.filter((t) => t.token !== token);
  await writeJson(TOKENS_FILE, remaining);
  return found.userId;
}
