import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  createBrand, submitOnboarding, fetchWorkspaceStatus,
  fetchGmailAccounts, linkGmail, getGmailConnectUrl, getShopifyConnectUrl,
} from '../utils/api';
import styles from '../styles/Onboarding.module.css';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const STEPS = ['Brand Details', 'Connect Services', 'Pending Review'];

const CATEGORIES = [
  'Fashion & Apparel',
  'Electronics & Gadgets',
  'Health & Beauty',
  'Home & Living',
  'Food & Beverages',
  'Sports & Fitness',
  'Toys & Kids',
  'Books & Education',
  'Jewelry & Accessories',
  'Pet Supplies',
  'Other',
];

export default function OnboardingWizard() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [brandId, setBrandId] = useState(null);
  const [shopifyConnected, setShopifyConnected] = useState(false);

  // Grab token from URL on first load
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('bd_token', token);
      window.history.replaceState({}, '', '/onboarding');
    } else if (!localStorage.getItem('bd_token')) {
      window.location.href = '/';
    }
  }, []);

  // Handle resume or status redirect from login gate
  useEffect(() => {
    const resume = searchParams.get('resume');
    const statusParam = searchParams.get('status');
    const authSuccess = searchParams.get('auth');
    const shopifyParam = searchParams.get('shopify');
    const stepParam = searchParams.get('step');

    // Handle trial duplicate errors
    const authError = searchParams.get('auth_error');
    const shopifyError = searchParams.get('shopify_error');
    if (authError === 'gmail_already_used') {
      setStep(1);
      setError('This Gmail account is already connected to another workspace. Each Gmail can only be used for one trial.');
      resumeFromStatus();
      window.history.replaceState({}, '', '/onboarding');
      return;
    }
    if (shopifyError === 'store_already_used') {
      setStep(1);
      setError('This Shopify store is already connected to another workspace. Each store can only be used for one trial.');
      resumeFromStatus();
      window.history.replaceState({}, '', '/onboarding');
      return;
    }

    // Redirected back from Gmail or Shopify OAuth
    if ((authSuccess === 'success' || shopifyParam === 'connected') && stepParam === '2') {
      // Immediately show step 1 so user doesn't see step 0 flash
      setStep(1);
      resumeFromStatus();
      window.history.replaceState({}, '', '/onboarding');
      return;
    }

    // Redirected from login gate with a status
    if (statusParam) {
      mapStatusToStep(statusParam);
      window.history.replaceState({}, '', '/onboarding');
      return;
    }

    // Resuming from a dropped session
    if (resume === '1') {
      resumeFromStatus();
      window.history.replaceState({}, '', '/onboarding');
    }
  }, []);

  const [rejectionReason, setRejectionReason] = useState('');

  const mapStatusToStep = (s, brand) => {
    if (brand?.brand_status === 'rejected') {
      setStep(2);
      setIsPending(true);
      setRejectionReason(brand.rejection_reason || '');
      if (brand?.id) setBrandId(brand.id);
    } else if (s === 'pending_approval' || s === 'approved') {
      setStep(2);
      setIsPending(true);
      setRejectionReason('');
      if (brand?.id) setBrandId(brand.id);
    } else if (s === 'details_submitted' || s === 'connections_done') {
      setStep(1);
      if (brand?.id) setBrandId(brand.id);
    } else {
      // not_started or unknown — check if there's a draft brand
      if (brand?.id) {
        setBrandId(brand.id);
        setStep(1);
      } else {
        setStep(0);
      }
    }
  };

  const resumeFromStatus = () => {
    const token = localStorage.getItem('bd_token');
    if (!token) { window.location.href = '/'; return; }
    fetchWorkspaceStatus()
      .then(({ data }) => {
        if (data.brand?.id) setBrandId(data.brand.id);
        mapStatusToStep(data.onboarding_status, data.brand);
      })
      .catch(() => {
        // Don't reset step on error — keep whatever step we're on
      });
  };

  const handleBrandCreated = (id) => {
    setBrandId(id);
    setStep(1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--accent)" />
            <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Inter, sans-serif">B</text>
          </svg>
          BrandDesk
        </div>

        {/* Progress */}
        <div className={styles.progress}>
          {STEPS.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div className={`${styles.progressLine} ${i <= step ? styles.done : ''}`} />
              )}
              <div className={`${styles.progressStep} ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <span className={styles.progressDot}>
                  {i < step ? '✓' : i + 1}
                </span>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {step === 0 && <StepBrandDetails onBrandCreated={handleBrandCreated} setError={setError} />}
        {step === 1 && <StepConnectServices brandId={brandId} setBrandId={setBrandId} setError={setError} setStep={setStep} setIsPending={setIsPending} setShopifyConnected={setShopifyConnected} />}
        {step === 2 && <StepPendingReview isPending={isPending} shopifyConnected={shopifyConnected} rejectionReason={rejectionReason} />}
      </div>
    </div>
  );
}

/* ─── Step 0: Brand Details ─── */
function StepBrandDetails({ onBrandCreated, setError }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    email: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in Brand Name and Support Email.');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await createBrand({
        name: form.name.trim(),
        email: form.email.trim(),
        category: form.category || null,
        website: form.website.trim() || null,
      });
      onBrandCreated(data.id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save brand details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className={styles.stepTitle}>Tell us about your brand</h2>
      <p className={styles.stepDesc}>
        We'll use this to set up your support inbox.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Brand Name *</label>
          <input
            name="name"
            placeholder="e.g. MyStore"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{
              width: '100%', padding: '10px 12px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              fontSize: 14, background: 'var(--bg)', color: 'var(--text)',
            }}
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Support Email *</label>
          <input
            name="email"
            type="email"
            placeholder="e.g. support@mystore.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Website <span className={styles.optional}>(optional)</span></label>
          <input
            name="website"
            placeholder="e.g. https://mystore.com"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.connectBtn} disabled={submitting}>
          {submitting ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </>
  );
}

/* ─── Step 1: Connect Services ─── */
function StepConnectServices({ brandId, setBrandId, setError, setStep, setIsPending, setShopifyConnected: setParentShopifyConnected }) {
  const [gmailAccounts, setGmailAccounts] = useState([]);
  const [selectedGmail, setSelectedGmail] = useState('');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyStore, setShopifyStore] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  // Track the effective brand ID (from prop or discovered from status)
  const [effectiveBrandId, setEffectiveBrandId] = useState(brandId);

  // Always fetch workspace status on mount — the API uses the JWT, not brandId
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchWorkspaceStatus().catch(() => ({ data: {} })),
      fetchGmailAccounts().catch(() => ({ data: [] })),
    ])
      .then(([statusRes, gmailRes]) => {
        const brand = statusRes.data?.brand;
        if (brand) {
          setGmailConnected(!!brand.gmail_token_id);
          setShopifyConnected(!!brand.shopify_connected);
          setParentShopifyConnected?.(!!brand.shopify_connected);
          if (brand.shopify_store) setShopifyStore(brand.shopify_store);
          // Recover brandId if parent doesn't have it yet
          if (!brandId && brand.id) {
            setEffectiveBrandId(brand.id);
            setBrandId?.(brand.id);
          }
        }
        setGmailAccounts(gmailRes.data || []);
      })
      .finally(() => setLoading(false));
  }, []); // Run once on mount

  // Also re-check when brandId prop changes (e.g. parent discovers it)
  useEffect(() => {
    if (brandId && brandId !== effectiveBrandId) {
      setEffectiveBrandId(brandId);
    }
  }, [brandId]);

  const currentBrandId = effectiveBrandId || brandId;

  const handleLinkExistingGmail = async (gmailTokenId) => {
    setError('');
    if (!currentBrandId) { setError('Brand not found. Please go back and try again.'); return; }
    try {
      await linkGmail(currentBrandId, gmailTokenId);
      setGmailConnected(true);
      setSelectedGmail(gmailTokenId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to link Gmail account.');
    }
  };

  const handleConnectNewGmail = () => {
    setError('');
    if (!currentBrandId) { setError('Brand not found. Please go back and try again.'); return; }
    window.location.href = getGmailConnectUrl(currentBrandId);
  };

  const handleConnectShopify = () => {
    setError('');
    if (!currentBrandId) { setError('Brand not found. Please go back and try again.'); return; }
    if (!shopifyStore.trim()) {
      setError('Please enter your Shopify store URL.');
      return;
    }
    window.location.href = getShopifyConnectUrl(currentBrandId, shopifyStore.trim());
  };

  const handleSubmit = async () => {
    setError('');
    if (!gmailConnected) {
      setError('Please connect a Gmail account first.');
      return;
    }

    setSubmitting(true);
    try {
      await submitOnboarding();
      setIsPending(true);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <h2 className={styles.stepTitle}>Connect your services</h2>
        <div className={styles.spinner} />
      </>
    );
  }

  return (
    <>
      <h2 className={styles.stepTitle}>Connect your services</h2>
      <p className={styles.stepDesc}>
        Link your Gmail {shopifyStore ? 'and Shopify ' : ''}to start receiving customer tickets.
      </p>

      {/* Gmail Connection */}
      <div style={{
        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        padding: 16, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <GoogleIcon />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Gmail</span>
          {gmailConnected && (
            <span style={{ marginLeft: 'auto', color: '#16a34a', fontWeight: 600, fontSize: 13 }}>Connected</span>
          )}
        </div>

        {gmailConnected ? (
          <div className={styles.connected} style={{ marginBottom: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Gmail account linked
          </div>
        ) : (
          <>
            {gmailAccounts.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block', color: 'var(--text-secondary)' }}>
                  Choose existing account:
                </label>
                {gmailAccounts.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => handleLinkExistingGmail(acc.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '8px 12px', margin: '4px 0',
                      border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                      background: selectedGmail === acc.id ? 'var(--accent-light)' : 'var(--bg)',
                      cursor: 'pointer', fontSize: 13,
                    }}
                  >
                    {acc.email}
                  </button>
                ))}
                <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', margin: '8px 0' }}>or</div>
              </div>
            )}
            <button
              onClick={handleConnectNewGmail}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                background: 'var(--bg)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              }}
            >
              <GoogleIcon />
              Connect New Gmail Account
            </button>
          </>
        )}
      </div>

      {/* Shopify Connection */}
      <div style={{
        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        padding: 16, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <ShopifyIcon />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Shopify</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>(optional)</span>
          {shopifyConnected && (
            <span style={{ marginLeft: 'auto', color: '#16a34a', fontWeight: 600, fontSize: 13 }}>Connected</span>
          )}
        </div>

        {shopifyConnected ? (
          <div className={styles.connected} style={{ marginBottom: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Shopify store connected{shopifyStore ? ` (${shopifyStore})` : ''}
          </div>
        ) : (
          <>
            <div className={styles.formGroup} style={{ marginBottom: 10 }}>
              <input
                placeholder="yourstore.myshopify.com"
                value={shopifyStore}
                onChange={e => setShopifyStore(e.target.value)}
              />
            </div>
            <button
              onClick={handleConnectShopify}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '10px 14px',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                background: 'var(--bg)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              }}
            >
              <ShopifyIcon />
              Connect Shopify Store
            </button>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 6, marginBottom: 0 }}>
              You can also connect Shopify later from Settings
            </p>
          </>
        )}
      </div>

      <button
        className={styles.connectBtn}
        onClick={handleSubmit}
        disabled={submitting || !gmailConnected}
      >
        {submitting ? 'Submitting...' : shopifyConnected ? "Let's Start" : "Submit for Review"}
      </button>

      {!gmailConnected && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
          Connect Gmail to continue
        </p>
      )}
    </>
  );
}

/* ─── Step 2: Pending Review ─── */
function StepPendingReview({ isPending, shopifyConnected, rejectionReason }) {
  if (rejectionReason) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
          <h2 className={styles.stepTitle}>Brand Request Rejected</h2>
          <p className={styles.stepDesc}>
            Unfortunately, your brand request was not approved. Please review the reason below.
          </p>

          <div style={{
            textAlign: 'left', padding: 16,
            border: '1px solid #fca5a5', borderRadius: 'var(--radius)',
            background: '#fef2f2', marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#991b1b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              Reason for rejection
            </div>
            <div style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {rejectionReason}
            </div>
          </div>

          <p className={styles.stepDesc} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            If you believe this was a mistake or need help, please contact our support team.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h2 className={styles.stepTitle}>Setup Complete!</h2>
        <p className={styles.stepDesc}>
          Your brand has been submitted for review. Our team will verify your
          Gmail{shopifyConnected ? ' and Shopify' : ''} connections, configure your inbox label, and activate your account.
        </p>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left',
          padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          marginBottom: 24,
        }}>
          <StatusItem label="Gmail Connected" done />
          {shopifyConnected && <StatusItem label="Shopify Connected" done />}
          <StatusItem label="Admin Approval" pending />
        </div>

        <p className={styles.stepDesc} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          You can close this page. Come back and sign in once you receive approval.
        </p>
      </div>
    </>
  );
}

function StatusItem({ label, done, pending }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
      {done && (
        <span style={{ color: '#16a34a', fontWeight: 700, fontSize: 16 }}>✓</span>
      )}
      {pending && (
        <span style={{ color: '#f59e0b', fontSize: 16 }}>⏳</span>
      )}
      <span style={{ fontWeight: 500, color: done ? '#16a34a' : pending ? '#92400e' : 'var(--text)' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Icons ─── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ShopifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M15.34 3.04c-.04-.02-.08-.03-.13-.02-.05.01-1.08.2-1.08.2s-.72-.7-.8-.78c-.08-.08-.23-.06-.29-.04L12.57 2.6c-.16-.46-.44-.88-.93-.88h-.08c-.14-.18-.31-.26-.47-.26-.98 0-1.45 1.22-1.6 1.85-.39.12-.67.21-.7.22-.22.07-.23.07-.26.28-.02.16-.59 4.55-.59 4.55l4.44.84.01-6.16zM12.4 3.38v.14c-.35.11-.73.22-.73.22s.13-.52.4-.71c.15-.1.28-.05.33.05v.3zm-.68-.61c.04 0 .08.02.12.06-.48.23-.5 1.14-.5 1.14l-.89.28c.12-.6.52-1.48 1.27-1.48z" fill="#95BF47"/>
      <path d="M15.21 3.02c-.05.01-1.08.2-1.08.2s-.72-.7-.8-.78a.17.17 0 00-.1-.05v18.96l4.82-1.04S15.36 3.15 15.34 3.04c-.02-.02-.08-.03-.13-.02z" fill="#5E8E3E"/>
      <path d="M11.64 7.92l-.51 1.54s-.45-.24-.99-.24c-.8 0-.84.5-.84.63 0 .69 1.8 .95 1.8 2.56 0 1.27-.8 2.08-1.88 2.08-1.3 0-1.96-.81-1.96-.81l.35-1.15s.68.59 1.26.59c.38 0 .53-.3.53-.51 0-.9-1.48-0.94-1.48-2.41 0-1.24.89-2.44 2.69-2.44.7 0 1.03.2 1.03.2v-.04z" fill="white"/>
    </svg>
  );
}
