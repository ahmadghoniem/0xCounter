import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "@/components/rainbow-provider.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
import Connect from "@/components/connect.tsx";
import CounterHistory from "@/components/CounterIncrHistory.tsx";
createRoot(document.getElementById("root")!).render(
  <Providers>
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex gap-4 flex-start">
        <div className="flex flex-col gap-4">
          <App />
          <Connect />
        </div>
        <CounterHistory />
      </div>
    </div>
    <Toaster />
  </Providers>,
);
