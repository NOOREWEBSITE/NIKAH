-- PostgreSQL starter schema
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  dob DATE NOT NULL,
  city TEXT NOT NULL,
  education TEXT,
  profession TEXT,
  height TEXT,
  marital_status TEXT,
  family_info TEXT,
  preferences TEXT,
  profile_image_url TEXT,
  cnic_encrypted TEXT,
  phone_encrypted TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  status TEXT NOT NULL DEFAULT 'pending_payment',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PKR',
  provider TEXT NOT NULL,
  provider_reference TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
  id BIGSERIAL PRIMARY KEY,
  liker_id BIGINT NOT NULL REFERENCES users(id),
  liked_id BIGINT NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(liker_id, liked_id),
  CHECK(liker_id <> liked_id)
);

CREATE TABLE reports (
  id BIGSERIAL PRIMARY KEY,
  reporter_id BIGINT NOT NULL REFERENCES users(id),
  reported_id BIGINT NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Public profile API should SELECT only safe fields:
-- full_name, gender, age derived from dob, city, education,
-- profession, height, marital_status, family_info, preferences,
-- profile_image_url.
-- Never SELECT cnic_encrypted, phone_encrypted or email for public endpoints.
