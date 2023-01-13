import { ethers } from 'ethers';
import { CURRENCY } from './config.js';

export const fetchAPI = async url => {
  const response = await fetch(`${url}`);

  if (!response.ok && response.status === 404) {
    throw new Error('Not found ☹️');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch the data');
  }

  if (response.ok && response.status === 200) {
    const data = await response.json();
    return data;
  }

  throw new Error('Something went wrong ☹️');
};

export const formatAmount = (balance, cur = CURRENCY) => {
  // if (cur === 'ETH') return `${ethers.utils.formatEther(balance)} ${cur}`;
  if (cur) return Number(balance.toFixed(2)).toLocaleString() + ` ${cur}`;
};

export const lazyLoad = function (url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.error = () => reject(new Error('no image'));
  });
};
