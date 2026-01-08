import Providers from "@/components/RainbowProvider.tsx"
import "@rainbow-me/rainbowkit/styles.css"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
)
