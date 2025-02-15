import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndContext } from "@dnd-kit/core";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

// Create a client for React Query
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DndContext>
        <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Navbar */}
          <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
              <div className="flex space-x-4">
                <Link href="/" className="hover:text-yellow-400">
                  Home
                </Link>
                <Link href="/scan" className="hover:text-yellow-400">
                  Scan Barcode
                </Link>
                <Link href="/kanban" className="hover:text-yellow-400">
                  Kanban Board
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 pt-20">
            {" "}
            <Component {...pageProps} />
          </div>
        </div>
      </DndContext>
    </QueryClientProvider>
  );
}
