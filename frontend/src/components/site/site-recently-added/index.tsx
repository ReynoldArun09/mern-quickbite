import { dummyArray } from "@/lib/utils";
import { useGetRecentlyAddedProductsQuery } from "@/services/products/products-query";
import SiteProductCard from "../../common/site-product-card";
import SiteProductSkeleton from "../../common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function SiteRecentlyAdded() {
  const { data, isLoading } = useGetRecentlyAddedProductsQuery();

  if (isLoading) {
    return dummyArray.map((_, i) => <SiteProductSkeleton key={`recent-skeleton-${i}`} />);
  }

  return (
    <ComponentWrapper>
      <ComponentTitle title="Recently Added Dishes" />
      <ComponentGridContainer>
        {data?.map((item, i) => (
          <SiteProductCard item={item} key={`recent-product-${i}`} />
        ))}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
