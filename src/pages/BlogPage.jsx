import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const s = {
  root: { padding: '80px 0 120px', minHeight: 'calc(100vh - 200px)', textAlign: 'center' },
  title: { fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 12 },
  subtitle: { fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' },
  card: {
    maxWidth: 520, margin: '0 auto', padding: '48px 32px',
    border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', background: 'var(--bg)',
  },
  icon: {
    width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-subtle)',
    color: 'var(--text-muted)', fontSize: 24, display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto 20px',
  },
  cta: {
    display: 'inline-block', padding: '10px 24px', background: 'var(--accent)',
    color: 'white', borderRadius: 'var(--radius)', fontSize: 14, fontWeight: 600,
    textDecoration: 'none', transition: 'opacity 0.15s',
  },
};

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Blog — BrandDesk by PLEXZUU';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);
  return (
    <main style={s.root}>
      <div className="container">
        <div style={s.card}>
          <div style={s.icon}>✎</div>
          <h1 style={s.title}>Blog</h1>
          <p style={s.subtitle}>
            We're working on helpful guides, tips, and insights for Shopify merchants.
            Stay tuned — our first articles are coming soon.
          </p>
          <Link to="/" style={s.cta} onMouseEnter={e => e.target.style.opacity = '0.9'} onMouseLeave={e => e.target.style.opacity = '1'}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
