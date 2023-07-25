import type { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

export async function deployContract(
  hre: HardhatRuntimeEnvironment,
  contractName: string
) {
  const viem = await import("viem");

  const Artifact = await hre.artifacts.readArtifact(contractName);

  const {
    publicClient,
    walletClients: [walletClient],
  } = await hre.viem.getClients();
  const txHash = await walletClient.deployContract({
    abi: Artifact.abi,
    bytecode: Artifact.bytecode as "0x{string}",
    args: [],
  });

  const contractAddress = (
    await publicClient.waitForTransactionReceipt({
      hash: txHash,
    })
  ).contractAddress!;

  const contract = viem.getContract({
    address: contractAddress,
    publicClient,
    walletClient,
    abi: Artifact.abi,
  });

  return contract as any;
}
