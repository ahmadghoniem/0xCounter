import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const counterAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'InvalidIncrement' },
  { type: 'error', inputs: [], name: 'NotOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'by', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Increment',
  },
  {
    type: 'function',
    inputs: [],
    name: 'count',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'by', internalType: 'uint256', type: 'uint256' }],
    name: 'incBy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const counterAddress = {
  31337: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  11155111: '0x81F81aBA45E26715a90eA59FD17dbbd4C2245326',
} as const

/**
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const counterConfig = {
  address: counterAddress,
  abi: counterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useReadCounter = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  address: counterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"count"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useReadCounterCount = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'count',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"owner"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useReadCounterOwner = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useWriteCounter = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  address: counterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"inc"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useWriteCounterInc = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'inc',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"incBy"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useWriteCounterIncBy = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'incBy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useSimulateCounter = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
  address: counterAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"inc"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useSimulateCounterInc = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'inc',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"incBy"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useSimulateCounterIncBy = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
  address: counterAddress,
  functionName: 'incBy',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useWatchCounterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: counterAbi,
  address: counterAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__ and `eventName` set to `"Increment"`
 *
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x81F81aBA45E26715a90eA59FD17dbbd4C2245326)
 */
export const useWatchCounterIncrementEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: counterAbi,
    address: counterAddress,
    eventName: 'Increment',
  })
