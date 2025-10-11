/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
/// <reference path="./interfaces/user.interface.ts" />

declare namespace App {
  interface Locals {
    user: User | null;
    //user: import("better-auth").User
    session: import("better-auth").Session | null;
    isAuthed: boolean;
  }
}
