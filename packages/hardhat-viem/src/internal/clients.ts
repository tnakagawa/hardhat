import type { EthereumProvider } from "hardhat/types";
import type { Account, Chain, Transport } from "viem";
import type { HardhatViemClients } from "../types";

import memoize from "lodash.memoize";

import {
  privateKeyToAccount,
  mnemonicToAccount,
  hdKeyToAccount,
} from "viem/accounts";

const checkIsHardhatNetwork = memoize(async (provider: EthereumProvider) => {
  try {
    await provider.send("hardhat_metadata");
    return true;
  } catch {
    return false;
  }
});

const getChainId = memoize(async (provider: EthereumProvider) => {
  return Number(await provider.send("eth_chainId"));
});

const getAccounts = memoize(
  async (provider: EthereumProvider): Promise<Array<`0x{string}`>> => {
    return provider.send("eth_accounts");
  }
);

export async function getClients(
  provider: EthereumProvider
): Promise<HardhatViemClients> {
  const viem = await import("viem");
  const chains = require("viem/chains") as Record<string, Chain>;

  // get required values
  const chainId = await getChainId(provider);
  const isHardhatNetwork = await checkIsHardhatNetwork(provider);
  const accounts = await getAccounts(provider);
  const isLocalNetwork = chainId === 31337;
  const pollingInterval = isLocalNetwork ? 0 : 4000;
  const chain = isLocalNetwork
    ? isHardhatNetwork
      ? chains.hardhat
      : chains.foundry
    : Object.values(chains).find((c: Chain) => "id" in c && c.id === chainId) ??
      chains.mainnet;

  // create public client
  const publicClient = viem.createPublicClient({
    chain,
    transport: viem.custom(provider),
    pollingInterval,
  });

  // create wallet clients
  const walletClients = accounts.map((account) =>
    viem.createWalletClient<Transport, Chain, Account>({
      chain,
      account,
      transport: viem.custom(provider),
      pollingInterval,
    })
  );

  // create test client
  const testClient = viem.createTestClient({
    mode: "hardhat",
    chain,
    transport: viem.custom(provider),
    pollingInterval,
  });

  return {
    publicClient,
    walletClients,
    testClient,
  };
}
