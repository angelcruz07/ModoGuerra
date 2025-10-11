import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: import.meta.env.AUTH_BASE_URL,
});

export const { signIn, signOut } = authClient;
