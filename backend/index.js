import express  from "express"
import dotenv from "dotenv"
import cors from 'cors'
import morgan from "morgan"
import mongoose from "mongoose"
import { Login, Register } from "./Controoler/UserControoler.js"
// const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res) => {
  res.send("working  ......")
})

app.post("/register", Register)
app.post("/login", Login)





// // MongoDB connection



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
  })
      .catch( (err) => {
        console.error(`Error connecting to the database:\n${err}`);
    })
  app.listen(8000, () => {
    console.log("Listening on port 8000")
  })





