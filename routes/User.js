const express = require("express");
const user = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
user.use(cors());

process.env.SECRET_KEY = 'secret'

//REGISTER
user.post('/register', (req,res) =>{
    const userData = {
        UsersName: req.body.UsersName,
        UsersPassword: req.body.UsersPassword,
        UsersEmail: req.body.UsersEmail,
        UsersAddress: req.body.UsersAddress,
        UsersPhoneNum: req.body.UsersPhoneNum,
        UsersPermission: string
    }

    User.findOne({
        where: {
            UsersEmail: req.body.UsersEmail
        }
    })
        .then(user =>{
            if(!user){
                
                const hash = bcrypt.hashSync(userData.UsersPassword,10)
                userData.UsersPassword = hash
                User.create(userData)
                .then(user =>{
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{ 
                        expiresIn: 1440,
                    })
                    res.json({token:token})
                })
                .catch(err =>{ 
                    res.send('error' + err)
                })
            }
            else{
                res.json({error:"User already exists"})
            }
        })
        .catch(err =>{ 
            res.send('error:' + err);
        })
});

user.post('/login', (req,res)=>{
    User.findOne({
        where: {
            UsersName: req.body.UsersName
            
        }
    })
    .then(user =>{
        if(bcrypt.compareSync(req.body.UsersPassword, user.UsersPassword)){
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            let decoded = jwt.decode(token, {complete: true});
            let permission = decoded.payload.UsersPermission;
            res.json({token:token, permission:permission})
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err =>{
        res.send('error:' +err)
    })
})

user.get('/profile', (req,res)=>{
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        where:{
            idUsers: decoded.idUsers
        }
    })
    .then(user =>{
        if(user){
            res.json(user)
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err =>{
        res.send('error:' + err)
    })
})



module.exports = user