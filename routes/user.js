const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

router.post('/register',async (req,res,next)=>{
    // res.json({
    //     msg: 'Working'
    // });
    // console.log(req.body);

    const {username,email,password}=req.body;

    try{
        let user_exist = await User.findOne({email: email});
        if(user_exist){
            res.json({
                success: false,
                msg: 'User Already Exists'
            });

        }
        let user = new User();

        user.username = username;
        user.email = email;

        const salt = await bcryptjs.genSalt(10);
        user.password  = await bcryptjs.hash(password,salt);

        let size = 200;
        user.avatar = "https://gravater.com/avatar/?s="+size+"&d=retro";
        await user.save();

        res.json({
            success: true,
            msg: 'user registered success',
            user: user
        })


    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;