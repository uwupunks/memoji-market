import { Routes, BrowserRouter, Route } from "react-router-dom";
import WinXP from "./WinXP";
import Trading from "components/Trading";

import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leap } from "@cosmos-kit/leap";

import { GasPrice } from "@cosmjs/stargate";
import "@interchain-ui/react/styles";

import { getSigningCosmosClientOptions } from "interchain";

import { WalletSelect } from "components/WalletSelect";

import { isMobile } from "react-device-detect";

const chain = {
  chain_name: "osmosis",
  chain_id: "osmosis-1",
};
const chainAssets = {
  chain_name: "osmosis",
  assets: [],
};

const signerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signingStargate: (_chain) => {
    return getSigningCosmosClientOptions();
  },
  signingCosmwasm: (chain) => {
    switch (chain.chain_name) {
      case "osmosis":
        return {
          gasPrice: GasPrice.fromString("0.025uosmo"),
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
          osmosis: {
            rpc: ["https://rpc.testnet.osmosis.zone"],
            rest: ["https://lcd.testnet.osmosis.zone"],
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/winxp" Component={WinXP} />
          <Route path="/" Component={Trading} />
        </Routes>
        <WalletSelect />
      </BrowserRouter>
    </ChainProvider>
  );
};

export default App;
