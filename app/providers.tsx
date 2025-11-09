// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import Navbar from "./(frontend)/components/NavBar/Navbar";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { fetchUser } from "./redux/features/userAuth/userAuthSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<String | null>(null);
  // Initialize QueryClient once per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
          },
        },
      })
  );

  const pathname = usePathname();

  useEffect(() => {
    const initUsers = async () => {
      await store.dispatch(fetchUser());
      setUsername(localStorage.getItem("user"));
    };

    initUsers();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {pathname === "/signup" || "/login" ? <Navbar /> : null}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
