import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModal from '../Modal/UserModal.js';

export const Register = async (req, res) => {
    try {
      const { userData } = req.body;
      const { name, email, password, role } = req.body.userData;
      if (!name || !email || !password || !role)
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
        role:role,
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
    


  }