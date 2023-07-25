import { extendEnvironment } from "hardhat/config";

import "./type-extensions";
import { getClients } from "./internal/clients";
import { deployContract } from "./internal/contracts";

import "./internal/tasks"

extendEnvironment((hre) => {
  hre.viem = {
    getClients: () => getClients(hre.network.provider),
    deployContract: (contractName: string) => deployContract(hre, contractName),
  };
});
