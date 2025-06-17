import { cn } from "@/lib/utils";

interface ComponentTitleProps extends React.HTMLAttributes<HTMLHeadElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title: string;
}

const ComponentTitle = ({ className, title, as: Comp = "h1", ...props }: ComponentTitleProps) => {
  return (
    <Comp className={cn("text-center text-4xl font-extrabold", className)} {...props}>
      {title}
    </Comp>
  );
};

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  children: React.ReactNode;
}

const ComponentGridContainer = ({ children, className, as: Comp = "div", ...props }: ComponentProps) => {
  return (
    <Comp className={cn("mt-8 grid grid-cols-[repeat(auto-fill, minmax(300px,1fr))] gap-8", className)} {...props}>
      {children}
    </Comp>
  );
};

const ComponentWrapper = ({ children, className, as: Comp = "section", ...props }: ComponentProps) => {
  return (
    <Comp className={cn("mt-10", className)} {...props}>
      {children}
    </Comp>
  );
};

export { ComponentGridContainer, ComponentTitle, ComponentWrapper };
