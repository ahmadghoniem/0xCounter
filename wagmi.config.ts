import { defineConfig } from "@wagmi/cli";
import { hardhat as hardhatplugin } from "@wagmi/cli/plugins";
import { hardhat } from "wagmi/chains";
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
          [hardhat.id]: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        },
      },
      commands: {
        build: false,
        rebuild: false,
        clean: false,
      },
    }),
  ],
});

/* you need to add each contract address to hardhatPlugin so you can get the contract  Config object

    export const CounterAddress = {
      31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    } as const
    export const CounterConfig = {
      address: CounterAddress,
      abi: CounterAbi,
    } as const

*/
