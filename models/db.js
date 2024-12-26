const mongoose=require("mongoose")
const mongo_url=process.env.MONGODB_CONNECTION

mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDB Connected Successfully")
}).catch((err)=>{
    console.log("MondoDB Not connected:",err)
})




