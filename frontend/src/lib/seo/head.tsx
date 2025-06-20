import { Helmet } from "react-helmet-async";

interface HeadProps {
  title: string;
  description: string;
}

export default function Head({ title, description }: HeadProps) {
  return (
    <Helmet title={`QuickBite | ${title}`} defaultTitle="Food Delivery Application">
      <meta name="description" content={description} />
    </Helmet>
  );
}
