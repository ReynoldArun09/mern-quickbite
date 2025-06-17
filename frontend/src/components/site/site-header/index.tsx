import CartSheet from "./cart-sheet";
import Navigation from "./navigation";
import SearchCommand from "./search-command";
import UserProfile from "./user-profile";

export default function SiteHeader() {
  return (
    <header className="container items-center mx-auto flex justify-between border-b h-12">
      <div>
        <Navigation />
      </div>
      <div className="flex justify-between items-center gap-2.5">
        <SearchCommand />
        <CartSheet />
        <UserProfile />
      </div>
    </header>
  );
}
