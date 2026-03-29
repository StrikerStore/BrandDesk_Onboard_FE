import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.columnTitle}>Product</div>
            <Link to="/#features" className={styles.link}>Features</Link>
            <Link to="/pricing" className={styles.link}>Pricing</Link>
            <Link to="/book-demo" className={styles.link}>Book a Demo</Link>
            <Link to="/faq" className={styles.link}>FAQ</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Company</div>
            <Link to="/" className={styles.link}>About</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
            <Link to="/blog" className={styles.link}>Blog</Link>
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
            &copy; {new Date().getFullYear()} BrandDesk. All rights reserved.
          </div>
          <div className={styles.brandLine}>
            Built for Shopify merchants.
          </div>
        </div>
      </div>
    </footer>
  );
}
