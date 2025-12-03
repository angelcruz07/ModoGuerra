/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
/// <reference path="./interfaces/user.interface.ts" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly NODE_ENV: string;
  readonly DISCORD_CLIENT_ID: string;
  readonly DISCORD_CLIENT_SECRET: string;
  readonly CLOUDINARY_CLOUDNAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user: User | null;
    //user: import("better-auth").User
    session: import("better-auth").Session | null;
    isAuthed: boolean;
  }
}
