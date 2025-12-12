import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates an Ethereum address to show the first 6 and last 4 characters,
 * separated by an ellipsis (...).
 * @param {string | undefined | null} address The full Ethereum address (e.g., 0xAb5801a7d3999359aB9aCdE645a2d61d9aEa8c54).
 * @returns {string} The truncated address (e.g., 0xAb58...8c54) or an empty string if invalid.
 */
export function truncateAddress(address: string | undefined | null) {
  // Check if the address is valid, not null, and long enough to truncate
  if (!address || typeof address !== "string" || address.length < 10) {
    return "";
  }

  // Ensure it's a valid hex address by checking the '0x' prefix (optional but good practice)
  if (!address.startsWith("0x")) {
    return "";
  }

  // Take the first 6 characters (including '0x') and the last 4 characters
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);

  return `${start}...${end}`;
}

type ResourceType = "address" | "transaction";

export function getExplorerUrl(
  chainId: number,
  hashOrAddress: string,
  resourceType: ResourceType,
): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    11155111: "https://sepolia.etherscan.io",
    84532: "https://sepolia.basescan.org",
    31337: "#",
  };

  const resourcePaths: Record<ResourceType, string> = {
    address: "/address/",
    transaction: "/tx/",
  };

  const baseUrl: string | undefined = explorers[chainId];

  if (!baseUrl || baseUrl === "#") {
    return "#";
  }

  const path: string | undefined = resourcePaths[resourceType];

  if (!path) {
    return "#";
  }

  return `${baseUrl}${path}${hashOrAddress}`;
}
