import { Contract } from "ethers";
import { useMemo } from "react";
import useAppSelector from "./useAppSelector";

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const {
    web3Provider,
    chainId,
    address: userAddress,
  } = useAppSelector((state) => state.web3);

  return useMemo(() => {
    if (!address || !ABI || !web3Provider || !chainId || !userAddress) {
      return null;
    }

    try {
      return new Contract(address, ABI, web3Provider.getSigner(userAddress));
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [web3Provider, userAddress, chainId, address, ABI]) as T;
}
