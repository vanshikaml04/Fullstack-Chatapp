import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js"; // ✅ this was missing
import cookieParser from "cookie-parser"
import cors from "cors"
import {app,server} from "./lib/socket.js"
import path from "path"
dotenv.config();


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}
// ✅ Connect DB before starting server
const startServer = async () => {
  try {
    await connectDB(); // waits for DB connection
    server.listen(PORT, () => {
      console.log("server is running on PORT: " + PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();
