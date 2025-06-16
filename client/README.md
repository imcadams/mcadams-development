# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Environment Variables

This project uses Vite, which supports environment variables loaded from `.env` files. To manage API keys or other sensitive information, you can create a `.env` file in the root of the `client` directory.

For example, to set the API key for the email service and the backend API URL, create a file named `.env` in the `client\` directory and add the following lines:

```
VITE_EMAIL_API_KEY=your_actual_email_api_key_here
VITE_API_URL=your_actual_backend_api_url_here
```

Replace `your_actual_email_api_key_here` and `your_actual_backend_api_url_here` with your actual values.

**Important:** Ensure that `.env` files are listed in your `.gitignore` file to prevent them from being committed to your version control system. The provided `.gitignore` file already includes entries for `.env` and `.env.*`.

Environment variables prefixed with `VITE_` are exposed to your client-side code via `import.meta.env`. For TypeScript type safety, you can define these variables in `src/vite-env.d.ts`:

```typescript
interface ImportMetaEnv {
  readonly VITE_EMAIL_API_KEY: string;
  readonly VITE_API_URL: string;
  // add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
