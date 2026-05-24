import { Suspense } from "react";
import AuthShell from "@/components/auth-shell";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="text-black/40 text-sm">Carregando…</div>}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
