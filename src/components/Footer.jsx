import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.columnTitle}>Product</div>
            <a href="/#features" onClick={handleFeaturesClick} className={styles.link}>Features</a>
            <Link to="/pricing" className={styles.link}>Pricing</Link>
            <Link to="/book-demo" className={styles.link}>Book a Demo</Link>
            <Link to="/faq" className={styles.link}>FAQ</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Company</div>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
            <Link to="/blog" className={styles.link}>Blog <span className={styles.comingSoon}>Coming Soon</span></Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Resources</div>
            <Link to="/faq" className={styles.link}>Help Center</Link>
            <Link to="/security" className={styles.link}>Security</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Legal</div>
            <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link to="/terms" className={styles.link}>Terms of Service</Link>
            <Link to="/refund" className={styles.link}>Refund Policy</Link>
            <Link to="/cookies" className={styles.link}>Cookie Policy</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Contact</div>
            <a href="mailto:branddesk@plexzuu.com" className={styles.link}>branddesk@plexzuu.com</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} BrandDesk by <a href="https://plexzuu.com" target="_blank" rel="noopener noreferrer" className={styles.parentLink}>PLEXZUU</a>. All rights reserved.
          </div>
          <div className={styles.brandLine}>
            A subsidiary of PLEXZUU &middot; Built for Shopify merchants.
          </div>
        </div>
      </div>
    </footer>
  );
}
