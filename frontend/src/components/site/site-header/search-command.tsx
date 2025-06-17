import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { Skeleton } from "../../ui/skeleton";

export default function SearchCommand() {
  const [openCommand, setOpenCommand] = useState(false);
  const loading = false;

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
        }}
      >
        <CommandInput />
        <CommandList>
          <CommandEmpty className={cn(loading ? "hidden" : "py-6 text-center text-sm")}>No result found</CommandEmpty>
          {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-12 w-20 rounded-sm" />
              <Skeleton className="h-4 rounded-sm" />
              <Skeleton className="h-4 rounded-sm" />
            </div>
          ) : (
            <CommandGroup>
              <CommandItem>
                <div className="space-y-1 overflow-hidden px-1 py-2">
                  <Skeleton className="h-12 w-20 rounded-sm" />
                  <Skeleton className="h-4 rounded-sm" />
                  <Skeleton className="h-4 rounded-sm" />
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
