export default {
  plugins: {
    tailwindcss: { config: new URL('./packages/ui/tailwind.config.ts', import.meta.url).pathname },
    autoprefixer: {},
  },
};
