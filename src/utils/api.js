import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('bd_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getGoogleSigninUrl = (intent) => `${API_URL}/auth/google/signin?intent=${intent}`;
export const getGmailConnectUrl = (brandId) => `${API_URL}/auth/google?brand_id=${brandId}&origin=onboarding`;
export const getShopifyConnectUrl = (brandId, shop) => `${API_URL}/auth/shopify?brand_id=${brandId}&shop=${encodeURIComponent(shop)}&origin=onboarding`;

export const fetchAuthStatus     = () => api.get('/auth/status');
export const createBrand         = (data) => api.post('/api/brands', data);
export const submitOnboarding    = () => api.post('/api/onboarding/submit');
export const fetchWorkspaceStatus = () => api.get('/api/onboarding/status');
export const fetchGmailAccounts  = () => api.get('/api/brands/gmail-accounts');
export const linkGmail           = (brandId, gmailTokenId) => api.post(`/api/brands/${brandId}/link-gmail`, { gmail_token_id: gmailTokenId });
export const fetchGmailLabels    = () => api.get('/api/brands/gmail-labels');
export const validateCoupon      = (data) => api.post('/api/subscriptions/validate-coupon', data);

// Demo
export const submitDemoRequest = (data) => api.post('/api/demo/request', data);

export default api;
