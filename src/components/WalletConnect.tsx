'use client';

import React from 'react'
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';

const providerOptions = {};

const WalletConnect = () => {

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      }) ;
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.BrowserProvider(web3ModalInstance);
      console.log(web3ModalProvider);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  )
}

export default WalletConnect