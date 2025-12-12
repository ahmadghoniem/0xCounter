import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "@/components/RainbowProvider.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
    <Toaster />
  </Providers>,
);
