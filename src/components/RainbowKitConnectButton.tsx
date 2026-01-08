import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function RainbowKitConnectButton() {
  return (
    <ConnectButton
      label="Connect your wallet"
      accountStatus="full"
      chainStatus="full"
      showBalance={true}
    />
  )
}
