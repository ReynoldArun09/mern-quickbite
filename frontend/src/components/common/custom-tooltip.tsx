import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function CustomToolTip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
