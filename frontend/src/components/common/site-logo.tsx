import { ChefHatIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteLogo() {
  return (
    <Link to="/" className="flex items-center gap-1 text-primary" aria-label="Go To Homepage">
      <ChefHatIcon />
      <h1 className="font-bold tracking-wider">QuickBite</h1>
    </Link>
  );
}
