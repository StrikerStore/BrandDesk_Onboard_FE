import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getGoogleSigninUrl } from '../utils/api';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {isHome && <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>}
          <Link to="/pricing">Pricing</Link>
          <Link to="/book-demo">Book a Demo</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className={styles.mobileActions}>
          <a href={getGoogleSigninUrl('login')} className={styles.mobileLoginBtn}>
            Log in
          </a>
          <a href={getGoogleSigninUrl('signup')} className={styles.mobileSignupBtn}>
            Sign up free
          </a>
        </div>
      </div>
    </nav>
  );
}
