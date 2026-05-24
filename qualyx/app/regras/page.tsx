import { getSession } from "@/lib/session";
import RulesPage from "@/components/rules/rules-page";

export const dynamic = "force-dynamic";

export default async function Regras() {
  const session = (await getSession())!;
  return (
    <RulesPage
      clienteId={session.cliente_id}
      userName={session.name}
      userEmail={session.email}
    />
  );
}
