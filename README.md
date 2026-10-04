# Backend specification

Recommended production stack: Node.js + Express + PostgreSQL (or another secure relational database).

Required API areas:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/payments/create
- POST /api/payments/webhook
- GET /api/profiles (public-safe fields only)
- POST /api/profiles/:id/like
- DELETE /api/profiles/:id/like
- GET /api/me/likes
- GET /api/admin/users
- PATCH /api/admin/users/:id/approve
- PATCH /api/admin/users/:id/block
- GET /api/admin/payments
- GET /api/admin/likes
- GET /api/admin/matches

Security requirements:
1. Hash passwords with Argon2id or bcrypt.
2. Encrypt sensitive data such as CNIC at rest where appropriate.
3. Never return CNIC/phone/email from public profile endpoints.
4. Use server-side authorization for every admin endpoint.
5. Use HTTPS in production.
6. Validate/sanitize all inputs.
7. Rate-limit login, registration and password-reset endpoints.
8. Store payment confirmation from a trusted gateway webhook, not from a client-submitted screenshot alone.
9. Keep audit logs for admin access to sensitive records.
10. Add CSRF protection where applicable.
