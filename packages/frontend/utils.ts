import type { BigNumberish } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export function parseBalance(
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) {
  return parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
}
