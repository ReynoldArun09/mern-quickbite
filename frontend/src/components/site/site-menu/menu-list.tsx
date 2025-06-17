import { useGetAllProductsQuery } from "@/services/products/products-query";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../common/loading-spinner";
import SiteProductCard from "../../common/site-product-card";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function MenuList() {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const [searchParams] = useSearchParams();

  const filterQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products?.filter((product) => product.category.toLowerCase().includes(filterQuery));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ComponentWrapper>
      <ComponentTitle title="Top Dishes for you." />
      <ComponentGridContainer>
        {filteredProducts?.map((item, index) => (
          <SiteProductCard item={item} key={`menu-product-key-${index}`} />
        ))}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
