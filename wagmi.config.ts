import { defineConfig } from "@wagmi/cli";
import { hardhat as hardhatplugin, react } from "@wagmi/cli/plugins";
import { hardhat, sepolia } from "wagmi/chains";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  out: "src/config/generated.ts",

  plugins: [
    hardhatplugin({
      project: path.resolve(__dirname, "hardhat"),
      deployments: {
        Counter: {
          [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          [sepolia.id]: "0x81F81aBA45E26715a90eA59FD17dbbd4C2245326",
        },
      },
      commands: {
        build: false,
        rebuild: false,
        clean: false,
      },
    }),
    react(),
  ],
});
