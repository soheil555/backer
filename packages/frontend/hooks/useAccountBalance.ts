import useBackerContract from "./useBackerContract";
import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getAccountBalance(backer: Backer) {
  return async (_: string, address: string) => {
    const balance = await backer.getBalance(address);
    return balance;
  };
}

export default function useAccountBalance(address?: string, suspense = false) {
  const backer = useBackerContract();

  const shouldFetch = !!backer && typeof address === "string";

  const result = useSWR(
    shouldFetch ? ["AccountBalance", address] : null,
    getAccountBalance(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
