import axios from 'axios';

import { alchemy } from '../utils/alchemy';

export const fetchProjectStats = async projectName =>
  await axios.get(
    `https://api.opensea.io/api/v1/collection/${projectName}/stats`
  );

export const fetchProjectData = async projectName =>
  await axios.get(`https://api.opensea.io/api/v1/collection/${projectName}`);

export const fetchMyNfts = async walletAddy =>
  await axios.get(
    `https://api.opensea.io/api/v1/collections?offset=0&limit=300&asset_owner=${walletAddy}`
  );

export const fetchNameAndImg = async projectSlug => {
  try {
    const res = await fetchProjectData(projectSlug);
    const { image_url, name } = res.data.collection;
    return { imageUrl: image_url, name };
  } catch (error) {
    console.log({ error });
    if (error.response?.status === 404) {
      return { name: 'Not found', imageUrl: null };
    }
  }
};

export const getFloorByContractAddress = async address => {
  const resp = await alchemy.nft.getFloorPrice(address)
  console.log({ resp })
}
