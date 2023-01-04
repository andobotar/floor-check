import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'pNUp3qSVvMnq7sqthYxULx9TTMWao5Pa',
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export { alchemy }
