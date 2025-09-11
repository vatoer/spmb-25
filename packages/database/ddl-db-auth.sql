-- Tabel User
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    email_verified TIMESTAMPTZ,
    image VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Account
CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(100) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    token_type VARCHAR(50),
    scope VARCHAR(255),
    id_token TEXT,
    session_state VARCHAR(100),
    expires_at INT,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    CONSTRAINT account_provider_unique UNIQUE (provider, provider_account_id)
);

-- Tabel Session
CREATE TABLE session (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Tabel VerificationToken
CREATE TABLE verification_token (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    CONSTRAINT verification_token_unique UNIQUE (identifier, token)
);
