/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_API_KEY: string;
  // add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
