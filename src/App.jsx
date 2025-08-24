import { Routes, BrowserRouter, Route } from "react-router-dom";
import WinXP from "./WinXP";
import Trading from "components/Trading";

import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leap } from "@cosmos-kit/leap";
import { CHAIN_ID, RPC, SERVER } from "src/constants";

import { GasPrice } from "@cosmjs/stargate";
import "@interchain-ui/react/styles";

import { getSigningCosmosClientOptions } from "interchain";

import { WalletSelect } from "components/WalletSelect";

import { isMobile } from "react-device-detect";

const chain = {
  chain_name: "osmosis",
  chain_id: CHAIN_ID,
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.0025,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
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
            rpc: [RPC],
            rest: [SERVER],
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={WinXP} />
          <Route path="/trading" Component={Trading} />
        </Routes>
        <WalletSelect />
      </BrowserRouter>
    </ChainProvider>
  );
};

export default App;
