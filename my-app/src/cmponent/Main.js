




// import React, { useState } from 'react'
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { ethers } from 'ethers';
// import SiweMessage from './SiweMessage';



// function App() {
//   const [address, setAddress] = useState('');
//   const [siweMessage, setSiweMessage] = useState<SiweMessage | null>(null);
//   const [error, setError] = useState('');


// const Main  = async  () => {
//     try {
//               if (!window.ethereum) {
//                 throw new Error('No Ethereum provider found.');
//               }
//               await window.ethereum.request({ method: 'eth_requestAccounts' });
//               const provider = new ethers.providers.Web3Provider(window.ethereum);
//               const signer = provider.getSigner();
//               setAddress(await signer.getAddress());
//             } catch (error) {
//               setError(error.message);
//             }
//           };
        
//           const handleLogin = async () => {
//             try {
//               const res = await fetch('/api/nonce', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ address }),
//               });
        
//               const data = await res.json();
//               const siweMessage = new SiweMessage(data.message);
//               setSiweMessage(siweMessage);
        
//               const provider = new ethers.providers.Web3Provider(window.ethereum);
//               const signer = provider.getSigner();
//               const signature = await signer.signMessage(siweMessage.prepareMessage());
        
//               // Send signature to backend for verification
//               const verifyRes = await fetch('/api/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ message: siweMessage.toJSON(), signature }),
//               });
        
//               if (verifyRes.ok) {
//                 // Successful login
//                 const { token } = await verifyRes.json();
//                 // Store token (e.g., in localStorage)
//                 localStorage.setItem('authToken', token);
//                 // Redirect or update app state
//               } else {
//                 setError('Login failed.');
//               }
//             } catch (error) {
//               setError(error.message);
//             }
//           };
        
//           return (
//             <Container maxWidth="sm" style={{ marginTop: '100px' }}>
//               <Typography variant="h4" align="center" gutterBottom>
//                 Login with Ethereum
//               </Typography>
//               {!address ? (
//                 <Button
//                   variant="contained"
//                   onClick={Main}
//                   style={{ width: '100%' }}
//                 >
//                   Connect Wallet
//                 </Button>
//               ) : (
//                 <>
//                   <TextField
//                     label="Username (from Smart Contract)"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     disabled // For now, as we'll get this from the smart contract
//                   />
//                   <Button
//                     variant="contained"
//                     onClick={handleLogin}
//                     style={{ width: '100%' }}
//                     disabled={!siweMessage}
//                   >
//                     Login with Signature
//                   </Button>
//                 </>
//               )}
//               {error && <Typography color="error">{error}</Typography>}
//             </Container>
//           );
// }


// export default Main