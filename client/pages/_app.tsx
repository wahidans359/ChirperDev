import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Inter } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="232946542572-jpgtvea7qd1n852f64qcfct9h8cn64vv.apps.googleusercontent.com">
        <Component {...pageProps} />
        <ReactQueryDevtools/>
        <Toaster />
        
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>

}
