import type { BigNumberish } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { period } from "./config/contract";

export function parseBalance(
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) {
  return parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
}

export function secondsToMdhms(seconds: number) {
  const months = Math.floor(seconds / (3600 * 24 * 30));
  const days = Math.floor(((seconds % (3600 * 24 * 30)) / 3600) * 24);
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainSeconds = Math.floor(seconds % 60);

  const monthsDisplay =
    months > 0 ? months + (months === 1 ? " month, " : " months, ") : "";

  const daysDisplay =
    days > 0 ? days + (days === 1 ? " day, " : " days, ") : "";

  const hoursDisplay =
    hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : "";

  const minutsDsiplay =
    minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";

  const secondsDsiplay =
    remainSeconds > 0
      ? remainSeconds + (remainSeconds === 1 ? " second, " : " seconds, ")
      : "";

  return (
    monthsDisplay +
    daysDisplay +
    hoursDisplay +
    minutsDsiplay +
    secondsDsiplay
  ).replace(/,\s*$/, "");
}

export function parsePeriod() {
  return secondsToMdhms(period);
}
