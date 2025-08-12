import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
};

export const SEO = ({ title, description, canonical }: SEOProps) => {
  const url = canonical || (typeof window !== "undefined" ? window.location.href : undefined);
  const metaDescription = description || "Sistema de gestão para academias: turmas, presenças, aniversários e mensalidades.";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
