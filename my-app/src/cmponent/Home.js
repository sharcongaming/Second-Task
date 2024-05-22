import React from 'react'
const ethers = require('ethers');


const Home = () => {
  return (
    <div>

      <input  type='button' value="Click" onClick="web3MetaOpen()"/>


      <script>
        
 function  web3MetaOpen(){
    window.ethereum.request({
    method:"eth_requestAccounts",
  }).then(result=>{
    console.log(result[0])
  })
}else{
  alert("please install me  !!!")
}

        
        
      </script>


{/* Wallet Connect TO eTHER.JS lIBRARY
<h2>Connect to the Wallet</h2>
<button onClick={ async()=>{
  alert("connet to the meta mask")

  if(window.etherum){
    const provider =new ethers.providers.web3Prodier(window.ethereum)
    const signer = provider.setSigner()
    console.log(provider,await signer.getAdress)

    const sign = await signer.signMessage("welcome to ")
      console.log("sign")
    
  }
}}> Connet to the Wallet

</button> */}



    </div>
  )
}

export default Home