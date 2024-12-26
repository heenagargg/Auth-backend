const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const AuthRouter=require("./routes/AuthRouter")
const ProductRouter=require("./routes/productRouter")

require("dotenv").config()
require("./models/db")

app.use(bodyParser.json())
app.use(cors())

app.use("/auth",AuthRouter)
app.use("/products",ProductRouter)

app.get("/",(req,res)=>{
    res.send("welcome")
})












const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})