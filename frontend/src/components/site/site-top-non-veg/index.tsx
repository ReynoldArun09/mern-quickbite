import { dummyArray } from "@/lib/utils";
import { useGetNonVegProductsQuery } from "@/services/products/products-query";
import SiteProductCard from "../../common/site-product-card";
import SiteProductSkeleton from "../../common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function SiteTopNonVeg() {
  const { data, isLoading } = useGetNonVegProductsQuery();

  if (isLoading) {
    return (
      <ComponentGridContainer>
        {dummyArray.map((_, i) => (
          <SiteProductSkeleton key={`non-veg-skeleton-${i}`} />
        ))}
      </ComponentGridContainer>
    );
  }

  return (
    <ComponentWrapper>
      <ComponentTitle title="Top Non-Veg Dishes" />
      <ComponentGridContainer>
        {data?.map((item, i) => (
          <SiteProductCard item={item} key={`non-veg-product-${i}`} />
        ))}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
