import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModal from '../Modal/UserModal.js';

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


  export const Login = async (req, res) => {
    try {



        const { email ,password } = req.body; // Get username from request



        const nonce = generateNonce(); // Generate unique challenge (nonce)

        // Construct SIWE message with nonce and username
        const siweMessage = `
          I, ${email, password}, authorize this application to access my account
          at ${new Date().toISOString()}
          Nonce: ${nonce}
        `;

        // Send SIWE message to user's wallet
        res.json({ siweMessage, nonce }); // Send nonce for verification later

      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    };


    export const verification = async (req, res) => {

    try {
        const { signature, nonce, message } = req.body; // Get data from request

        // Verify signature using SIWE utils
        const isValid = verifySIWESignature(signature, nonce, message);
        if (!isValid) {
          return res.status(401).send('Invalid Signature');
        }

        // Retrieve username from smart contract (implement this)
        // Example:
        const username = await smartContract.getUsername(address); 

        if (username) {
          // Grant user access to DApp functionalities
          // (1) Update user session in database (if you're using one)
          // (2) Generate JWT or a session token (if necessary)
          res.json({ success: true, username });
        } else {
          res.status(401).send('Unauthorized');
        }

      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    };