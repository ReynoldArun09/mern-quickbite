import { ComponentTitle, ComponentWrapper } from "@/components/common/typography";
import { menulist } from "@/constants/menu-data";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

export default function MenuHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeQuery = searchParams.get("q")?.toLowerCase() || "";

  const handleChange = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", query.toLowerCase());
    setSearchParams(newParams);
  };

  return (
    <ComponentWrapper>
      <ComponentTitle title="Select from our best menu's" className="pb-4" />
      <div className="flex items-center justify-between gap-8 mt-4">
        {menulist.map((item) => {
          const isActive = activeQuery === item.name.toLowerCase();

          return (
            <button
              key={item.name}
              onClick={() => handleChange(item.name)}
              className="flex flex-col items-center focus:outline-none"
              aria-label={`select by ${item.name}`}
              aria-pressed={isActive}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className={cn(
                  "w-24 h-24 rounded-full object-cover transition-transform duration-300 ease-in-out",
                  "hover:scale-110 hover:-translate-y-1 active:scale-95",
                  isActive && "ring-2 ring-primary scale-110"
                )}
              />
              <p className={cn("pt-3 text-sm font-medium", isActive && "text-primary font-semibold")}>{item.name}</p>
            </button>
          );
        })}
      </div>
    </ComponentWrapper>
  );
}
