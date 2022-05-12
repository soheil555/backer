import type { Web3Provider } from "@ethersproject/providers";
import useAppSelector from "../hooks/useAppSelector";
import useSWR from "swr";

function getBlockNumber(web3Provier: Web3Provider) {
  return async () => {
    return await web3Provier.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const { web3Provider } = useAppSelector((state) => state.web3);

  const shouldFetch = !!web3Provider;

  return useSWR(
    shouldFetch ? ["BlockNumber"] : null,
    getBlockNumber(web3Provider!),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
