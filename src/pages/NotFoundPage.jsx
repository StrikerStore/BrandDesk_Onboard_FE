import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — BrandDesk';
    return () => { document.title = 'BrandDesk — Customer Support for Shopify'; };
  }, []);
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.code}>404</div>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.desc}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.homeBtn}>← Back to Home</Link>
            <Link to="/contact" className={styles.contactBtn}>Contact Support</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
