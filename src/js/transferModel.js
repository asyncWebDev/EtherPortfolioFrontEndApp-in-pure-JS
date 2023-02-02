import { ethers } from 'ethers';

export const getMetamaskSigner = async () => {
  try {
    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const meatamaskSigner = metamaskProvider.getSigner();

    return meatamaskSigner;
  } catch (err) {
    console.error(err);
  }
};

export const takeReceiverData = transferData => {
  const [sendAmount, sendAddress] = transferData;
  return [sendAmount, sendAddress];
};

export const sendEther2 = async receiver => {
  try {
    const signer = await getMetamaskSigner();
    [etherAmount, sendAddress] = receiver;
    const valueInVei = ethers.utils.parseEther(`${etherAmount}`);
    const transactionSet = {
      to: sendAddress.toString(),
      value: valueInVei.toString(),
    };
    const transaction = await signer.sendTransaction(transactionSet);
    console.log(transaction);
  } catch (err) {
    console.error(err);
  }
};
