const ensureAuthenticated = require("../middlewares/Auth")

const router=require("express").Router()

router.get("/",ensureAuthenticated,(req,res)=>{
    console.log("logged in user detail:",req.user)
    res.status(200).json([
        {
            name:"mobile",
            price:100000
        },
        {
            name:"laptop",
            price:200000
        },
    ])
})

module.exports=router