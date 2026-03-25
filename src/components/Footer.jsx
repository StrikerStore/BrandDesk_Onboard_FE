import { Link } from 'react-router-dom';

const footerStyles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '48px 24px 24px',
    background: 'var(--bg-subtle)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    marginBottom: '40px',
  },
  column: {},
  columnTitle: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text)',
    marginBottom: 16,
  },
  link: {
    display: 'block',
    fontSize: 14,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '4px 0',
    transition: 'color 0.15s',
  },
  bottom: {
    borderTop: '1px solid var(--border)',
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  copyright: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  brandLine: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
};

export default function Footer() {
  const linkHover = (e) => { e.target.style.color = 'var(--accent)'; };
  const linkLeave = (e) => { e.target.style.color = 'var(--text-secondary)'; };

  const FooterLink = ({ to, children }) => (
    <Link
      to={to}
      style={footerStyles.link}
      onMouseEnter={linkHover}
      onMouseLeave={linkLeave}
    >
      {children}
    </Link>
  );

  return (
    <footer style={footerStyles.footer}>
      <div className="container">
        <div style={footerStyles.grid}>
          <div style={footerStyles.column}>
            <div style={footerStyles.columnTitle}>Product</div>
            <FooterLink to="/#features">Features</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/book-demo">Book a Demo</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
          </div>
          <div style={footerStyles.column}>
            <div style={footerStyles.columnTitle}>Company</div>
            <FooterLink to="/">About</FooterLink>
            <a href="mailto:support@branddesk.in" style={footerStyles.link} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Contact</a>
          </div>
          <div style={footerStyles.column}>
            <div style={footerStyles.columnTitle}>Legal</div>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/refund">Refund Policy</FooterLink>
          </div>
          <div style={footerStyles.column}>
            <div style={footerStyles.columnTitle}>Support</div>
            <a href="mailto:support@branddesk.in" style={footerStyles.link} onMouseEnter={linkHover} onMouseLeave={linkLeave}>Help Center</a>
            <FooterLink to="/">Status</FooterLink>
          </div>
        </div>
        <div style={footerStyles.bottom}>
          <div style={footerStyles.copyright}>
            &copy; {new Date().getFullYear()} BrandDesk. All rights reserved.
          </div>
          <div style={footerStyles.brandLine}>
            Built for Shopify merchants.
          </div>
        </div>
      </div>
    </footer>
  );
}
