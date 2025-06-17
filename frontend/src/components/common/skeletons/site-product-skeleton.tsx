import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

export default function SiteProductSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-40 w-full" />
      </CardHeader>

      <CardContent className="flex items-center justify-between py-2">
        <Skeleton className="h-6 w-3/4" />
      </CardContent>

      <CardFooter className="py-1">
        <Skeleton className="h-16 w-full" />
      </CardFooter>

      <CardFooter className="flex justify-between py-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </CardFooter>

      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
