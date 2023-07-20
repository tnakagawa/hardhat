import "hardhat/types/runtime";

import type { HardhatViemClients } from "./types";

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    viem: {
      getClients(): Promise<HardhatViemClients>;
    };
  }
}
