import useSWR, { Fetcher } from "swr";
import { Backer } from "../contracts/backer/Backer";
import { Subscriber } from "../types/subscriber";
import useBackerContract from "./useBackerContract";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getSubscribers(backer: Backer) {
  return async (_: string, creator: string) => {
    return (await backer.getCreatorSubscribers(creator)) as Subscriber[];
  };
}

export default function useSubscribers(creator?: string, suspense = false) {
  const backer = useBackerContract();
  const shouldFetch = !!backer && typeof creator === "string";

  const result = useSWR(
    shouldFetch ? ["Subscribers", creator] : null,
    getSubscribers(backer!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
