import { useState } from 'react';

const FAQS = [
  {
    q: 'What is BrandDesk?',
    a: 'BrandDesk is a customer support inbox built specifically for Shopify merchants. It connects to your Gmail, automatically imports customer emails, and gives you a clean dashboard to reply, track SLAs, and manage multiple brands.',
  },
  {
    q: 'How does it connect to my email?',
    a: 'BrandDesk uses Google OAuth to securely connect to your Gmail or Google Workspace account. We only access emails in the labels you specify — we never read your personal mail.',
  },
  {
    q: 'Can I manage multiple brands/stores?',
    a: 'Yes! You can add multiple brands, each with its own Gmail label and email address. Filter tickets by brand and send replies from the correct address.',
  },
  {
    q: 'What happens during the free trial?',
    a: 'You get full access to the Trial tier for 14 days — 1 brand, 200 threads/month, templates, and AI tools. No credit card needed. Upgrade anytime to unlock more.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is encrypted in transit (HTTPS) and isolated per workspace. We use Google OAuth — we never see or store your Google password. Each workspace\'s Gmail tokens are stored separately.',
  },
  {
    q: 'Can I invite team members?',
    a: 'Yes. On the Starter plan you can have up to 3 team members, and on Pro you get unlimited. Team members can be assigned admin or agent roles.',
  },
  {
    q: 'Do you support Shopify order lookups?',
    a: 'Yes. BrandDesk can connect to your Shopify store to look up order details directly from the ticket panel.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. You can cancel or downgrade your plan at any time from the billing page. Your data stays intact if you decide to come back.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <main style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, textAlign: 'center', marginBottom: 40 }}>
          Frequently asked questions
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', padding: '18px 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: 15, fontWeight: 600, color: 'var(--text)',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                {faq.q}
                <span style={{ fontSize: 18, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 16 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: 18, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
