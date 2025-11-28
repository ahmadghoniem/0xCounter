import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SystemModule = buildModule("SystemModule", (m) => {
  // m.contract is a Future
  const counter = m.contract("Counter");

  // m.call is a Future that calls a function on a deployed contract
  m.call(counter, "incBy", [10n]); // The 'n' suffix denotes a BigInt

  return { counter };
});

export default SystemModule;
/**
 * If you pass a regular JavaScript number that is larger than $2^{53}$ to a contract JavaScript will lose precision by rounding the number.
 * JavaScript's maximum safe integer, which is $2^{53} - 1$ (or 9,007,199,254,740,991) Number.MAX_SAFE_INTEGER
 * 9007199254740992 === 9007199254740993;  This evaluates to TRUE!
 * uint data type in a Solidity contract equates to uint256 by defaul
 * The BigInt primitive was introduced in modern JavaScript specifically to solve this problem.
 * It can represent integers of arbitrary precision, meaning it can safely handle the full range of a Solidity uint256 without any loss of data.
 */
