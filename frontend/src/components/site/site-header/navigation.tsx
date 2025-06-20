import SiteLogo from "@/components/common/site-logo";
import { cn } from "@/lib/utils";
import { Cookie, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { pathName: "Home", href: "/", icon: Home },
  { pathName: "Menu", href: "/menu", icon: Cookie },
];

export default function Navigation() {
  const { pathname } = useLocation();
  return (
    <nav className="flex items-center justify-center gap-x-20">
      <SiteLogo />
      <div className="space-x-8 flex items-center">
        {navLinks.map((item) => (
          <Link
            key={item.pathName}
            to={item.href}
            className={cn(
              "flex items-center gap-2 font-semibold tracking-wide transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon size={20} />
            {item.pathName}
          </Link>
        ))}
      </div>
    </nav>
  );
}
