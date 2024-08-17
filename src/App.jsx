import { BrowserRouter } from "react-router-dom";
import WinXP from "./WinXP";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leap } from "@cosmos-kit/leap";

import { GasPrice } from "@cosmjs/stargate";
import '@interchain-ui/react/styles';

import { getSigningCosmosClientOptions } from "interchain";

const chain = {
  chain_name: "unicorn", chain_id: "unicorn-420",
};
const chainAssets = {
  chain_name: "unicorn",
  assets: [
    /*export interface Asset {
    deprecated?: boolean;
    description?: string;
    extended_description?: string;
    type_asset?: string;
    address?: string;
    denom_units: AssetDenomUnit[];
    base: string;
    name: string;
    display: string;
    symbol: string;
    logo_URIs?: LogoImage;
    images?: LogoImage[];
    coingecko_id?: string;
    keywords?: string[];
    traces?: AssetTrace[];
    ibc?: {
        source_channel?: string;
        source_denom?: string;
        dst_channel?: string;
    };
    socials?: {
        webiste?: string;
        website?: string;
        twitter?: string;
    };
}*/
  ],
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


const App = () => {
  return (
    <ChainProvider
      chains={[chain]}
      assetLists={[chainAssets]}
      wallets={[...keplr, ...leap]} // supported wallets
      walletConnectOptions={{
        signClient: { projectId: "42be0f17bcc9f94c391f66c133aaa401" },
      }}
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
      <BrowserRouter>
        <WinXP />
      </BrowserRouter>
    </ChainProvider>
  );
};

export default App;
