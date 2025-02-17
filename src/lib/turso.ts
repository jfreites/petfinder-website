import { createClient } from "@libsql/client";

// Initialize Supabase client
const tursoUrl = process.env.NEXT_PUBLIC_TURSO_URL;
const tursoAuthToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoAuthToken) {
  throw new Error("Missing Turso environment variables");
}

export const turso = createClient({
  //url: "file:data/local.db",
  url: tursoUrl,
  //syncUrl: "https://petfinder-jfreites.turso.io",
  //syncInterval: 60,
  authToken: tursoAuthToken
});