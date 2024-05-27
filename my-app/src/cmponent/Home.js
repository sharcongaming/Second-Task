import React from 'react'
const ethers = require('ethers');
// import { ethers } from 'ethers';
const { providers } = ethers;
const provider = new providers.JsonRpcProvider();

const Home = () => {
  function web3MetaOpen() {
    window.ethereum.request({
        method: "eth_requestAccounts",
    })
    .then(result => {
        console.log(result[0]);
    })
    .catch(error => {
      alert("please install me  !!!")
    });
}

  return (
    <div>
      <input   type='button' value="Click" onClick={web3MetaOpen} />

      {/* <button  type='button' value="Click" onClick={web3MetaOpen}  buttton/> */}
    </div>
  )
}

export default Home
