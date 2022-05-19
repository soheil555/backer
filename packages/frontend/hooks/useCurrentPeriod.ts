import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getCurrentPeriod(backer: Backer) {
  return async (_: string) => {
    return await backer.currentPeriod();
  };
}

export default function useCurrentPeriod(suspense = false) {
  const backer = useBackerContract();

  const shouldFetch = !!backer;

  const result = useSWR(
    shouldFetch ? ["CurrentPeriod"] : null,
    getCurrentPeriod(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
