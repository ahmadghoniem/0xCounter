import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function RainbowKitConnectButton() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex flex-col items-center justify-between">
        <ConnectButton
          label="Connect your wallet"
          accountStatus="full"
          chainStatus="full"
          showBalance={true}
        />
      </div>
    </div>
  )
}
