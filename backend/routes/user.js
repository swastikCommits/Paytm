const express = require("express");
const zod=require("zod");
const { User } = reuire("../db");
const jwt=require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const router = express.Router();

const signupSchema=zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastNaame: zod.string(),
    password: zod.string()
})

router.post("/signup", async (re, res)=>{
    const body=req.body;
    const {success} = signupSchema.safeParse(body);
    
    
    if(!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUSer){
        return res.stattus(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
       
   

    

})


module.exports = router;
