import { ethers } from 'ethers';

import { PRIVATE_KEY } from './config';
import { INFURA_ID } from './config';

// const getMetamaskProvider = async function () {
//   const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
//   console.log(metamaskProvider);
//   await metamaskProvider.send('eth_requestAccounts', []);

//   const meatamaskSigner = provider.getSigner;
//   console.log(meatamaskSigner);
// };
// getMetamaskProvider();

//Examples
const senderAddress = '';
const receiverAddress = '';

const setEthereumSignerAndProvider = () => {
  return (() => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://goerli.infura.io/v3/${INFURA_ID}`
    );

    const signer = PRIVATE_KEY;
    return [provider, signer];
  })();
};

export const [provider, signer] = setEthereumSignerAndProvider();

export const takeSenderData = function (senderAddress, senderPrivateKey) {
  return [senderAddress, senderPrivateKey];
};

export const takeReceiverData = function (transferData) {
  const sendAmount = transferData[0];
  const sendAddress = transferData[1];
  return [sendAmount, sendAddress];
};

export const sendEther = async function (sender, receiver) {
  try {
    const provider = sender[0];
    const signer = sender[1];
    const etherAmount = receiver[0];
    const receiverAddress = receiver[1];

    const wallet = new ethers.Wallet(signer, provider);

    const tx = await wallet.sendTransaction({
      to: receiverAddress,
      value: ethers.utils.parseEther(`${etherAmount}`),
    });

    await tx.wait();
    console.log(tx);

    // const contract
  } catch (err) {
    console.error(err);
    err;
  }
};

const sendERC20 = async function (contractAddress, ABI, receiverAddress) {
  const contractABI = await takeABI(contractAddress);
};

// const takeABI = async function (address) {
//   try {
//     const response = await fetch(
//       `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`
//     );

//     const contract = await response.json();
//     return contract.result;
//   } catch (err) {
//     console.error(err);
//     err;
//   }
// };
