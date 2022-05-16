import axios from 'axios';

export const fetchProjectStats = async projectName =>
  await axios.get(
    `https://api.opensea.io/api/v1/collection/${projectName}/stats`
  );

export const fetchProjectData = async projectName =>
  await axios.get(`https://api.opensea.io/api/v1/collection/${projectName}`);
