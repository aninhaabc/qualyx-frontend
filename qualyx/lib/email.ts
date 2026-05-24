/**
 * Envio de email transacional via SendGrid.
 *
 * Sem SENDGRID_API_KEY configurado → imprime no console (modo dev).
 * Com a key configurada → envia de verdade.
 */
import sgMail from "@sendgrid/mail";

const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "anabc1@al.insper.edu.br";
const FROM_NAME = process.env.SENDGRID_FROM_NAME || "Qualyx";

if (SENDGRID_KEY) {
  sgMail.setApiKey(SENDGRID_KEY);
}

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailInput) {
  if (!SENDGRID_KEY) {
    console.log("\n===== [DEV] Email (SendGrid não configurado) =====");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("HTML:\n", html);
    console.log("==================================================\n");
    return { ok: true, mode: "console" as const };
  }

  await sgMail.send({
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    html,
    text: text || stripHtml(html),
  });
  return { ok: true, mode: "sendgrid" as const };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

// ---------- Templates ----------

const INK_900 = "#0b1220";
const INK_600 = "#4b5266";
const CIANO = "#75e8e5";

export function welcomeEmailTemplate({
  name,
  plan,
  magicLink,
  loginEmail,
}: {
  name: string;
  plan: string;
  magicLink: string;
  loginEmail: string;
}) {
  const planLabel: Record<string, string> = {
    free: "Gratuito",
    pro: "Pro",
    enterprise: "Enterprise",
  };

  return `
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Bem-vindo à Qualyx</title>
</head>
<body style="margin:0;padding:0;background:#e1e6e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK_900};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#e1e6e7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <div style="display:inline-block;padding:10px 16px;background:linear-gradient(135deg,${CIANO} 0%,#8bdae8 50%,#91c9eb 100%);border-radius:14px;color:#0b1220;font-weight:700;font-size:18px;letter-spacing:-0.01em;">
                Qualyx
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <h1 style="margin:0;font-size:26px;line-height:1.25;letter-spacing:-0.02em;color:${INK_900};font-weight:700;">
                Olá, ${escapeHtml(name)} — sua conta está pronta.
              </h1>
              <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;color:${INK_600};">
                Obrigado por escolher a Qualyx. Você criou uma conta no plano
                <strong style="color:${INK_900};">${planLabel[plan] || plan}</strong>.
                Clique no botão abaixo para acessar seu dashboard.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:14px;background:linear-gradient(135deg,${CIANO} 0%,#8bdae8 50%,#91c9eb 100%);">
                    <a href="${magicLink}"
                       style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#0b1220;text-decoration:none;border-radius:14px;">
                      Acessar meu dashboard →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0 0;font-size:13px;color:${INK_600};line-height:1.6;">
                Ou copie e cole este link no navegador:<br>
                <span style="color:#0b6c8f;word-break:break-all;">${magicLink}</span>
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;color:${INK_600};">
                Este link é válido por <strong>24 horas</strong> e é de uso único.
              </p>
            </td>
          </tr>

          <!-- Credentials -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <div style="background:#f5f7f8;border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:18px 20px;">
                <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${INK_600};font-weight:600;">
                  Seus dados de acesso
                </div>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:10px;font-size:14px;color:${INK_900};">
                  <tr>
                    <td style="padding:4px 16px 4px 0;color:${INK_600};">Email:</td>
                    <td><strong>${escapeHtml(loginEmail)}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding:4px 16px 4px 0;color:${INK_600};">Senha:</td>
                    <td>a que você definiu no cadastro</td>
                  </tr>
                </table>
                <p style="margin:12px 0 0 0;font-size:12px;color:${INK_600};line-height:1.5;">
                  Para acessos futuros, use
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/login" style="color:#0b6c8f;text-decoration:none;">
                    qualyx.ai/login
                  </a>.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:18px;">
                <p style="margin:0;font-size:12px;color:${INK_600};line-height:1.6;">
                  Não foi você quem criou esta conta? Pode ignorar este email — nada será cobrado.
                </p>
                <p style="margin:12px 0 0 0;font-size:11px;color:${INK_600};">
                  © ${new Date().getFullYear()} Qualyx · QA para agentes de IA
                </p>
              </div>
            </td>
          </tr>
        </table>

        <p style="margin:20px 0 0 0;font-size:11px;color:rgba(0,0,0,0.4);">
          Você recebeu este email porque se cadastrou na Qualyx.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
