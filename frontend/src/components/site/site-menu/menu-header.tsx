import { menulist } from "@/constants/menu-data";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function MenuHeader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", query);
    setSearchParams(newParams);
  };

  return (
    <ComponentWrapper>
      <ComponentTitle title="Select from our best menu's" />
      <div className="flex items-center justify-between gap-8 mt-4">
        {menulist.map((item) => (
          <div key={item.name} onClick={() => handleChange(item.name)}>
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                "active:scale-90 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              )}
            />
            <p className="pt-4 text-center">{item.name}</p>
          </div>
        ))}
      </div>
    </ComponentWrapper>
  );
}
