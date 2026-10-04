# Admin Login

Configured username: FAHAD786

The supplied package contains a browser-only starter login for preview/testing.
For a real public website, NEVER keep the admin password in JavaScript or HTML.
Move authentication to the server, hash the password with Argon2id/bcrypt, use HTTPS,
sessions/secure cookies, rate limiting, and role-based authorization.

After successful production authentication, the admin dashboard should expose:
- Customers
- Payment verification
- Profile approval/rejection
- Likes and mutual matches
- Reports
- Private CNIC/phone/email (authorized admin only)
- Fee/service settings
