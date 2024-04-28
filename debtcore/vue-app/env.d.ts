/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Define all environment variables you expect to use
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
