import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Loader className="size-14 animate-spin text-primary" />
    </section>
  );
}
