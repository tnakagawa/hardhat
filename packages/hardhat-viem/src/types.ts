import type {
  Account,
  Chain,
  PublicClient,
  TestClient,
  Transport,
  WalletClient,
} from "viem";

export interface HardhatViemClients {
  publicClient: PublicClient;
  walletClients: WalletClient<Transport, Chain, Account>[];
  testClient: TestClient;
}
