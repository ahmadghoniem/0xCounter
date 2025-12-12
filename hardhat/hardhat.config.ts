import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";
import path from "path";
import hardhatKeystore from "@nomicfoundation/hardhat-keystore";
import { fileURLToPath } from "url";

// ES modules (ESM), not CommonJS.
// In CommonJS (the older module system), __dirname is automatically available as a global variable that Node provides.
// In ESM (which is what modern Node and Vite use), Node doesn't provide __dirname by default.
// Instead, ESM gives you import.meta.url, which contains the file path as a URL string
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  // Use absolute paths (via __dirname) instead of relative paths
  // This ensures artifacts/cache go to /hardhat folder regardless of where commands are run from
  paths: {
    tests: path.join(__dirname, "tests"),
    sources: path.join(__dirname, "contracts"),
    artifacts: path.join(__dirname, "artifacts"),
    cache: path.join(__dirname, "cache"),
    ignition: path.join(__dirname, "ignition"),
  },
  plugins: [hardhatToolboxViemPlugin, hardhatKeystore],
  solidity: "0.8.28",
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("ETHEREUM_SEPOLIA_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
    baseSepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("BASE_SEPOLIA_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
  },
});
