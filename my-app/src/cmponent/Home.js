import React, { useState,  useEffect } from 'react'
/// const { providers } = ethers;
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
const Home = () => {

  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(provider);
        console.log('MetaMask detected!');
      } else {
        console.log('Please install MetaMask!');
      }
    };

    connect();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      return;
    }

    try {
      const accounts = await provider.requestAccount();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          Connected to MetaMask: {account}
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );

  
//   function web3MetaOpen() {
//     window.ethereum.request({
//         method: "eth_requestAccounts",
//     })
//     .then(result => {
//         console.log(result[0]);
//     })
//     .catch(error => {
//       alert("please install me  !!!")
//     });
// }

//   return (
//     <div>
//       <input   type='button' value="Click" onClick={web3MetaOpen} />

//       {/* <button  type='button' value="Click" onClick={web3MetaOpen}  buttton/> */}
//     </div>
//   )
}

export default Home
