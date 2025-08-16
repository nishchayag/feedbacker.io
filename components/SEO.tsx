import Head from "next/head";
import { generateJsonLd } from "@/lib/metadata";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object;
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  jsonLd,
}: SEOProps) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
    </Head>
  );
}
