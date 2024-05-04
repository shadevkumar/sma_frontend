import { NuxtConfig } from "@nuxt/schema";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    middleware?: string[];
  }
}

declare module "@nuxt/schema" {
  interface RuntimeConfig {
    public: {
      SMA_API_URL: string;
    };
  }
}

export {};
