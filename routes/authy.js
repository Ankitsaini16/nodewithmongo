const express = require('express')
const userRouter  = express.Router()
const mongoose = require('mongoose')
const user = mongoose.model("User")
const bcrypt = require('bcrypt');






userRouter.post("/signup/", (req, res)=>{
    //  console.log(req.body)
     const {name, email, password} = req.body 

     // check if name , email, password is not empty 
        if(!name || !email || !password){
            console.log("I reached to error 1")
            return res.send({error:"please add all the fields"})
        }
    //name should be >= 3 characters
        if(name.length < 3){
            console.log("I reached to error 2")
            return res.send({error:"name should be atleast 3 characters"})
        }
    //password should be >= 8 characters
        if(password.length < 8){
            console.log("I reached to error 3")
            return res.send({error:"password should be atleast 8 characters"})
        }
    //check if email is valid
        if(!email.includes("@")){
            return res.send({error:"please enter a valid email"})
        }
      //check if email already exists
      user.findOne({email: email})
      .then((savedUser) =>{
           console.log(savedUser)
           if(savedUser != null){
                return res.send({error:"user already exists"})
           }
           else if(savedUser == null){

            //hashing password 
               bcrypt.hash(password, 12)
               .then(
                (hashedPassword)=>{
                    const storeUser = new user(
                        {
                            name:  name,
                            email: email,
                            password: hashedPassword
                        }
                       )
                      storeUser.save()
                       .then(
                        (user) => {
                              console.log("user saved successfully", user)
                               res.send({message:"user saved successfully"})
                        }
                       )
                       .catch(
                        (err) => {
                            console.log("while saving user to databse")      
                            console.log(err)
                        }
                       ) // while saving user to databse
                }
               )

               .catch(
                (err) => {
                    console.log("while hashing password")      
                    console.log(err)
                }
               )
              
               
           }
      })



      .catch(
        (err) => {
            console.log("while searching email in databse")      
            console.log(err)
        }
      ) // false => request was not able to complete for some reason, while searching email in database
    
} )



module.exports = userRouter