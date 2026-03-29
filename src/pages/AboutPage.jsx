import { Link } from 'react-router-dom';
import { Shield, Users, Zap, Heart, Lock, Globe } from 'lucide-react';
import styles from '../styles/About.module.css';

const VALUES = [
  {
    Icon: Shield,
    color: '#eef2ff',
    iconColor: '#6366f1',
    title: 'Security First',
    desc: 'Your customer data is fully encrypted and secured. We never access, sell, or use customer data for any purpose beyond providing the service.',
  },
  {
    Icon: Users,
    color: '#dcfce7',
    iconColor: '#16a34a',
    title: 'Merchant Focused',
    desc: 'Every feature is designed specifically for Shopify merchants who need fast, organized customer support.',
  },
  {
    Icon: Zap,
    color: '#fef3c7',
    iconColor: '#d97706',
    title: 'Simplicity',
    desc: 'Get started in under 3 minutes. No complex setup, no bloated features — just the tools you need.',
  },
  {
    Icon: Heart,
    color: '#fce7f3',
    iconColor: '#db2777',
    title: 'Transparency',
    desc: 'Clear pricing, honest policies, and open communication. No hidden fees, no data surprises.',
  },
  {
    Icon: Lock,
    color: '#ede9fe',
    iconColor: '#7c3aed',
    title: 'Privacy by Design',
    desc: 'We do not use any kind of customer data. All data is fully encrypted at rest and in transit with industry-standard encryption.',
  },
  {
    Icon: Globe,
    color: '#e0f2fe',
    iconColor: '#0284c7',
    title: 'Built to Scale',
    desc: 'From one brand to hundreds — BrandDesk grows with your business, backed by PLEXZUU\'s infrastructure.',
  },
];

export default function AboutPage() {
  return (
    <main className={styles.root}>
      <div className="container">
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.badge}>About BrandDesk</div>
          <h1 className={styles.title}>
            Customer support, reimagined<br />for Shopify merchants
          </h1>
          <p className={styles.subtitle}>
            BrandDesk is a customer support helpdesk platform built exclusively for Shopify merchants.
            We help e-commerce teams manage emails, track SLAs, and resolve tickets — all from one dashboard.
          </p>
        </div>

        {/* Parent Company */}
        <div className={styles.parentSection}>
          <div className={styles.parentLabel}>A Product By</div>
          <div className={styles.parentName}>PLEXZUU</div>
          <p className={styles.parentRelation}>
            BrandDesk is a subsidiary of <strong>PLEXZUU</strong>, its parent company.
            PLEXZUU builds modern software tools that help businesses operate more efficiently.
            BrandDesk is PLEXZUU's dedicated solution for e-commerce customer support,
            bringing enterprise-grade helpdesk capabilities to Shopify merchants of all sizes.
          </p>
        </div>

        {/* Mission */}
        <div className={styles.missionSection}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionBody}>
            We believe every Shopify merchant — whether you're running one store or managing a portfolio of brands —
            deserves a support tool that's fast, intuitive, and affordable. BrandDesk was created to replace
            clunky, overpriced helpdesks with a streamlined platform that integrates directly with Gmail and Shopify.
            As a PLEXZUU subsidiary, we have the backing and infrastructure to deliver reliable,
            enterprise-quality service while keeping things simple and merchant-friendly.
          </p>
        </div>

        {/* Values */}
        <h2 className={styles.sectionTitle}>What We Stand For</h2>
        <div className={styles.valuesGrid}>
          {VALUES.map(v => (
            <div key={v.title} className={styles.valueCard}>
              <div className={styles.valueIconWrap} style={{ background: v.color }}>
                <v.Icon size={22} color={v.iconColor} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2>Ready to get started?</h2>
          <p>Join hundreds of Shopify merchants who trust BrandDesk, powered by PLEXZUU.</p>
          <Link to="/pricing" className={styles.ctaButton}>
            View Plans & Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
