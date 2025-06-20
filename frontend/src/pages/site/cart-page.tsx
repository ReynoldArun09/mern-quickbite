import CartContent from "@/components/site/site-cartpage/cart-content";
import CartOrderSummary from "@/components/site/site-cartpage/cart-order-summary";
import { useGetUserCartItemsQuery } from "../../services/cart/cart-query";

export default function CartPage() {
  const { data } = useGetUserCartItemsQuery();
  const cartTotal = data?.cartTotal;

  return (
    <section className="mt-10 flex h-[80vh] border container mx-auto">
      <CartContent products={data?.products || []} />
      <CartOrderSummary cartTotal={cartTotal || 0} />
    </section>
  );
}
