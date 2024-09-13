import { FC } from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
}

export const SEO: FC<SEOProps> = ({ title }) => (
  <Helmet>
    <title>{`${title} | Админ панель гостиницы Орбиталь`}</title>
  </Helmet>
);
