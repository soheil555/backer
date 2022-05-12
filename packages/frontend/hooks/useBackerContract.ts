import useContract from "./useContract";
import Backer_ABI from "../contracts/backer/Backer.json";
import type { Backer } from "../contracts/backer/Backer";
import { backer } from "../config/contract";

export default function useBackerContract() {
  return useContract<Backer>(backer.localhost.address, Backer_ABI);
}
