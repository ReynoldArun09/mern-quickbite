import SiteProductCard from "@/components/common/site-product-card";
import SiteProductSkeleton from "@/components/common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "@/components/common/typography";
import { dummyArray } from "@/lib/utils";
import { useGetRecentlyAddedProductsQuery } from "@/services/products/products-query";

export default function SiteRecentlyAdded() {
  const { data: products, isLoading } = useGetRecentlyAddedProductsQuery();

  return (
    <ComponentWrapper aria-busy={isLoading}>
      <ComponentTitle title="Recently Added Dishes" />
      <ComponentGridContainer>
        {isLoading
          ? dummyArray.map((_, i) => <SiteProductSkeleton key={`recent-skeleton-${i}`} />)
          : products?.map((item) => <SiteProductCard key={item._id} item={item} />)}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
