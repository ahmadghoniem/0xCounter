# 0xCounter

# 0xCounter

A minimal, full-stack Web3 starter project designed to demonstrate robust dApp architecture. This project serves as a reference implementation for handling real-time blockchain events and ensuring data consistency via backlog synchronization.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Wagmi](https://img.shields.io/badge/Wagmi-2.0-grey)
![License](https://img.shields.io/badge/License-MIT-green)

<!-- Replace with actual screenshot -->
<img width="1200" alt="0xCounter Dashboard" src="https://via.placeholder.com/1200x600.png?text=0xCounter+Dashboard+Placeholder" />

## 🌟 Key Features

- **⚡ Real-Time Global Counter**
  Demonstrates how to listen for blockchain events in real-time and update the UI instantly across clients using Wagmi watchers.

- **🔄 Resilient Backlog Sync**
  Implements a "catch-up" mechanism to query past logs on initialization, identifying and indexing any events missed during downtime.

- **📜 Comprehensive Event History**
  Combines real-time streams with historical data from Supabase to provide a unified, persistent transaction log.

- **🆔 Integrated Web3 Identity**
  Shows how to resolve ENS names and avatars for improved user experience.

- **🔗 Multi-Chain Configuration**
  Pre-configured for both local development (Hardhat) and testnets (Sepolia), ensuring a smooth developer experience.

## 🛠️ Technology Stack

### Frontend & Core

- **React 19**: Leveraging the latest concurrent features.
- **Vite**: Lightning-fast build tool and dev server.
- **Tailwind CSS**: Utility-first styling for a bespoke design system.
- **Shadcn UI**: Beautifully designed components built with Radix UI and Tailwind.

### Web3 Integration

- **Wagmi & Viem**: The best-in-class hooks and low-level interfaces for Ethereum.
- **RainbowKit**: Beautiful, accessible wallet connection choices.

### Data & Infrastructure

- **Supabase**: High-performance database for indexing and persisting event history.
- **Hardhat**: Complete environment for smart contract development and testing.

## 🔄 Transaction Lifecycle

The application employs a dual-indexing strategy to ensure no data is lost, combining real-time listeners with a backlog synchronization mechanism.

1.  **Initiation**:
    - User clicks **Increment** in the UI.
    - `IncrementButton` triggers a transaction via Wagmi's `useWriteContract`.
    - Smart Contract emits an `Incremented(caller, value)` event upon success.

2.  **Real-Time Processing**:
    - `useWatchCounterIncrementEvent` (Wagmi) detects the event immediately.
    - The event details are captured and sent to **Supabase** via `useProcessCounterIncrement`.
    - A toast notification ("Added +1 to the counter") appears, linking to the transaction explorer.

3.  **Backlog Synchronization** (Resilience):
    - On app load, `useBacklogSync` checks the last indexed block in the database.
    - It queries the blockchain (via Viem's `getLogs`) for any events having occurred since that block.
    - Any missing events (e.g., those occurring while the app was closed) are batched and inserted into Supabase.

4.  **Display**:
    - The `CounterEvents` component fetches the unified list from Supabase.
    - Users see a complete, persistent history of all interactions.

## 🏗️ Project Structure

```
0xCounter/
├── hardhat/                # Smart contract development
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── config/             # App configuration
│   ├── features/           # Feature-based logic
│   │   ├── counter/        # Counter specific logic & UI
│   │   ├── counter-events/ # Event processing & history
│   │   └── identity/       # User identity & authentication
│   ├── hooks/              # Global React hooks
│   ├── lib/                # Utilities
│   ├── services/           # External service integrations (Supabase)
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Metamask or another Web3 wallet

### Installation

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. **Configuration (Secrets Management)**

   This project uses the **Hardhat Keystore** plugin for secure secret management, avoiding plain-text `.env` files for sensitive keys.

   Set your private key (for deployment) and RPC URLs (for fetching data):

   ```bash
   # Private key for the deployer account
   pnpm hardhat vars set WALLET_PRIVATE_KEY

   # RPC URL for Sepolia (WebSocket WSS is recommended for reliable event listening)
   pnpm hardhat vars set ETHEREUM_SEPOLIA_RPC_URL
   ```

   > **Note**: For `ETHEREUM_SEPOLIA_RPC_URL`, use a provider like [Infura](https://docs.metamask.io/services/get-started/infura) or Alchemy. **Crucial**: Use the `wss://` (WebSocket) endpoint, not `https://`. See [Troubleshooting](#-troubleshooting) for why.

### Running Locally

Start the development server:

```bash
pnpm dev
```

To run the local hardhat node and deploy contracts:

```bash
pnpm hardhat:node
pnpm hardhat:deploy
```

**Deploying to Sepolia Testnet**:

1. **Get Testnet Funds**: You need Sepolia ETH to pay for gas. Claim it for free from the [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
2. **Deploy**:

```bash
pnpm hardhat:deploy:sepolia
```

### Code Generation

Sync Wagmi hooks with your smart contracts:

```bash
pnpm wagmi:generate
```

## 🔧 Troubleshooting

### Reliable Event Listening (WebSockets vs HTTPS)

If you notice that `useWatchContractEvent` isn't firing on Sepolia, check your RPC transport config.

- **The Issue**: Public `https` endpoints often rely on polling, which can be slow or inconsistent, causing the app to miss real-time events.
- **The Fix**: Explicitly configure a **WebSocket (`wss://`)** transport in `wagmi.config.ts` (and your Hardhat vars). This establishes a persistent connection, allowing the node to push events to your client instantly.

### Local Development Pitfalls

- **"Contract not found" after restart**: Restarting the local Hardhat node (`pnpm hardhat:node`) wipes the local blockchain state. You **must** redeploy your contracts (`pnpm hardhat:deploy`) and reset your Metamask account's nonce (Settings > Advanced > Clear Activity Tab Data) after every restart.
