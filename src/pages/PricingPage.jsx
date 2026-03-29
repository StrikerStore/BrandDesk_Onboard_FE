import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { getGoogleSigninUrl } from '../utils/api';
import { Check, X } from 'lucide-react';
import styles from '../styles/Pricing.module.css';

const PLANS = [
  {
    name: 'Trial',
    monthly: 'Free',
    yearly: 'Free',
    period: { monthly: '14 days', yearly: '14 days' },
    features: [
      '1 brand',
      '1 team member',
      '200 threads/month',
      '5 templates',
      'Basic analytics',
      'AI writing tools',
    ],
    cta: 'Start free trial',
    popular: false,
    isTrial: true,
  },
  {
    name: 'Starter',
    monthly: '\u20B9999',
    yearly: '\u20B99,999',
    period: { monthly: '/month', yearly: '/year' },
    yearlySavings: '\u20B9833/mo',
    features: [
      '3 brands',
      '3 team members',
      '1,000 threads/month',
      '20 templates',
      'Full analytics',
      'AI writing tools',
      'Auto-acknowledgement',
      'SLA tracking',
    ],
    cta: 'Get started',
    popular: true,
    planKey: 'starter',
  },
  {
    name: 'Pro',
    monthly: '\u20B92,499',
    yearly: '\u20B924,999',
    period: { monthly: '/month', yearly: '/year' },
    yearlySavings: '\u20B92,083/mo',
    features: [
      'Unlimited brands',
      'Unlimited team members',
      'Unlimited threads',
      'Unlimited templates',
      'Full analytics',
      'AI writing tools',
      'Auto-acknowledgement',
      'SLA tracking',
      'Priority support',
    ],
    cta: 'Get started',
    popular: false,
    planKey: 'pro',
  },
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

function renderCell(val) {
  if (val === true)  return <span className={styles.checkIcon}><Check size={18} /></span>;
  if (val === false) return <span className={styles.crossIcon}><X size={18} /></span>;
  return val;
}

export default function PricingPage() {
  const [cycle, setCycle] = useState('monthly');

  useEffect(() => {
    document.title = 'Pricing — BrandDesk by PLEXZUU';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);

  return (
    <main className={styles.root}>
      <div className="container">
        <h1 className={styles.title}>Simple, transparent pricing</h1>
        <p className={styles.subtitle}>Start free. Upgrade when you're ready.</p>

        {/* Monthly/Yearly toggle */}
        <div className={styles.cycleToggle}>
          <button
            className={`${styles.cycleBtn} ${cycle === 'monthly' ? styles.cycleBtnActive : ''}`}
            onClick={() => setCycle('monthly')}
          >Monthly</button>
          <button
            className={`${styles.cycleBtn} ${cycle === 'yearly' ? styles.cycleBtnActive : ''}`}
            onClick={() => setCycle('yearly')}
          >
            Yearly
            <span className={styles.saveBadge}>Save ~17%</span>
          </button>
        </div>

        <div className={styles.grid}>
          {PLANS.map(plan => (
            <div key={plan.name} className={`${styles.card} ${plan.popular ? styles.cardPopular : ''}`}>
              {plan.popular && <div className={styles.popularBadge}>Most popular</div>}
              <h2 className={styles.planName}>{plan.name}</h2>
              <div className={styles.price}>
                <span className={styles.priceAmount}>{plan[cycle]}</span>
                <span className={styles.pricePeriod}>{plan.period[cycle]}</span>
              </div>
              {cycle === 'yearly' && plan.yearlySavings && (
                <div className={styles.yearlySaving}>Effectively {plan.yearlySavings}</div>
              )}
              <ul className={styles.featureList}>
                {plan.features.map(f => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.isTrial ? (
                <a href={getGoogleSigninUrl('signup')} className={`${styles.planCta} ${plan.popular ? styles.planCtaPopular : ''}`}>
                  {plan.cta}
                </a>
              ) : (
                <Link
                  to={`/checkout?plan=${plan.planKey}&cycle=${cycle}`}
                  className={`${styles.planCta} ${plan.popular ? styles.planCtaPopular : ''}`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className={styles.comparisonSection}>
          <h2 className={styles.comparisonTitle}>Detailed feature comparison</h2>
          <p className={styles.comparisonSubtitle}>See exactly what each plan includes.</p>
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
              <tr className={styles.priceRow}>
                <td style={{ fontWeight: 600 }}>Price</td>
                <td>Free</td>
                <td className={styles.popularCol}>{cycle === 'monthly' ? '₹999/mo' : '₹9,999/yr'}</td>
                <td>{cycle === 'monthly' ? '₹2,499/mo' : '₹24,999/yr'}</td>
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
        {/* Book a Demo CTA */}
        <div className={styles.demoCta}>
          <p className={styles.demoText}>Need a personalized walkthrough?</p>
          <Link to="/book-demo" className={styles.demoBtn}>
            <Calendar size={16} />
            Book a Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
