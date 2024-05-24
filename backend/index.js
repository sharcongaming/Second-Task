import express  from "express"
import dotenv from "dotenv"
import cors from 'cors'
import morgan from "morgan"
import mongoose from "mongoose"
import {  Login, Register, Verify } from "./Controoler/UserControoler.js"
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
app.post("/verify", Verify)






// // MongoDB connection



mongoose.connect("mongodb+srv://crewcoding61:samiksha123@cluster0.obnufg3.mongodb.net/data").then(() => {
    console.log("Connected to DB...")
  })
      .catch( (err) => {
        console.error(`Error connecting to the database:\n${err}`);
    })
  app.listen(8000, () => {
    console.log("Listening on port 8000")
  })





