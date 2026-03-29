import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Contact.module.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us — BrandDesk by PLEXZUU';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${API_URL}/api/demo/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: form.subject || 'Contact Form',
          contact_name: form.name,
          contact_email: form.email,
          message: form.message,
          brand_type: 'contact-form',
        }),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className={styles.root}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.successTitle}>Message Sent!</h1>
            <p className={styles.successDesc}>
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <div className={styles.successActions}>
              <Link to="/" className={styles.backBtn}>← Back to Home</Link>
              <Link to="/faq" className={styles.pricingBtn}>Browse FAQ</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left — Info */}
          <div className={styles.infoSide}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>
              Have a question, feedback, or need help? We'd love to hear from you.
              Fill out the form and our team will respond within 24 hours.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Email</div>
                  <div className={styles.benefitDesc}>branddesk@plexzuu.com</div>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Response time</div>
                  <div className={styles.benefitDesc}>We respond within 24 hours on business days</div>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Help Center</div>
                  <div className={styles.benefitDesc}>Check our <Link to="/faq" style={{ color: 'var(--accent)' }}>FAQ</Link> for instant answers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  className={styles.input}
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  className={styles.input}
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  className={styles.textarea}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  rows={5}
                  required
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting || !form.name.trim() || !form.email.trim() || !form.message.trim()}
              >
                {submitting ? (
                  <>
                    <span className={styles.spinner} />
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>

              <p className={styles.note}>
                Or email us directly at branddesk@plexzuu.com
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
