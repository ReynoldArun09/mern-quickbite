import SiteProductCard from "@/components/common/site-product-card";
import SiteProductSkeleton from "@/components/common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "@/components/common/typography";
import { dummyArray } from "@/lib/utils";
import { useGetVegProductsQuery } from "@/services/products/products-query";

export default function SiteTopVeg() {
  const { data: products, isLoading } = useGetVegProductsQuery();

  return (
    <ComponentWrapper aria-busy={isLoading}>
      <ComponentTitle title="Top Veg Dishes" />
      <ComponentGridContainer>
        {isLoading
          ? dummyArray.map((_, i) => <SiteProductSkeleton key={`veg-skeleton-${i}`} />)
          : products?.map((item) => <SiteProductCard key={item._id} item={item} />)}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
