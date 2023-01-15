const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../secret.js');
const user = mongoose.model("User");

const checklogin = (req, res, next) => {
    let {authorization} = req.headers
    if(!authorization){
        return res.send({error:"you are not  logged in"})
    }
     
    let token = authorization.replace("Bearer ", "")

    jwt.verify(token, jwtSecret, (err, decoded)=> {
        if(err){
            return res.send({error:"you are not  logged in"})
        }
          user.findById(decoded._id)
          .then(
                (savedUser)=>{
                    if(savedUser == null){
                        return res.send({error:"you are not  logged in"})
                    }
                    // console.log("Login Verified", savedUser)
                     req.user = savedUser
                     next()
                }
          )
            .catch((err)=>{console.log(err)})
    })

}

module.exports = checklogin;