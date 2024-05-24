import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModal from '../Modal/UserModal.js';
import { randomBytes } from 'crypto';
import { SiweMessage } from 'siwe';


export const Register = async (req, res) => {
    try {
      const { userData } = req.body;
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.json({
          success: false,
          message: "All Feilds are Mandatory!",
        });
  
      const isEmailExist = await UserModal.find({ email: email });
      if (isEmailExist.length) {
        return res.json({
          success: false,
          message: "Email already exists! Try a new one.",
        });
      }
  
      const hashPassW = await bcrypt.hash(password, 10);
  
      const user = new UserModal({
        name:name,
        email:email,
        password: hashPassW,
       
      });
  
      await user.save();
      return res.json({
        success: true,
        message: "User Registered Successfully!",
        user:user
      });
    } catch (error) {
      return res.json({ success: false, message: error.message});
    }
  };


  // export const Login = async (req, res) => {
  //   try {
  //       const { email ,password } = req.body; // Get username from request
  //       const nonce = generateNonce(); // Generate unique challenge (nonce)

  //       // Construct SIWE message with nonce and username
  //       const siweMessage = `
  //         I, ${email, password}, authorize this application to access my account
  //         at ${new Date().toISOString()}
  //         Nonce: ${nonce}
  //       `;

  //       // Send SIWE message to user's wallet
  //       res.json({ siweMessage, nonce }); // Send nonce for verification later
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send('Server Error');
  //     }
  //   };

  //   export const verification = async (req, res) => {

  //   try {
  //       const { signature, nonce, message } = req.body; // Get data from request

  //       // Verify signature using SIWE utils
  //       const isValid = verifySIWESignature(signature, nonce, message);
  //       if (!isValid) {
  //         return res.status(401).send('Invalid Signature');
  //       }

  //       // Retrieve username from smart contract (implement this)
  //       // Example:
  //       const username = await smartContract.getUsername(address); 

  //       if (username) {
  //         // Grant user access to DApp functionalities
  //         // (1) Update user session in database (if you're using one)
  //         // (2) Generate JWT or a session token (if necessary)
  //         res.json({ success: true, username });
  //       } else {
  //         res.status(401).send('Unauthorized');
  //       }

  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send('Server Error');
  //     }
  //   };


// Store nonces in memory for simplicity.
// In a production environment, use a database.
// const nonces: { [address: string]: string } = {};
// Endpoint to initiate login


export const Login = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: 'Missing address' });
    }
    // Generate a unique nonce
    const nonce = randomBytes(16).toString('hex');
    nonces[address] = nonce;

    // Create SIWE message
    const siweMessage = new SiweMessage({
      domain: 'your-domain.com',
      address: address,
      statement: 'Sign in with Ethereum',
      uri: 'http://your-frontend.com/login',
      version: '1',
      chainId: 1, // Replace with your desired chain ID
      nonce: nonce,
    });

    // Send the message to the client for signing
    res.json({ message: siweMessage.prepareMessage() });
  } catch (error) {
    console.error('Error generating nonce:', error);
    res.status(500).json({ message: 'Failed to generate nonce' });
  }
};

// Endpoint to verify signature
export const Verify = async (req, res) => {
  try {
    const { message, signature } = req.body;
    if (!message || !signature) {
      return res
        .status(400)
        .json({ message: 'Missing message or signature' });
    }

    const siweMessage = new SiweMessage(message);
    const recoveredAddress = await siweMessage.verify({
      signature: signature,
    });

    // Verify if the nonce is valid
    if (nonces[recoveredAddress] === siweMessage.nonce) {
      // Successful login, generate a JWT or session token
      const user = { address: recoveredAddress }; // Fetch user data
      const token = generateToken(user); // Replace with your token generation logic
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid nonce' });
    }
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(401).json({ message: 'Invalid signature' });
  }
};


