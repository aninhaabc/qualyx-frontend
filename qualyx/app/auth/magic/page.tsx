import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { consumeMagicToken, findUserById, markEmailVerified } from "@/lib/users";
import { createSession } from "@/lib/session";

export const dynamic = "force-dynamic";

// Next.js 16: searchParams é uma Promise
export default async function MagicPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <Invalid reason="Link inválido. O token não foi fornecido." />;
  }

  const userId = await consumeMagicToken(token);
  if (!userId) {
    return (
      <Invalid reason="Este link expirou ou já foi utilizado. Faça login com seu email e senha." />
    );
  }

  const user = await findUserById(userId);
  if (!user) {
    return <Invalid reason="Conta não encontrada." />;
  }

  await markEmailVerified(user.id);
  await createSession({
    userId: user.id,
    cliente_id: user.cliente_id,
    email: user.email,
    name: user.name,
    plan: user.plan,
  });

  redirect("/dashboard?welcome=1");
}

function Invalid({ reason }: { reason: string }) {
  return (
    <main className="min-h-screen grid place-items-center bg-[#e1e6e7] px-6">
      <div className="card-soft p-8 max-w-md w-full text-center">
        <div className="mx-auto mb-3 inline-block">
          <Image src="/img/Logo_Typo_Colored 1.png" alt="Qualyx" width={140} height={45} />
        </div>
        <h1 className="text-xl font-bold text-[#0b1220] mt-2">Link inválido</h1>
        <p className="mt-3 text-sm text-black/60">{reason}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link href="/login" className="btn btn-primary">Ir para o login</Link>
          <Link href="/signup" className="btn btn-secondary">Criar nova conta</Link>
        </div>
      </div>
    </main>
  );
}
