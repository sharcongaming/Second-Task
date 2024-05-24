import React from 'react'
const ethers = require('ethers');


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

      <button  type='button' value="Click" onClick={web3MetaOpen}  buttton/>



{/* <h1>Connect to the wallet</h1>
<button   onClick={async()=>{
  alert("connect to the metamask");
  if(window.etherum){
    console.log("ghdfj")
    const a = await window.etherum.enable();
    console.log("a")
  }
}}>
  MetaMask
</button> */}


    </div>
  )
}

export default Home