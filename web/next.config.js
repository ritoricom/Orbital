const env = require("env-var");

const { i18n } = require("./next-i18next.config");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const runtimeConfig = {
  APP_URL: env.get("NEXT_PUBLIC_APP_URL").required().asString(),
  API_URL: env.get("NEXT_PUBLIC_API_URL").required().asString(),
  YM_CODE: env.get("NEXT_PUBLIC_YM_CODE").asString(),
};

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  headers: () => [
    {
      source: "/:path*",
      headers: securityHeaders,
    },
  ],
  images: {
    domains: [new URL(runtimeConfig.API_URL).hostname],
  },
  serverRuntimeConfig: runtimeConfig,
  publicRuntimeConfig: runtimeConfig,
};
