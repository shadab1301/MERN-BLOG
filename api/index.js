import  express  from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./Route/user.routes.js";

const app = express();
dotenv.config()

app.use(express.json())
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongoose connected successfully"))
  .catch((err) => console.log(err));

  


  

app.listen(8080,()=>{
    console.log(`App listening on 8080`);
})
  app.use("/api/v1/user", router);


 app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal server error";

   res.status(statusCode).json({
     success: false,
     statusCode,
     message,
   });
 });

