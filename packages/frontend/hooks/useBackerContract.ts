import useContract from "./useContract";
import Backer_ABI from "../contracts/backer/Backer.json";
import type { Backer } from "../contracts/backer/Backer";
import { address } from "../config/contract";

export default function useBackerContract() {
  return useContract<Backer>(address, Backer_ABI);
}
