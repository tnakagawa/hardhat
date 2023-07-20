import { extendEnvironment } from "hardhat/config";

import "./type-extensions";
import { getClients } from "./internal/clients";

extendEnvironment((hre) => {
  hre.viem = {
    getClients: () => getClients(hre.network.provider),
  };
});
