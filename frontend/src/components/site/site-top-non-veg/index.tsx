import SiteProductCard from "@/components/common/site-product-card";
import SiteProductSkeleton from "@/components/common/skeletons/site-product-skeleton";
import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "@/components/common/typography";
import { dummyArray } from "@/lib/utils";
import { useGetNonVegProductsQuery } from "@/services/products/products-query";

export default function SiteTopNonVeg() {
  const { data: products, isLoading } = useGetNonVegProductsQuery();

  return (
    <ComponentWrapper>
      <ComponentTitle title="Top Non-Veg Dishes" />
      <ComponentGridContainer>
        {isLoading
          ? dummyArray.map((_, i) => <SiteProductSkeleton key={`nonveg-skeleton-${i}`} />)
          : products?.map((item) => <SiteProductCard key={item._id} item={item} />)}
      </ComponentGridContainer>
    </ComponentWrapper>
  );
}
