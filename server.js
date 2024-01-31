const http = require("http")
const mongoose = require("mongoose")
const app = require("./app/app")
const connectDb = require("./config/connectDb")


const server = http.createServer(app)

const PORT = 8000;
console.log(process.env.MODE);


connectDb();
mongoose.connection.once("open",()=>{
    console.log("Database connection established successfully");
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
      });
})
mongoose.connection.on("error",()=>{
    console.log("Database connection failed");
})



