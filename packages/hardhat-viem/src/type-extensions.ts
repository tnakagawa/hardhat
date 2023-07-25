import "hardhat/types/runtime";

import type { HardhatViemClients, deployContract } from "./types";

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    viem: {
      getClients(): Promise<HardhatViemClients>;
      deployContract: typeof deployContract,
    };
  }
}
