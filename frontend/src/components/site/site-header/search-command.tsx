import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useSearchProductsQuery } from "@/services/products/products-query";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { Skeleton } from "../../ui/skeleton";

export default function SearchCommand() {
  const [openCommand, setOpenCommand] = useState(false);
  const [query, setQuery] = useState("");
  const debounceValue = useDebounce(query, 1000);
  const { data: products, isLoading } = useSearchProductsQuery(debounceValue);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommand((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button onClick={() => setOpenCommand(!openCommand)}>
        <SearchIcon />
        <span>Search here...</span>
        <abbr
          title="Control"
          className="select-none rounded border border-white px-1.5 py-0.5 text-xs
          font-medium no-underline shadow-sm disabled:opacity-50"
        >
          Ctrl K
        </abbr>
      </Button>
      <CommandDialog
        open={openCommand}
        onOpenChange={(open) => {
          setOpenCommand(open);
          if (!open) {
            setQuery("");
          }
        }}
      >
        <CommandInput placeholder="search food here.." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty className={cn(isLoading ? "hidden" : "py-6 text-center text-sm")}>No result found</CommandEmpty>
          {isLoading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-12 w-20 rounded-sm" />
              <Skeleton className="h-4 rounded-sm" />
              <Skeleton className="h-4 rounded-sm" />
            </div>
          ) : (
            <CommandGroup>
              {products?.map((group) => (
                <CommandItem key={group?.name} className="mr-20 flex h-fit justify-between" value={group.name}>
                  <img src={group?.image} alt={group.name} className="h-12 w-20" />
                  <span className="truncate font-bold">{group?.name}</span>
                  <span className="text-primary font-bold">$ {group?.price}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
