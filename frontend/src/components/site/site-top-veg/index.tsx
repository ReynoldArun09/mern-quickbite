import { dummyArray } from "../../../lib/utils";
import { useGetVegProductsQuery } from "../../../services/products/products-query";
import SiteProductCard from "../../common/site-product-card";
import SiteProductSkeleton from "../../common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function SiteTopVeg() {
  const { data, isLoading } = useGetVegProductsQuery();

  if (isLoading) {
    return dummyArray.map((_, i) => <SiteProductSkeleton key={`veg-skeleton-${i}`} />);
  }

  return (
    <ComponentWrapper>
      <ComponentTitle title="Top Veg Dishes" />
      <ComponentGridContainer>
        {data?.map((item, i) => (
          <SiteProductCard item={item} key={`veg-product-${i}`} />
        ))}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
