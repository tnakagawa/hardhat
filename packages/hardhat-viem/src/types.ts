import type {
  Abi,
  Account,
  Address,
  Chain,
  GetContractReturnType,
  PublicClient,
  TestClient,
  Transport,
  WalletClient,
} from "viem";
import type { TestClientMode } from "viem/dist/types/clients/createTestClient";

export interface HardhatViemClients {
  publicClient: PublicClient<Transport, Chain>;
  walletClients: WalletClient<Transport, Chain, Account>[];
  testClient: TestClient<TestClientMode, Transport, Chain>;
}

export declare function deployContract(
  contractName: string
): Promise<
  GetContractReturnType<
    Abi,
    PublicClient<Transport, Chain>,
    WalletClient<Transport, Chain, Account>,
    Address
  >
>;
