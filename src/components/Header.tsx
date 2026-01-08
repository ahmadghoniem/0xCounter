import RainbowKitConnectButton from "./RainbowKitConnectButton"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <h1 className="font-mono text-xl font-bold">0xCounter</h1>
      </div>
      <RainbowKitConnectButton />
    </header>
  )
}
