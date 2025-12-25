import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { networkConfig } from "./networkConfig";
// Centralized Sui client configured for testnet only.
const DEFAULT_NETWORK = "testnet";
const resolveRpcUrl = () => {
    // Prefer the configured testnet RPC; fall back to the official endpoint if missing.
    const rpcFromConfig = networkConfig?.[DEFAULT_NETWORK]?.url;
    return rpcFromConfig ?? getFullnodeUrl(DEFAULT_NETWORK);
};
export const suiClient = new SuiClient({
    url: resolveRpcUrl(),
});
