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
} as const;

// Individual exports for easier access
export const {
  CLIENT_ID,
  CLIENT_SECRET,
  API_KEY,
  API_SECRET,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
} = config;
