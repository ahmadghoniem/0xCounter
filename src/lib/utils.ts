import { wagmiConfig } from "@/config/wagmi"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates an Ethereum address to show the first 6 and last 4 characters,
 * separated by an ellipsis (...).
 * @param {`0x${string}` | undefined | null} address The full Ethereum address (e.g., 0xAb5801a7d3999359aB9aCdE645a2d61d9aEa8c54).
 * @returns {string} The truncated address (e.g., 0xAb58...8c54) or an empty string if invalid.
 */
export function truncateAddress(address: `0x${string}` | undefined | null) {
  // Check if the address is valid, not null, and long enough to truncate
  if (!address || typeof address !== "string" || address.length < 10) {
    return ""
  }

  // Ensure it's a valid hex address by checking the '0x' prefix (optional but good practice)
  if (!address.startsWith("0x")) {
    return ""
  }

  // Take the first 6 characters (including '0x') and the last 4 characters
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 4)

  return `${start}...${end}`
}

export function getExplorerUrl(
  chainId: number,
  hashOrAddress: string,
  resourceType: "address" | "transaction"
): string {
  const chain = wagmiConfig.chains.find((c) => c.id === chainId)

  if (!chain?.blockExplorers?.default) {
    return "#"
  }

  const resourcePaths: Record<"address" | "transaction", string> = {
    address: "/address/",
    transaction: "/tx/"
  }

  const path = resourcePaths[resourceType]
  const explorerUrl = chain.blockExplorers.default.url
  return `${explorerUrl}${path}${hashOrAddress}`
}

export function toLowerAddress(addr: `0x${string}`): `0x${string}` {
  return addr.toLowerCase() as `0x${string}`
}
