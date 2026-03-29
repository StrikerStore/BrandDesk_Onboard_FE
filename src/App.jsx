import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import PolicyPage from './pages/PolicyPage';
import BookDemoPage from './pages/BookDemoPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import OnboardingWizard from './pages/OnboardingWizard';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Standalone pages — no navbar/footer */}
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Public pages with shared layout */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/book-demo" element={<BookDemoPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PolicyPage type="privacy" />} />
              <Route path="/terms" element={<PolicyPage type="terms" />} />
              <Route path="/refund" element={<PolicyPage type="refund" />} />
              <Route path="/cookies" element={<PolicyPage type="cookies" />} />
              <Route path="/security" element={<PolicyPage type="security" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
