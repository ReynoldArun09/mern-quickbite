import ErrorFallback from "@/components/common/error-fallback";
import LoadingSpinner from "@/components/common/loading-spinner";
import { ThemeProvider } from "@/context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark">
              {children}
              <Toaster richColors />
              {import.meta.env.VITE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
