import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WinXP from 'WinXP';
import { GrazProvider } from "graz";

const unicorn: ChainInfo = {
  chainId: 'unicorn-420',
  chainName: 'Unicorn',
  rpc: 'https://rpc.unicorn.meme',
  rest: 'https://rest.unicorn.meme',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'unicorn',
    bech32PrefixAccPub: 'unicornpub',
    bech32PrefixValAddr: 'unicornvaloper',
    bech32PrefixValPub: 'unicornvaloperpub',
    bech32PrefixConsAddr: 'unicornvalcons',
    bech32PrefixConsPub: 'unicornvalconspub',
  },
  currencies: [
    {
      coinDenom: '🦄',
      coinMinimalDenom: 'uwunicorn',
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  feeCurrencies: [
    {
      coinDenom: '🦄',
      coinMinimalDenom: 'uwunicorn',
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: '🦄',
    coinMinimalDenom: 'uwunicorn',
    coinDecimals: 6,
  },
  features: ['cosmwasm'],
};



const App = () => {
  return  <GrazProvider
      grazOptions={{
        chains: [unicorn],
      }}
    ><BrowserRouter><WinXP /></BrowserRouter> </GrazProvider>;
};

export default App;
