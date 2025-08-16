export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  twitterHandle: string;
  author: string;
  locale: string;
}

export const seoConfig: SEOConfig = {
  siteName: "Feedbacker.io",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://feedbacker.io",
  defaultTitle: "Feedbacker.io - Anonymous Feedback Platform",
  defaultDescription:
    "Get honest, anonymous feedback from teammates, friends, or your audience using one simple link. Secure, private, and instant feedback collection.",
  defaultKeywords: [
    "anonymous feedback",
    "feedback platform",
    "anonymous messages",
    "feedback collection",
    "team feedback",
    "honest feedback",
    "anonymous communication",
    "workplace feedback",
    "private feedback",
    "feedback tool",
  ],
  defaultImage: "/og-image.png",
  twitterHandle: "@feedbacker_io",
  author: "Feedbacker.io Team",
  locale: "en_US",
};

export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}
