import { ethers } from 'ethers';
import { CURRENCY } from './config.js';

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
