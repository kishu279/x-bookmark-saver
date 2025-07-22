export const config = {
  // Twitter/X API Credentials
  CLIENT_ID: process.env.CLIENT_ID || "",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "",

  // Twitter/X API Keys
  API_KEY: process.env.API_KEY || "",
  API_SECRET: process.env.API_SECRET || "",

  // NextAuth Configuration
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",

  // Twitter/X Callback URL
  CALLBACK_URL:
    process.env.CALLBACK_URL || "http://localhost:3000/api/auth/callback",

  // Additional configuration can be added here
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database URL for Prisma
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/mydb",
} as const;

// Individual exports for easier access
export const {
  CLIENT_ID,
  CLIENT_SECRET,
  API_KEY,
  API_SECRET,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  CALLBACK_URL,
  NODE_ENV,
  DATABASE_URL,
} = config;
