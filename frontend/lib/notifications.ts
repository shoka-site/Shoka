// ---------------------------------------------------------------------------
// Email notifications via Resend.
// Used to alert the admin team when a new consultation is submitted.
//
// Required env vars:
//   RESEND_API_KEY      — API key from resend.com dashboard
//   RESEND_FROM_EMAIL   — Verified sender domain, e.g. notifications@sehle.site
//   NOTIFICATION_EMAIL  — Recipient address, defaults to sehle.iq@gmail.com
// ---------------------------------------------------------------------------

import { logger } from './logger';

interface ConsultationPayload {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(data: ConsultationPayload): string {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin/consultations`;
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br>');
  const safeCompany = data.company ? escapeHtml(data.company) : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:sans-serif;background:#f9f9f9;padding:24px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
    <div style="background:#000;padding:24px 32px">
      <h1 style="color:#fff;margin:0;font-size:20px">New Consultation Request</h1>
    </div>
    <div style="padding:32px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;font-weight:600;color:#555;width:110px">Name</td>
          <td style="padding:8px 0;color:#111">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600;color:#555">Email</td>
          <td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#0070f3">${safeEmail}</a></td>
        </tr>
        ${safeCompany ? `<tr><td style="padding:8px 0;font-weight:600;color:#555">Company</td><td style="padding:8px 0;color:#111">${safeCompany}</td></tr>` : ''}
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
      <p style="font-weight:600;color:#555;margin:0 0 8px">Message</p>
      <p style="background:#f5f5f5;padding:16px;border-radius:6px;color:#333;margin:0;line-height:1.6">${safeMessage}</p>
      <div style="margin-top:24px;text-align:center">
        <a href="${adminUrl}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px">
          View in Admin Panel →
        </a>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}

// ---------------------------------------------------------------------------
// Confirmation email to the person who submitted (Email Sequence §16 — Email 1)
// ---------------------------------------------------------------------------
function buildConfirmationHtml(data: Pick<ConsultationPayload, 'name'>): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sehle.site';
  const safeName = escapeHtml(data.name);
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:sans-serif;background:#0a0a0a;padding:24px;margin:0;color:#fff">
  <div style="max-width:560px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid rgba(194,164,92,0.2)">
    <div style="background:linear-gradient(135deg,#000 0%,#1a1200 100%);padding:32px;text-align:center">
      <img src="${siteUrl}/logoo.png" alt="Sehle" width="80" style="margin:0 auto 16px" />
      <h1 style="color:#c2a45c;margin:0;font-size:22px;font-weight:900;letter-spacing:0.05em">WE'VE GOT YOUR MESSAGE</h1>
    </div>
    <div style="padding:32px">
      <p style="color:#e0e0e0;font-size:16px;line-height:1.7;margin:0 0 16px">Hi <strong style="color:#c2a45c">${safeName}</strong>,</p>
      <p style="color:#aaa;font-size:15px;line-height:1.7;margin:0 0 24px">
        Thank you for reaching out to <strong style="color:#fff">Sehle</strong>. One of our team members will review your inquiry and get back to you <strong style="color:#c2a45c">within 24 hours</strong>.
      </p>
      <div style="background:#1a1a1a;border-left:3px solid #c2a45c;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px">
        <p style="margin:0;color:#aaa;font-size:13px;line-height:1.6">
          <strong style="color:#c2a45c;display:block;margin-bottom:4px">What happens next?</strong>
          1. Our team reviews your request (today)<br/>
          2. A specialist will reach out to schedule a free call<br/>
          3. We prepare a tailored proposal — no commitment needed
        </p>
      </div>
      <div style="text-align:center;margin-top:28px">
        <a href="${siteUrl}/services" style="display:inline-block;background:linear-gradient(135deg,#c2a45c,#8a6d2d);color:#000;text-decoration:none;padding:14px 28px;border-radius:100px;font-size:13px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase">Explore Our Services →</a>
      </div>
    </div>
    <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
      <p style="color:#555;font-size:11px;margin:0">Sehle · Digital Systems &amp; Software Solutions · Iraq</p>
      <p style="color:#555;font-size:11px;margin:4px 0 0"><a href="mailto:global@sehle.site" style="color:#c2a45c">global@sehle.site</a></p>
    </div>
  </div>
</body>
</html>`.trim();
}

async function sendConfirmationEmail(data: ConsultationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // Silently skip if Resend not configured

  const from = process.env.RESEND_FROM_EMAIL ?? 'notifications@sehle.site';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: data.email,
        subject: `We received your message, ${data.name} — Sehle`,
        html: buildConfirmationHtml({ name: data.name }),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Resend API responded with ${response.status}: ${body}`);
    }
    logger.info('Confirmation email sent to submitter', { toEmail: data.email });
  } catch (err) {
    logger.error('Failed to send confirmation email', {
      error: err instanceof Error ? err.message : String(err),
      toEmail: data.email,
    });
  }
}

export async function sendConsultationNotification(data: ConsultationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Non-fatal: log a warning and continue. The consultation is still saved.
    logger.warn('RESEND_API_KEY not configured — skipping consultation notification', {
      fromEmail: data.email,
    });
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'notifications@sehle.site';
  const to = process.env.NOTIFICATION_EMAIL ?? 'sehle.iq@gmail.com';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: `[Sehle] New consultation from ${data.name}`,
        html: buildEmailHtml(data),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Resend API responded with ${response.status}: ${body}`);
    }

    logger.info('Consultation notification sent', { to, fromEmail: data.email });
  } catch (err) {
    // Notification failure must NEVER propagate — the consultation was already
    // saved successfully. The admin will see it in the dashboard.
    logger.error('Failed to send consultation notification', {
      error: err instanceof Error ? err.message : String(err),
      fromEmail: data.email,
    });
  }

  // Email Sequence §16 — Email 1: Confirmation email to the submitter.
  // Fire-and-forget alongside the admin notification.
  sendConfirmationEmail(data);
}
