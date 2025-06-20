import LoadingSpinner from "@/components/common/loading-spinner";
import SiteProductCard from "@/components/common/site-product-card";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "@/components/common/typography";
import { useGetAllProductsQuery } from "@/services/products/products-query";
import { useSearchParams } from "react-router-dom";

export default function MenuList() {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const [searchParams] = useSearchParams();

  const filterQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = products?.filter((product) => product.category.toLowerCase().includes(filterQuery));

  return (
    <ComponentWrapper className="py-2">
      <ComponentTitle title="Top Dishes for you." />
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <ComponentGridContainer>
          {filteredProducts.map((item) => (
            <SiteProductCard key={item._id} item={item} />
          ))}
        </ComponentGridContainer>
      ) : (
        <p className="text-center text-muted-foreground py-10">No dishes found matching your search.</p>
      )}
    </ComponentWrapper>
  );
}
