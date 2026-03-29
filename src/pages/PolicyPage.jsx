import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/Policy.module.css';

const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'March 2026',
    intro: 'BrandDesk is a subsidiary of PLEXZUU. This Privacy Policy describes how BrandDesk (operated by PLEXZUU) collects, uses, and protects your information.',
    sections: [
      {
        id: 'info-collect',
        heading: 'Information We Collect',
        body: `When you sign up for BrandDesk using Google Sign-in, we collect the following information from your Google account:

\u2022 Full name
\u2022 Email address
\u2022 Profile picture

We do not collect or store your Google password. When you connect a Gmail account for email sync, we access only the labels you explicitly specify. We never read personal emails outside those labels.

We also collect usage data such as page views, feature usage patterns, browser type, IP address, and performance metrics to improve the product and diagnose issues.`,
      },
      {
        id: 'how-use',
        heading: 'How We Use Your Information',
        body: `We use your information to:

\u2022 Authenticate you and manage your account securely
\u2022 Sync customer emails from your connected Gmail labels
\u2022 Provide customer support features (threading, SLA tracking, analytics)
\u2022 Send transactional emails (e.g., welcome email, billing receipts, SLA alerts)
\u2022 Improve our product, fix bugs, and optimize performance
\u2022 Communicate important service updates

We do not sell your data to third parties. We do not use your customer emails for advertising, marketing, or training AI models.`,
      },
      {
        id: 'customer-data-protection',
        heading: 'Customer Data Protection',
        body: `BrandDesk, as a subsidiary of PLEXZUU, is committed to the highest standards of data protection. We want to be absolutely clear about our stance on customer data:

\u2022 We do NOT use any kind of customer data for our own purposes — not for analytics, not for marketing, not for AI training, and not for any other reason
\u2022 All customer data is fully encrypted at rest using AES-256-GCM encryption and in transit using TLS 1.2+
\u2022 Customer email content, order information, and personal details are encrypted and secured at all times
\u2022 We maintain strict data isolation between workspaces — no cross-workspace data access is possible
\u2022 Our employees do not access customer data unless explicitly requested by you for troubleshooting purposes
\u2022 All OAuth tokens and sensitive credentials are encrypted before storage

Your customers' data belongs to you. We are merely a secure conduit that helps you manage your support operations. PLEXZUU and BrandDesk treat data privacy as a fundamental right, not a feature.`,
      },
      {
        id: 'data-storage',
        heading: 'Data Storage & Security',
        body: `All data is fully encrypted and secured. BrandDesk (a PLEXZUU subsidiary) implements enterprise-grade security:

\u2022 Encryption in transit: All data is encrypted using HTTPS/TLS 1.2+
\u2022 Encryption at rest: All sensitive data, OAuth tokens, and customer information is encrypted using AES-256-GCM
\u2022 Customer data is fully encrypted and secured at all times — we do not use any kind of customer data for any purpose beyond providing the service
\u2022 Each workspace's data is logically isolated \u2014 team members of one workspace cannot access another workspace's data

Gmail OAuth tokens are stored securely and scoped per workspace. We use Google's OAuth 2.0 protocol and never see or store your Google password.

Our infrastructure is hosted on Railway (backed by Google Cloud Platform) with automated backups and monitoring. We perform regular security audits and follow industry best practices for data protection.`,
      },
      {
        id: 'cookies',
        heading: 'Cookies & Tracking Technologies',
        body: `We use cookies and similar technologies for:

\u2022 Authentication: To keep you signed in across sessions
\u2022 Preferences: To remember your settings and preferences
\u2022 Analytics: To understand how the product is used and identify areas for improvement

We do not use cookies for advertising or cross-site tracking. You can configure your browser to reject cookies, though some features may not work correctly without them.`,
      },
      {
        id: 'third-party',
        heading: 'Third-Party Services',
        body: `We integrate with the following third-party services:

\u2022 Google OAuth \u2014 for authentication and Gmail access. Google's privacy policy applies to data processed by Google.
\u2022 Gmail API \u2014 for syncing customer emails from specified labels. We adhere to Google API Services User Data Policy.
\u2022 Shopify API \u2014 for order lookups and customer data enrichment (only if you connect your Shopify store).
\u2022 OpenRouter AI \u2014 for AI writing tools. Email content is sent for processing but is not stored or used for training by OpenRouter.
\u2022 PayU Payment Gateway \u2014 for processing subscription payments. PayU handles all payment card data; we never see or store your full card details.

Each integration only accesses data you explicitly authorize. You can revoke access to any integration at any time from your Settings.`,
      },
      {
        id: 'data-retention',
        heading: 'Data Retention',
        body: `Your data is retained as long as your account is active. If you delete your account or cancel your subscription:

\u2022 Your data remains available for a 30-day grace period in case you change your mind
\u2022 After 30 days, all data is permanently and irreversibly deleted from our servers
\u2022 Backups containing your data are purged within 60 days

You can request immediate deletion at any time by contacting branddesk@plexzuu.com. We will process your request within 7 business days.`,
      },
      {
        id: 'your-rights',
        heading: 'Your Rights',
        body: `In compliance with GDPR, CCPA, and applicable data protection regulations, you have the right to:

\u2022 Access: Request a copy of all personal data we hold about you
\u2022 Correct: Update or correct inaccurate personal information
\u2022 Delete: Request deletion of your account and all associated data
\u2022 Export: Request a machine-readable export of your data
\u2022 Object: Object to certain processing of your data
\u2022 Restrict: Request that we limit how we use your data
\u2022 Withdraw Consent: Revoke consent for data processing at any time

You can manage most of these directly from your Settings page. For formal requests, email branddesk@plexzuu.com. We respond to all requests within 30 days.`,
      },
      {
        id: 'international',
        heading: 'International Data Transfers',
        body: `BrandDesk is operated from India. If you access the service from outside India, your data may be transferred to and processed in India. We ensure that appropriate safeguards are in place to protect your data in compliance with applicable data protection laws.

By using BrandDesk, you consent to the transfer of your data to India for processing in accordance with this Privacy Policy.`,
      },
      {
        id: 'children',
        heading: "Children's Privacy",
        body: `BrandDesk is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child under 18, we will take steps to delete that information promptly.

If you believe a child has provided us with personal information, please contact us at branddesk@plexzuu.com.`,
      },
      {
        id: 'breach',
        heading: 'Data Breach Notification',
        body: `In the event of a data breach that may affect your personal information, we will:

\u2022 Notify affected users via email within 72 hours of becoming aware of the breach
\u2022 Report the breach to relevant supervisory authorities as required by law
\u2022 Provide details about the nature of the breach, data affected, and remedial steps taken
\u2022 Offer guidance on steps you can take to protect yourself

We maintain an incident response plan and conduct regular security assessments to minimize breach risks.`,
      },
      {
        id: 'changes',
        heading: 'Changes to This Policy',
        body: `We may update this Privacy Policy from time to time. When we make material changes:

\u2022 We will notify you via email or in-app notification at least 14 days before changes take effect
\u2022 The "Last updated" date at the top of this page will be revised
\u2022 Continued use of BrandDesk after changes constitutes acceptance of the updated policy

For questions about this Privacy Policy, email branddesk@plexzuu.com.`,
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    lastUpdated: 'March 2026',
    sections: [
      {
        id: 'acceptance',
        heading: 'Acceptance of Terms',
        body: `By creating a BrandDesk account or using any part of the BrandDesk service, you agree to be bound by these Terms of Service ("Terms"). BrandDesk is a subsidiary of PLEXZUU, and these Terms are entered into between you and PLEXZUU (operating through its subsidiary BrandDesk). If you are using BrandDesk on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.

If you do not agree to these Terms, you must not use the service.`,
      },
      {
        id: 'account-access',
        heading: 'Account & Access',
        body: `You must sign up using a valid Google account. You are responsible for:

\u2022 All activity that occurs under your account
\u2022 Maintaining the security of your Google account credentials
\u2022 Promptly notifying us of any unauthorized use

You may invite team members to your workspace. As the workspace owner, you are responsible for managing their access, roles, and ensuring they comply with these Terms.

We reserve the right to suspend or terminate accounts that violate these Terms, pose security risks, or remain inactive for an extended period.`,
      },
      {
        id: 'service-description',
        heading: 'Service Description',
        body: `BrandDesk, a subsidiary of PLEXZUU, is a customer support helpdesk platform designed for Shopify merchants. The service includes:

\u2022 Gmail email synchronization and threading
\u2022 Multi-brand workspace management
\u2022 Shopify order integration
\u2022 AI-powered writing tools
\u2022 SLA tracking and analytics
\u2022 Email templates and auto-acknowledgement
\u2022 Team collaboration features

Features may vary by subscription plan. We reserve the right to modify, add, or remove features with reasonable notice.`,
      },
      {
        id: 'acceptable-use',
        heading: 'Acceptable Use',
        body: `You agree not to:

\u2022 Use BrandDesk to send spam, unsolicited bulk email, or phishing messages
\u2022 Attempt to access other workspaces' data or circumvent security measures
\u2022 Reverse-engineer, decompile, or scrape the platform
\u2022 Use the service for any illegal purpose or in violation of any applicable law
\u2022 Exceed your plan's usage limits through automated means or scripts
\u2022 Upload malicious content, viruses, or harmful code
\u2022 Impersonate another person or entity
\u2022 Interfere with or disrupt the service or its infrastructure

Violation of these terms may result in immediate account suspension or termination.`,
      },
      {
        id: 'subscription-billing',
        heading: 'Subscription & Billing',
        body: `BrandDesk offers a free 14-day trial with limited features. No credit card is required for the trial.

Paid plans (Starter and Pro) are available on monthly and annual billing cycles. Key billing terms:

\u2022 All prices are listed in Indian Rupees (INR)
\u2022 Subscriptions are recurring and auto-renew at the end of each billing cycle
\u2022 You can cancel or change plans at any time from your account settings
\u2022 Cancellation takes effect at the end of the current billing period
\u2022 We reserve the right to change pricing with at least 30 days' advance notice
\u2022 Existing subscribers will be grandfathered at their current price for 60 days after a price change

Payment processing is handled by PayU. By subscribing, you agree to PayU's terms of service.`,
      },
      {
        id: 'intellectual-property',
        heading: 'Intellectual Property',
        body: `The BrandDesk platform, including its software, design, logos, and documentation, is the intellectual property of PLEXZUU (operating through its subsidiary BrandDesk) and is protected by copyright and trademark laws.

You may not:

\u2022 Copy, modify, or distribute any part of the platform
\u2022 Use our trademarks without written permission
\u2022 Create derivative works based on the service

We respect intellectual property rights and expect our users to do the same. If you believe any content on BrandDesk infringes your intellectual property, contact us at branddesk@plexzuu.com.`,
      },
      {
        id: 'data-ownership',
        heading: 'Data Ownership',
        body: `You own your data. BrandDesk (a subsidiary of PLEXZUU) does not claim ownership of your customer emails, brands, templates, analytics data, or any content you create or import.

We do not use any kind of customer data for our own purposes. All customer data is fully encrypted and secured. We may access your data only to:

\u2022 Provide the service as described
\u2022 Fix bugs and resolve technical issues
\u2022 Respond to your support requests
\u2022 Comply with legal obligations

We will never use your data for marketing, advertising, AI training, or any purpose not directly related to providing the service. Your customer data is fully encrypted at rest and in transit at all times.`,
      },
      {
        id: 'service-availability',
        heading: 'Service Availability',
        body: `We target 99.9% uptime for the BrandDesk service. However, we do not guarantee uninterrupted access.

We are not liable for downtime caused by:

\u2022 Third-party service outages (Google, Shopify, Railway, etc.)
\u2022 Scheduled maintenance (we will provide advance notice when possible)
\u2022 Force majeure events
\u2022 Your internet connectivity or device issues

We will notify users of planned maintenance at least 24 hours in advance whenever possible, and will work to resolve unplanned outages promptly.`,
      },
      {
        id: 'limitation-liability',
        heading: 'Limitation of Liability',
        body: `BrandDesk is provided "as is" and "as available" without warranties of any kind, whether express or implied.

To the maximum extent permitted by applicable law:

\u2022 We are not liable for any indirect, incidental, special, consequential, or punitive damages
\u2022 We are not liable for any loss of data, revenue, profits, or business opportunities
\u2022 Our total aggregate liability is limited to the amount you paid us in the 12 months preceding the claim

This limitation applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise).`,
      },
      {
        id: 'termination',
        heading: 'Termination & Suspension',
        body: `You may terminate your account at any time from your Settings page. Upon termination:

\u2022 Your access to the service will end immediately
\u2022 Your data will be retained for 30 days, then permanently deleted
\u2022 Any remaining subscription period is forfeited (see Refund Policy for exceptions)

We may suspend or terminate your account if:

\u2022 You violate these Terms
\u2022 Your account poses a security risk
\u2022 Required by law or regulatory authority
\u2022 Your payment method fails and is not updated within 7 days`,
      },
      {
        id: 'dispute-resolution',
        heading: 'Dispute Resolution',
        body: `Any disputes arising from these Terms or the use of BrandDesk shall be resolved as follows:

1. Informal Resolution: Contact us at branddesk@plexzuu.com. We will attempt to resolve the dispute informally within 30 days.

2. Arbitration: If informal resolution fails, the dispute shall be referred to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 (India).

3. Governing Law: These Terms are governed by the laws of India. The courts of Bengaluru, Karnataka shall have exclusive jurisdiction.

You agree to waive any right to participate in class-action lawsuits or class-wide arbitration.`,
      },
      {
        id: 'indemnification',
        heading: 'Indemnification',
        body: `You agree to indemnify, defend, and hold harmless BrandDesk, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:

\u2022 Your use of the service
\u2022 Your violation of these Terms
\u2022 Your violation of any third-party rights
\u2022 Content you create, import, or distribute through the service`,
      },
      {
        id: 'force-majeure',
        heading: 'Force Majeure',
        body: `BrandDesk shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:

\u2022 Natural disasters, epidemics, or pandemics
\u2022 Government actions, sanctions, or regulations
\u2022 Internet or telecommunications failures
\u2022 Cyberattacks or security incidents affecting third-party infrastructure
\u2022 Power outages or utility failures

Performance obligations will be suspended for the duration of the force majeure event.`,
      },
      {
        id: 'entire-agreement',
        heading: 'Entire Agreement',
        body: `These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and BrandDesk regarding the use of the service.

These Terms supersede all prior agreements, understandings, and communications, whether written or oral.`,
      },
      {
        id: 'severability',
        heading: 'Severability',
        body: `If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable. All remaining provisions shall continue in full force and effect.`,
      },
      {
        id: 'assignment',
        heading: 'Assignment',
        body: `You may not assign or transfer your rights or obligations under these Terms without our prior written consent.

We may assign these Terms in connection with a merger, acquisition, reorganization, or sale of all or substantially all of our assets, provided the successor agrees to be bound by these Terms.`,
      },
      {
        id: 'changes-terms',
        heading: 'Changes to Terms',
        body: `We may update these Terms from time to time. When we make changes:

\u2022 We will notify you via email or in-app notification at least 14 days before changes take effect
\u2022 Material changes will be clearly highlighted
\u2022 Continued use after changes take effect constitutes acceptance

If you disagree with updated Terms, you may terminate your account before the changes take effect.

For questions about these Terms, email branddesk@plexzuu.com.`,
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        id: 'what-are-cookies',
        heading: 'What Are Cookies',
        body: `Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences, understand how you use the service, and improve your experience.

BrandDesk uses cookies and similar technologies (such as local storage) to provide, secure, and improve our service.`,
      },
      {
        id: 'cookies-we-use',
        heading: 'Cookies We Use',
        body: `We use the following types of cookies:

Essential Cookies
These cookies are necessary for the service to function. They enable core features such as authentication, session management, and security. You cannot opt out of essential cookies as the service will not work without them.

\u2022 Authentication token \u2014 keeps you signed in across sessions (httpOnly, secure)
\u2022 Session cookie \u2014 maintains your session state
\u2022 CSRF protection \u2014 prevents cross-site request forgery attacks

Functional Cookies
These cookies remember your preferences and settings to provide a personalized experience.

\u2022 Workspace selection \u2014 remembers your last active workspace
\u2022 UI preferences \u2014 remembers sidebar state, view preferences, and filters

Analytics Cookies
These cookies help us understand how visitors interact with BrandDesk so we can improve the product.

\u2022 Page views and navigation patterns
\u2022 Feature usage frequency
\u2022 Performance metrics and error tracking

We do not use any advertising or tracking cookies. We do not participate in cross-site tracking or retargeting networks.`,
      },
      {
        id: 'third-party-cookies',
        heading: 'Third-Party Cookies',
        body: `BrandDesk integrates with the following third-party services that may set their own cookies:

\u2022 Google OAuth \u2014 sets cookies during the authentication flow to manage sign-in state
\u2022 PayU Payment Gateway \u2014 sets cookies during the checkout process for payment security

These third-party cookies are governed by the respective providers' cookie policies. We do not control how third parties use their cookies.`,
      },
      {
        id: 'managing-cookies',
        heading: 'Managing Cookies',
        body: `You can manage cookies through your browser settings. Most browsers allow you to:

\u2022 View what cookies are stored on your device
\u2022 Delete individual or all cookies
\u2022 Block cookies from specific or all websites
\u2022 Set preferences for first-party vs. third-party cookies

Please note that blocking essential cookies will prevent you from using BrandDesk, as authentication and security features depend on them.

Browser-specific instructions:
\u2022 Chrome: Settings > Privacy and Security > Cookies
\u2022 Firefox: Settings > Privacy & Security > Cookies
\u2022 Safari: Preferences > Privacy > Manage Website Data
\u2022 Edge: Settings > Cookies and Site Permissions`,
      },
      {
        id: 'data-retention-cookies',
        heading: 'Cookie Retention',
        body: `\u2022 Authentication cookies expire after 7 days
\u2022 Session cookies expire when you close your browser
\u2022 Functional cookies are retained for up to 1 year
\u2022 Analytics cookies are retained for up to 1 year

You can clear cookies at any time through your browser settings. Clearing authentication cookies will require you to sign in again.`,
      },
      {
        id: 'updates-cookies',
        heading: 'Updates to This Policy',
        body: `We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons.

When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.

For questions about our use of cookies, contact us at branddesk@plexzuu.com.`,
      },
    ],
  },

  security: {
    title: 'Security',
    lastUpdated: 'March 2026',
    sections: [
      {
        id: 'overview',
        heading: 'Our Commitment to Security',
        body: `At BrandDesk (a subsidiary of PLEXZUU), security is foundational to everything we build. We understand that you trust us with your customer data, email communications, and business information. We take that responsibility seriously.

We want to be absolutely clear: BrandDesk does not use any kind of customer data for its own purposes. All customer data is fully encrypted and secured using industry-standard encryption protocols. PLEXZUU and BrandDesk treat your data privacy as a fundamental right.

This page outlines the security measures we implement to protect your data and ensure the integrity of our platform.`,
      },
      {
        id: 'infrastructure',
        heading: 'Infrastructure Security',
        body: `BrandDesk is hosted on Railway, backed by Google Cloud Platform infrastructure. Our infrastructure includes:

\u2022 Encrypted data transmission \u2014 all data in transit is protected with TLS 1.2+ (HTTPS enforced)
\u2022 Encrypted data at rest \u2014 sensitive credentials and OAuth tokens are encrypted using AES-256-GCM
\u2022 Isolated environments \u2014 production, staging, and development environments are fully separated
\u2022 Automated backups \u2014 database backups are performed regularly with point-in-time recovery
\u2022 DDoS protection \u2014 infrastructure-level protection against distributed denial-of-service attacks
\u2022 Rate limiting \u2014 API rate limits prevent abuse and brute-force attacks`,
      },
      {
        id: 'application-security',
        heading: 'Application Security',
        body: `Our application implements multiple layers of security:

Authentication & Access Control
\u2022 JWT-based authentication with secure, httpOnly cookies
\u2022 Google OAuth 2.0 integration \u2014 we never store your Google password
\u2022 Role-based access control (Owner, Admin, Agent) at the workspace level
\u2022 Workspace isolation \u2014 each workspace's data is logically separated; users cannot access other workspaces' data

API Security
\u2022 All API endpoints require authentication (except public pages)
\u2022 CORS restrictions limit which domains can access the API
\u2022 Input validation and parameterized queries prevent SQL injection
\u2022 HMAC signature verification for webhook endpoints (Shopify, PayU)
\u2022 Timing-safe comparison for cryptographic operations`,
      },
      {
        id: 'data-protection',
        heading: 'Data Protection',
        body: `BrandDesk (a PLEXZUU subsidiary) does not use any kind of customer data. Your data is fully encrypted and secured through multiple measures:

\u2022 Encryption at rest \u2014 All customer data, OAuth tokens (Gmail, Shopify), and sensitive credentials are encrypted using AES-256-GCM before storage
\u2022 Encryption in transit \u2014 all communications use HTTPS/TLS 1.2+
\u2022 Zero data usage \u2014 we do NOT use any customer data for analytics, marketing, AI training, or any other purpose
\u2022 Minimal data collection \u2014 we only collect data necessary to provide the service
\u2022 No data selling \u2014 we never sell, rent, or share your data with third parties
\u2022 Data isolation \u2014 workspace-scoped queries ensure strict data boundaries
\u2022 Secure deletion \u2014 when you delete your account, all data is permanently removed within 30 days

Your customers' data is their data. We are merely a secure platform that helps you manage your support operations.`,
      },
      {
        id: 'payment-security',
        heading: 'Payment Security',
        body: `BrandDesk does not store, process, or transmit credit card or payment card data directly.

\u2022 All payments are processed through PayU, a PCI-DSS compliant payment gateway
\u2022 Payment webhooks are verified using SHA-512 hash signatures
\u2022 Transaction integrity is validated with timing-safe cryptographic comparison
\u2022 We only store transaction metadata (plan, amount, status) \u2014 never card details`,
      },
      {
        id: 'third-party-integrations',
        heading: 'Third-Party Integrations',
        body: `We integrate with trusted third-party services and follow security best practices for each:

\u2022 Google Gmail API \u2014 OAuth 2.0 with minimal scopes; we only access labels you explicitly authorize
\u2022 Shopify API \u2014 access tokens are encrypted at rest; HMAC verification on all webhooks
\u2022 OpenRouter AI \u2014 email content sent for AI processing is not stored or used for model training
\u2022 PayU \u2014 PCI-DSS compliant payment processing; no card data touches our servers

Each integration only accesses the minimum data required. You can revoke any integration from your Settings at any time.`,
      },
      {
        id: 'security-headers',
        heading: 'Security Headers',
        body: `BrandDesk implements industry-standard HTTP security headers:

\u2022 Strict-Transport-Security (HSTS) \u2014 enforces HTTPS connections
\u2022 X-Content-Type-Options: nosniff \u2014 prevents MIME type sniffing
\u2022 X-Frame-Options: DENY \u2014 prevents clickjacking attacks
\u2022 X-XSS-Protection \u2014 enables browser XSS filtering
\u2022 Referrer-Policy: strict-origin-when-cross-origin \u2014 controls referrer information
\u2022 SameSite cookie attributes \u2014 prevents cross-site request forgery`,
      },
      {
        id: 'incident-response',
        heading: 'Incident Response',
        body: `In the event of a security incident:

\u2022 We will notify affected users via email within 72 hours of confirmed breach
\u2022 We will report to relevant authorities as required by applicable law
\u2022 We will provide clear information about the nature, scope, and impact of the incident
\u2022 We will outline remediation steps and guidance for affected users

We maintain an incident response plan and conduct regular security reviews to minimize risk.`,
      },
      {
        id: 'responsible-disclosure',
        heading: 'Responsible Disclosure',
        body: `If you discover a security vulnerability in BrandDesk, we encourage you to report it responsibly.

Please email branddesk@plexzuu.com with:

\u2022 A description of the vulnerability
\u2022 Steps to reproduce the issue
\u2022 Any relevant screenshots or proof of concept

We will acknowledge your report within 48 hours and work to resolve confirmed vulnerabilities promptly. We ask that you do not publicly disclose the vulnerability until we have had a reasonable opportunity to address it.`,
      },
    ],
  },

  refund: {
    title: 'Refund Policy',
    lastUpdated: 'March 2026',
    sections: [
      {
        id: 'eligibility',
        heading: 'Eligibility',
        body: `You are eligible for a full refund if:

\u2022 You request the refund within 7 days of your first payment
\u2022 You have not previously received a refund for BrandDesk
\u2022 Your account is in good standing (not suspended for Terms violation)

The 7-day window begins from the date your first paid subscription payment is processed, not from the date you started your free trial.`,
      },
      {
        id: 'prorated-refunds',
        heading: 'Prorated Refunds',
        body: `For annual plans only, after the initial 7-day full refund window:

\u2022 You may request a prorated refund for the unused portion of your annual subscription
\u2022 The prorated amount is calculated based on the number of full months remaining in your subscription
\u2022 A 10% administrative fee will be deducted from the prorated refund amount

Monthly plans are not eligible for prorated refunds after the 7-day window. You can cancel your monthly plan at any time, and it will remain active until the end of the current billing period.`,
      },
      {
        id: 'how-to-request',
        heading: 'How to Request a Refund',
        body: `To request a refund:

1. Send an email to branddesk@plexzuu.com with the subject line "Refund Request"
2. Include the following information:
   \u2013 Your registered email address
   \u2013 Workspace name
   \u2013 Reason for the refund (helps us improve)
   \u2013 Date of payment

Our support team will acknowledge your request within 24 hours and process it within the timelines described below.`,
      },
      {
        id: 'processing-timeline',
        heading: 'Processing Timeline',
        body: `Once your refund request is approved:

\u2022 Refunds are processed within 5-7 business days
\u2022 The refund will be credited to the original payment method used during purchase
\u2022 Bank processing times may add an additional 3-5 business days depending on your financial institution
\u2022 You will receive an email confirmation when the refund is initiated

If you have not received your refund within 14 business days of approval, please contact branddesk@plexzuu.com.`,
      },
      {
        id: 'non-refundable',
        heading: 'Non-Refundable Items',
        body: `The following are not eligible for refunds:

\u2022 Usage consumed during the free trial period
\u2022 Add-on features or one-time purchases (if applicable in the future)
\u2022 Subscription periods where significant usage has occurred (more than 50% of plan limits utilized)
\u2022 Accounts terminated for Terms of Service violations
\u2022 Refund requests made after 7 days for monthly plans

We reserve the right to deny refund requests that appear to be abusive or fraudulent.`,
      },
      {
        id: 'cancellation-vs-refund',
        heading: 'Cancellation vs Refund',
        body: `It is important to understand the difference:

Cancellation:
\u2022 Stops your subscription from auto-renewing at the next billing cycle
\u2022 You retain access to paid features until the end of your current billing period
\u2022 Does not trigger an automatic refund
\u2022 Can be done anytime from your account Settings

Refund:
\u2022 Returns money to your payment method
\u2022 Must be explicitly requested via email
\u2022 Subject to the eligibility criteria described above
\u2022 Account access may be adjusted upon refund processing

You can cancel without requesting a refund, or request a refund which will also cancel your subscription.`,
      },
      {
        id: 'exceptions',
        heading: 'Exceptions & Service Credits',
        body: `In cases of significant service outages (exceeding 24 consecutive hours), we may offer:

\u2022 Service credits proportional to the downtime experienced
\u2022 Extension of your current billing period at no additional cost
\u2022 Full or partial refund at our discretion for severe or recurring outages

Service credits are applied automatically when applicable. For specific outage-related concerns, contact branddesk@plexzuu.com.

We evaluate exception requests on a case-by-case basis and aim to be fair and transparent in all refund decisions.`,
      },
      {
        id: 'contact',
        heading: 'Contact',
        body: `For any refund-related questions or disputes:

\u2022 Email: branddesk@plexzuu.com
\u2022 Subject line: "Refund Inquiry" or "Refund Request"
\u2022 Response time: Within 24 hours on business days

We are committed to resolving billing concerns promptly and fairly. If you feel your refund request was not handled appropriately, you may escalate the matter by replying to the support thread with "Escalation Request."`,
      },
    ],
  },
};

export default function PolicyPage({ type }) {
  const policy = POLICIES[type] || POLICIES.privacy;
  const [activeSection, setActiveSection] = useState(policy.sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const sections = policy.sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter(s => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      if (sections.length > 0) setActiveSection(sections[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [policy]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className={styles.root}>
      <div className="container">
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <div className={styles.layout}>
          {/* Sticky sidebar TOC */}
          <aside className={styles.sidebar}>
            <div className={styles.tocTitle}>On this page</div>
            <ul className={styles.tocList}>
              {policy.sections.map(s => (
                <li key={s.id}>
                  <a
                    className={`${styles.tocItem} ${activeSection === s.id ? styles.tocItemActive : ''}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className={styles.content}>
            <h1 className={styles.pageTitle}>{policy.title}</h1>
            <p className={styles.lastUpdated}>Last updated: {policy.lastUpdated}</p>
            {policy.intro && <p className={styles.intro}>{policy.intro}</p>}

            {policy.sections.map(s => (
              <section key={s.id} id={s.id} className={styles.section}>
                <h2 className={styles.sectionHeading}>{s.heading}</h2>
                <div className={styles.sectionBody}>{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
