import SiteLogo from "@/components/common/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PurchaseCancelPage() {
  return (
    <section className="flex flex-col space-y-2.5 items-center justify-center min-h-screen">
      <SiteLogo />
      <h1 className="text-xl">Payment process failed.</h1>
      <p className="text-md tracking-wider">Something went wrong while processing your payment. Check your details.</p>
      <div className="py-5">
        <Link to="/cart" className={cn(buttonVariants({ variant: "default" }))}>
          Back to cart page <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
