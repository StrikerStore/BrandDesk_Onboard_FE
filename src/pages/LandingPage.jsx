import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getGoogleSigninUrl } from '../utils/api';
import { Mail, Tags, ShoppingCart, Bot, Clock, BarChart3, FileText, Zap, Check, X, Star } from 'lucide-react';
import styles from '../styles/Landing.module.css';

const FEATURES = [
  { Icon: Mail,         color: '#eef2ff', iconColor: '#6366f1', title: 'Gmail Sync',         desc: 'Automatically pulls customer emails from Gmail labels into a clean inbox.' },
  { Icon: Tags,         color: '#fef3c7', iconColor: '#d97706', title: 'Multi-Brand',        desc: 'Manage multiple stores from one dashboard with brand-level filtering.' },
  { Icon: ShoppingCart, color: '#dcfce7', iconColor: '#16a34a', title: 'Shopify Integration', desc: 'Auto-parses Shopify contact forms — names, emails, order IDs, custom fields.' },
  { Icon: Bot,          color: '#ede9fe', iconColor: '#7c3aed', title: 'AI Writing Tools',    desc: 'Improve tone, fix grammar, or generate replies with one click.' },
  { Icon: Clock,        color: '#fee2e2', iconColor: '#dc2626', title: 'SLA Tracking',        desc: 'Business-hours SLA with breach alerts so no ticket slips through.' },
  { Icon: BarChart3,    color: '#e0f2fe', iconColor: '#0284c7', title: 'Analytics',           desc: 'Volume trends, response times, resolution stats, and team leaderboards.' },
  { Icon: FileText,     color: '#fce7f3', iconColor: '#db2777', title: 'Templates',           desc: 'Saved reply templates with variables for fast, consistent responses.' },
  { Icon: Zap,          color: '#fff7ed', iconColor: '#ea580c', title: 'Auto-Acknowledge',    desc: 'Automatically send acknowledgement emails to new tickets after a delay.' },
];

const COMPARISON_ROWS = [
  { feature: 'Brands',              trial: '1',         starter: '3',         pro: 'Unlimited' },
  { feature: 'Team members',        trial: '1',         starter: '3',         pro: 'Unlimited' },
  { feature: 'Threads/month',       trial: '200',       starter: '1,000',     pro: 'Unlimited' },
  { feature: 'Email templates',     trial: '5',         starter: '20',        pro: 'Unlimited' },
  { feature: 'Analytics',           trial: 'Basic',     starter: 'Full',      pro: 'Full' },
  { feature: 'Auto-acknowledgement',trial: false,        starter: true,        pro: true },
  { feature: 'SLA tracking',        trial: false,        starter: true,        pro: true },
  { feature: 'AI tools',            trial: true,         starter: true,        pro: true },
  { feature: 'Priority support',    trial: false,        starter: false,       pro: true },
];

export default function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authError = searchParams.get('auth_error');

  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        searchParams.delete('auth_error');
        setSearchParams(searchParams, { replace: true });
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const errorMessages = {
    no_account:         'No account found with this email. Please sign up first.',
    already_registered: 'This email is already registered. Please log in instead.',
    callback_failed:    'Something went wrong. Please try again.',
    no_workspace:       'Your account has no active workspace. Please contact support.',
    gmail_already_used: 'This Gmail account is already connected to another workspace. Each Gmail can only be used for one trial.',
  };

  function renderCell(val) {
    if (val === true)  return <span className={styles.checkIcon}><Check size={18} /></span>;
    if (val === false) return <span className={styles.crossIcon}><X size={18} /></span>;
    return val;
  }

  return (
    <main>
      {authError && (
        <div className={styles.errorBanner}>
          {errorMessages[authError] || 'Authentication error. Please try again.'}
        </div>
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.trustBadge}>
            <Star size={14} fill="currentColor" />
            Trusted by Shopify merchants
          </div>
          <h1 className={styles.heroTitle}>
            Customer support inbox<br />built for Shopify merchants
          </h1>
          <p className={styles.heroSub}>
            Connect your Gmail, import tickets automatically, and reply to customers — all from one dashboard. Multi-brand, SLA tracking, AI tools, and analytics included.
          </p>
          <div className={styles.heroCtas}>
            <a href={getGoogleSigninUrl('signup')} className={styles.ctaPrimary}>
              <GoogleIcon />
              Sign up with Google
            </a>
            <Link to="/pricing" className={styles.ctaSecondary}>View pricing</Link>
          </div>
          <p className={styles.heroNote}>
            Free 14-day trial. No credit card required.
            <span style={{ margin: '0 6px', color: 'var(--text-muted)' }}>·</span>
            <Link to="/book-demo" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'underline', fontWeight: 500 }}>
              Or book a demo
            </Link>
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything you need to support your customers</h2>
          <p className={styles.sectionSubtitle}>
            A complete helpdesk toolkit designed for e-commerce teams who want fast, organized support.
          </p>
          <div className={styles.featureGrid}>
            {FEATURES.map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIconWrap} style={{ background: f.color }}>
                  <f.Icon size={22} color={f.iconColor} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Get started in 3 minutes</h2>
          <p className={styles.sectionSubtitle}>
            No complex setup. Just sign in, connect, and start helping your customers.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3>Sign up with Google</h3>
              <p>Create your account in one click. No passwords to remember.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3>Connect Gmail</h3>
              <p>Link your store's Gmail account and add your brand labels.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3>Start resolving</h3>
              <p>Your existing emails sync instantly. Reply, tag, and resolve from the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className={styles.integrations}>
        <div className="container">
          <p className={styles.sectionSubtitle} style={{ marginBottom: 32 }}>Works seamlessly with the tools you already use</p>
          <div className={styles.integrationLogos}>
            <div className={styles.integrationItem}>
              <Mail size={32} color="#ea4335" />
              Gmail
            </div>
            <span className={styles.integrationPlus}>+</span>
            <div className={styles.integrationItem}>
              <ShoppingCart size={32} color="#96bf48" />
              Shopify
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className={styles.comparison}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Compare plans</h2>
          <p className={styles.sectionSubtitle}>
            Choose the plan that fits your team's needs. Upgrade anytime.
          </p>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Trial</th>
                <th className={styles.popularCol}>Starter</th>
                <th>Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ fontWeight: 600 }}>
                <td style={{ fontWeight: 600 }}>Price</td>
                <td>Free</td>
                <td className={styles.popularCol}>₹999/mo</td>
                <td>₹2,499/mo</td>
              </tr>
              {COMPARISON_ROWS.map(row => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{renderCell(row.trial)}</td>
                  <td className={styles.popularCol}>{renderCell(row.starter)}</td>
                  <td>{renderCell(row.pro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Ready to streamline your support?</h2>
          <p className={styles.ctaSectionSub}>Join merchants who save hours every week with BrandDesk.</p>
          <a href={getGoogleSigninUrl('signup')} className={styles.ctaPrimaryDark}>
            <GoogleIcon />
            Get started free
          </a>
        </div>
      </section>
    </main>
  );
}

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
