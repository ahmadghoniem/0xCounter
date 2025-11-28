import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Connect() {
  const { address, isConnected, chain } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/**When you connect multiple accounts in MetaMask's initial prompt,
       * you are granting the dApp permission to view and interact with all those accounts.
       * the dApp itself, using the useAccount hook from Wagmi, only reads the currently selected/active account within the MetaMask extension */}
      <ConnectButton
        label="Connect your wallet"
        accountStatus="full"
        chainStatus="full"
        showBalance={false}
      />
      {isConnected && (
        <>
          <div className="text-sm">{address}</div>
          <div className="text-sm">
            Connected Chain {chain?.name} ID: {chain?.id}
          </div>
        </>
      )}
    </div>
  );
}
/**
The wallet (MetaMask) is designed to be the definitive controller of the user's active identity and permissions.
When you switch the active account in MetaMask, the wallet extension sends an accountsChanged event to the connected dApp.
Wagmi (and therefore RainbowKit) listens for this event and automatically updates its state, which is why your useAccount() hook (and the UI) updates to the new address.
This is a fundamental security and UX pattern in Web3: the dApp cannot decide which of your accounts to use; only the wallet can change the active account. */
