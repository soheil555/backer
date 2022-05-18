import useSWR from "swr";
import { Backer } from "../contracts/backer/Backer";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getCreatorPayment(backer: Backer) {
  return async (_: string, creator: string) => {
    try {
      return await backer.getCreatorPayment(creator);
    } catch (error) {
      console.error(error);
    }
  };
}

export default function useCreatorPayment(creator?: string, suspense = false) {
  const backer = useBackerContract();
  const shouldFetch = !!backer && typeof creator === "string";

  const result = useSWR(
    shouldFetch ? ["CreatorPayment", creator] : null,
    getCreatorPayment(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
