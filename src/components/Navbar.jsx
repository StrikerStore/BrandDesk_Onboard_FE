import { Link, useLocation } from 'react-router-dom';
import { getGoogleSigninUrl } from '../utils/api';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="BrandDesk" width={28} height={28} />
          <span>BrandDesk</span>
        </Link>

        <div className={styles.links}>
          {isHome && <a href="#features">Features</a>}
          <Link to="/pricing">Pricing</Link>
          <Link to="/book-demo">Book a Demo</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className={styles.actions}>
          <a href={getGoogleSigninUrl('login')} className={styles.loginBtn}>
            Log in
          </a>
          <a href={getGoogleSigninUrl('signup')} className={styles.signupBtn}>
            Sign up free
          </a>
        </div>
      </div>
    </nav>
  );
}
