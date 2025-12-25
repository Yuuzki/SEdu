import React, { useCallback, useMemo } from "react";
import {
  SuiClientProvider,
  WalletProvider,
  useConnectWallet,
  useCurrentAccount,
  useWallets,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { networkConfig } from "./networkConfig";

const queryClient = new QueryClient();

export function SuiProviders({ children }: { children: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider 
          autoConnect 
          preferredWallets={["Slush"]}
          storageKey="sui-slush-wallet"
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export function useSlushWallet() {
  const { mutate: connect, isPending } = useConnectWallet();
  const { mutate: disconnectWallet, isPending: isDisconnecting } = useDisconnectWallet();
  const wallets = useWallets();
  const currentAccount = useCurrentAccount();

  const slushWallet = useMemo(
    () => wallets.find((wallet) => wallet.name.toLowerCase().includes("slush")),
    [wallets],
  );

  const connectSlush = useCallback(
    (callbacks?: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
      // Chỉ cho phép kết nối với Slush wallet
      if (!slushWallet) {
        const error = new Error("Vui lòng cài đặt và mở ví Slush để tiếp tục. Ứng dụng chỉ hỗ trợ ví Slush.");
        callbacks?.onError?.(error);
        alert("Vui lòng cài đặt và mở ví Slush để tiếp tục. Ứng dụng chỉ hỗ trợ ví Slush.");
        return;
      }

      connect(
        { wallet: slushWallet },
        {
          onSuccess: () => callbacks?.onSuccess?.(),
          onError: (error) => callbacks?.onError?.(error),
        },
      );
    },
    [connect, slushWallet],
  );

  return {
    currentAccount,
    connectSlush,
    disconnectWallet,
    isConnecting: isPending,
    isDisconnecting,
  };
}
