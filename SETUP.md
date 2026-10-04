# NikahMatch Website Package — Setup

## 1. Preview the frontend
Open `frontend/index.html` in a browser.

## 2. Before going live
This package intentionally separates the public UI from the production backend requirements. To accept real registration fees and store real customer information, connect:
- a secure backend/API
- PostgreSQL (or equivalent)
- secure authentication/session or token system
- image storage
- a payment gateway available for your business
- HTTPS
- an admin authentication system

## 3. Payment
Do not treat a user-entered payment status as proof of payment. Use the payment provider's server-to-server webhook/API verification.

## 4. Privacy
CNIC, phone, email and exact address are private fields. Public profile APIs must use an allow-list of safe fields rather than returning the entire user record.

## 5. Admin
Create separate admin accounts with strong passwords and role-based access. Keep an audit log for access to sensitive customer information.

## 6. Legal
Before accepting customers, add Terms & Conditions, Privacy Policy, refund/cancellation rules, user-reporting rules, and applicable local legal/compliance requirements.

## Admin preview
Open `admin/login.html` to preview the configured admin login screen. The credentials are intentionally only suitable for this local demo; production authentication must be server-side.
