import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  createMagicToken,
  createUser,
  findUserByEmail,
  type Plan,
} from "@/lib/users";
import { sendEmail, welcomeEmailTemplate } from "@/lib/email";

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  company: z.string().trim().min(2, "Empresa muito curta").max(120),
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres").max(200),
  plan: z.enum(["free", "pro", "enterprise"]),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message || "Dados inválidos" },
      { status: 400 }
    );
  }
  const { name, company, email, password, plan } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Já existe uma conta com este email. Faça login." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    email: email.toLowerCase(),
    name,
    company,
    passwordHash,
    plan: plan as Plan,
  });

  const token = await createMagicToken(user.id);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const magicLink = `${appUrl}/auth/magic?token=${encodeURIComponent(token)}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Bem-vindo à Qualyx — acesse sua conta",
      html: welcomeEmailTemplate({
        name: user.name,
        plan: user.plan,
        magicLink,
        loginEmail: user.email,
      }),
    });
  } catch (err) {
    // Não falha o cadastro se o email falhar — o usuário ainda pode logar.
    console.error("Falha ao enviar email de boas-vindas:", err);
  }

  return NextResponse.json(
    {
      status: "ok",
      message:
        "Conta criada. Enviamos um email com o link de acesso ao seu dashboard.",
      cliente_id: user.cliente_id,
    },
    { status: 201 }
  );
}
