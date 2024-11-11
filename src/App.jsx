import { BrowserRouter } from "react-router-dom";
import WinXP from "./WinXP";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leap } from "@cosmos-kit/leap";

import { GasPrice } from "@cosmjs/stargate";
import "@interchain-ui/react/styles";

import { getSigningCosmosClientOptions } from "interchain";

import { WalletSelect } from "components/WalletSelect";

import { isMobile } from "react-device-detect";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


const chain = {
  chain_name: "unicorn",
  chain_id: "unicorn-420",
};
const chainAssets = {
  chain_name: "unicorn",
  assets: [],
};

const signerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signingStargate: (_chain) => {
    return getSigningCosmosClientOptions();
  },
  signingCosmwasm: (chain) => {
    switch (chain.chain_name) {
      case "unicorn":
        return {
          gasPrice: GasPrice.fromString("0.001uwunicorn"),
        };
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preferredSignType: (_chain) => {
    return "amino";
  },
};
const supportedWallets = isMobile
  ? [keplr[1], leap[1]]
  : [keplr[0], leap[0], leap[2]];
const App = () => {
  return (
    <ChainProvider
      chains={[chain]}
      assetLists={[chainAssets]}
      wallets={supportedWallets}
      walletConnectOptions={{
        signClient: { projectId: "42be0f17bcc9f94c391f66c133aaa401" },
      }}
      walletModal={WalletSelect}
      signerOptions={signerOptions}
      endpointOptions={{
        endpoints: {
          unicorn: {
            rpc: ["https://rpc.unicorn.meme"],
            rest: ["https://rest.unicorn.meme"],
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WinXP />
      </BrowserRouter>

      </QueryClientProvider>
    </ChainProvider>
  );
};

export default App;
