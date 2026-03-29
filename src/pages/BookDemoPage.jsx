import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitDemoRequest } from '../utils/api';
import styles from '../styles/BookDemo.module.css';

const BRAND_TYPES = [
  'Fashion & Apparel',
  'Electronics & Gadgets',
  'Health & Beauty',
  'Home & Living',
  'Food & Beverages',
  'Sports & Fitness',
  'Jewelry & Accessories',
  'Pet Supplies',
  'SaaS / Digital Products',
  'Other',
];

const EMPTY_FORM = {
  brand_name: '',
  brand_type: '',
  platform: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  website: '',
  message: '',
};

export default function BookDemoPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Book a Demo — BrandDesk by PLEXZUU';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.brand_name.trim() || !form.contact_name.trim() || !form.contact_email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await submitDemoRequest(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
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
            <h1 className={styles.successTitle}>Demo Request Submitted!</h1>
            <p className={styles.successDesc}>
              Thank you for your interest in BrandDesk. Our team will review your request and
              get in touch within 24 hours to schedule your personalized demo.
            </p>
            <div className={styles.successActions}>
              <Link to="/" className={styles.backBtn}>← Back to Home</Link>
              <Link to="/pricing" className={styles.pricingBtn}>View Pricing</Link>
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
            <h1 className={styles.title}>Book a Demo</h1>
            <p className={styles.subtitle}>
              See how BrandDesk can streamline your customer support.
              Get a personalized walkthrough tailored to your brand.
            </p>

            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Personalized walkthrough</div>
                  <div className={styles.benefitDesc}>See features tailored to your brand's needs</div>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Setup guidance</div>
                  <div className={styles.benefitDesc}>Learn how to connect Gmail, Shopify, and more</div>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>Q&A session</div>
                  <div className={styles.benefitDesc}>Get answers to all your questions from our team</div>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>◉</span>
                <div>
                  <div className={styles.benefitTitle}>No commitment</div>
                  <div className={styles.benefitDesc}>Completely free, no credit card required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Tell us about your brand</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Brand / Company Name *</label>
                <input
                  className={styles.input}
                  placeholder="e.g. MyStore"
                  value={form.brand_name}
                  onChange={e => handleChange('brand_name', e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Brand Type</label>
                  <select
                    className={styles.input}
                    value={form.brand_type}
                    onChange={e => handleChange('brand_type', e.target.value)}
                  >
                    <option value="">Select type...</option>
                    {BRAND_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Platform *</label>
                  <select
                    className={styles.input}
                    value={form.platform}
                    onChange={e => handleChange('platform', e.target.value)}
                    required
                  >
                    <option value="">Select platform...</option>
                    <option value="shopify">Shopify</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Person Name *</label>
                <input
                  className={styles.input}
                  placeholder="Your full name"
                  value={form.contact_name}
                  onChange={e => handleChange('contact_name', e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email *</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="you@example.com"
                    value={form.contact_email}
                    onChange={e => handleChange('contact_email', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="+91 9876543210"
                    value={form.contact_phone}
                    onChange={e => handleChange('contact_phone', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Website URL</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="www.yourstore.com"
                  value={form.website}
                  onChange={e => handleChange('website', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Anything specific you'd like to see?</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Tell us about your support workflow, team size, or specific features you're interested in..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  rows={3}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting || !form.brand_name.trim() || !form.contact_name.trim() || !form.contact_email.trim() || !form.platform}
              >
                {submitting ? (
                  <>
                    <span className={styles.spinner} />
                    Submitting...
                  </>
                ) : 'Request a Demo'}
              </button>

              <p className={styles.note}>
                We'll get back to you within 24 hours to schedule your demo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
