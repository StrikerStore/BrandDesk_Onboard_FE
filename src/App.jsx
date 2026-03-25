import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import PolicyPage from './pages/PolicyPage';
import BookDemoPage from './pages/BookDemoPage';
import OnboardingWizard from './pages/OnboardingWizard';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <BrowserRouter>
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
              <Route path="/privacy" element={<PolicyPage type="privacy" />} />
              <Route path="/terms" element={<PolicyPage type="terms" />} />
              <Route path="/refund" element={<PolicyPage type="refund" />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
