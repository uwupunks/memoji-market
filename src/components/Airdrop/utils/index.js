import { chains } from 'chain-registry';

export function getLogo(from) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name) {
  const chain = chains.find(chain => chain.chain_name === name)
  return chain ? getLogo(chain) : null;
}