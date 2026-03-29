import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FAQ.module.css';

const FAQS = [
  {
    q: 'What is BrandDesk?',
    a: 'BrandDesk is a customer support inbox built specifically for Shopify merchants. It connects to your Gmail, automatically imports customer emails, and gives you a clean dashboard to reply, track SLAs, and manage multiple brands. BrandDesk is a subsidiary of PLEXZUU.',
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
    a: 'Absolutely. BrandDesk (a PLEXZUU subsidiary) does not use any kind of customer data. All data is fully encrypted at rest using AES-256-GCM and in transit using TLS 1.2+. We use Google OAuth — we never see or store your Google password. Each workspace\'s data is logically isolated and Gmail tokens are stored separately and encrypted.',
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

  useEffect(() => {
    document.title = 'FAQ — BrandDesk by PLEXZUU';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);

  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Frequently asked questions</h1>
          <p className={styles.subtitle}>
            Everything you need to know about BrandDesk. Can't find the answer you're looking for? <Link to="/contact">Contact us</Link>.
          </p>
          <div className={styles.list} role="list">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-btn-${i}`;
              return (
                <div key={i} className={styles.item} role="listitem">
                  <button
                    id={buttonId}
                    className={styles.question}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {faq.q}
                    <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>+</span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                  >
                    <div className={styles.answerInner}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cta}>
            <p>Still have questions? We're happy to help.</p>
            <Link to="/contact" className={styles.ctaLink}>Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
