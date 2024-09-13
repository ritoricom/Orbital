const env = require("env-var");

const APP_URL = env.get("NEXT_PUBLIC_APP_URL").required().asString();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: APP_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/cities-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${APP_URL}/cities-sitemap.xml`],
  },
};
