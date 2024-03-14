import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x4A88a531d53090884de0a4e73c07Ca9638C61665", //contract add
        abi as any,
        signer
    );
}