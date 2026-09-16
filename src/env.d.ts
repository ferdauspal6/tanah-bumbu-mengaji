/// <reference types="astro/client" />

type ENV = {
  DB: D1Database;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}
