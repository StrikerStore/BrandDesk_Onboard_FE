import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { getGoogleSigninUrl } from '../utils/api';
import styles from '../styles/Onboarding.module.css';

const PLAN_NAMES = { starter: 'Starter', pro: 'Pro' };
const PRICING = {
  starter: { monthly: 999, yearly: 9999 },
  pro:     { monthly: 2499, yearly: 24999 },
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const plan  = searchParams.get('plan') || 'starter';
  const cycle = searchParams.get('cycle') || 'monthly';

  const [status, setStatus] = useState('loading'); // loading | ready | processing | error
  const [error, setError]   = useState('');
  const [couponCode, setCouponCode]     = useState('');
  const [couponStatus, setCouponStatus] = useState(null); // null | 'validating' | 'valid' | 'invalid'
  const [couponData, setCouponData]     = useState(null);
  const [couponError, setCouponError]   = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('bd_token', token);
      window.history.replaceState({}, '', `/checkout?plan=${plan}&cycle=${cycle}`);
    }

    if (!localStorage.getItem('bd_token')) {
      // Not logged in — redirect to signup, then come back
      setStatus('redirect');
      return;
    }

    setStatus('ready');
  }, []);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponStatus('validating');
    setCouponError('');
    setCouponData(null);
    try {
      const { data } = await api.post('/api/subscriptions/validate-coupon', { code: couponCode.trim(), plan, cycle });
      if (data.valid) {
        setCouponStatus('valid');
        setCouponData(data);
      } else {
        setCouponStatus('invalid');
        setCouponError(data.error || 'Invalid coupon');
      }
    } catch (err) {
      setCouponStatus('invalid');
      setCouponError(err.response?.data?.error || 'Failed to validate coupon');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setCouponStatus(null);
    setCouponData(null);
    setCouponError('');
  };

  const handlePay = async () => {
    setStatus('processing');
    setError('');
    try {
      const payload = { plan, cycle };
      if (couponStatus === 'valid' && couponCode.trim()) payload.coupon_code = couponCode.trim();
      const { data } = await api.post('/api/subscriptions/initiate', payload);

      // Create hidden form and submit to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${data.payuBaseUrl}/_payment`;
      Object.entries(data.formParams).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initiate payment. Please try again.');
      setStatus('ready');
    }
  };

  const amount = PRICING[plan]?.[cycle] || 0;
  const planName = PLAN_NAMES[plan] || plan;

  if (status === 'redirect') {
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
          <h2 className={styles.stepTitle}>Sign in to continue</h2>
          <p className={styles.stepDesc}>
            You need an account to subscribe to the {planName} plan. Sign up or log in to continue.
          </p>
          <a href={getGoogleSigninUrl('signup')} className={styles.connectBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
            Sign up with Google
          </a>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-muted)' }}>
            Already have an account? <a href={getGoogleSigninUrl('login')} style={{ color: 'var(--accent)' }}>Log in</a>
          </p>
        </div>
      </div>
    );
  }

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

        <h2 className={styles.stepTitle}>Subscribe to {planName}</h2>
        <p className={styles.stepDesc}>
          You'll be redirected to PayU to complete your payment securely.
        </p>

        {/* Order summary */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          padding: 16, marginBottom: 20, fontSize: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Plan</span>
            <span style={{ fontWeight: 600 }}>{planName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Billing</span>
            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{cycle}</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600 }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: 18 }}>
              {couponData ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: 14, marginRight: 6 }}>₹{amount.toLocaleString('en-IN')}</span>
                  ₹{couponData.final_amount.toLocaleString('en-IN')}
                </>
              ) : (
                <>₹{amount.toLocaleString('en-IN')}</>
              )}
              <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>/{cycle === 'monthly' ? 'mo' : 'yr'}</span>
            </span>
          </div>
        </div>

        {/* Coupon code */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={e => { setCouponCode(e.target.value.toUpperCase()); if (couponStatus) handleRemoveCoupon(); }}
            style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: 13, textTransform: 'uppercase' }}
          />
          {couponStatus === 'valid' ? (
            <button onClick={handleRemoveCoupon} style={{ padding: '8px 14px', borderRadius: 'var(--radius)', fontSize: 12, border: '1px solid #dc2626', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}>Remove</button>
          ) : (
            <button onClick={handleApplyCoupon} disabled={!couponCode.trim() || couponStatus === 'validating'}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius)', fontSize: 12, border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer' }}>
              {couponStatus === 'validating' ? '...' : 'Apply'}
            </button>
          )}
        </div>
        {couponStatus === 'valid' && couponData && (
          <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 'var(--radius)', background: '#dcfce7', color: '#166534', fontSize: 12 }}>
            {couponData.discount_type === 'percent' ? `${couponData.discount_value}% off` : `₹${couponData.discount_value} off`} applied!
          </div>
        )}
        {couponStatus === 'invalid' && couponError && (
          <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 'var(--radius)', background: '#fef2f2', color: '#dc2626', fontSize: 12 }}>{couponError}</div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {status === 'processing' ? (
          <>
            <div className={styles.spinner} />
            <p className={styles.statusText}>Redirecting to payment gateway...</p>
          </>
        ) : (
          <button className={styles.connectBtn} onClick={handlePay} disabled={status !== 'ready'}>
            Pay ₹{(couponData?.final_amount || amount).toLocaleString('en-IN')} and Subscribe
          </button>
        )}

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Recurring {cycle} payment. Cancel anytime from settings.
        </p>
      </div>
    </div>
  );
}
