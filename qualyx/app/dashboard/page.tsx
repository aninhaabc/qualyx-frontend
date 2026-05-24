import { getSession } from "@/lib/session";
import DashboardPreview from "@/components/dashboard-preview";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const session = (await getSession())!; // garantido pelo layout
  const { welcome } = await searchParams;

  return (
    <main className="min-h-screen bg-[#e1e6e7]">
      <DashboardPreview
        clienteId={session.cliente_id}
        userName={session.name}
        userEmail={session.email}
        plan={session.plan}
        showWelcome={welcome === "1"}
      />
    </main>
  );
}
