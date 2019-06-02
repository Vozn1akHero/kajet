import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import User from '../models/User';

const router  = express.Router();

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.json({msg: "DATA IS NOT CORRECT"});

    bcrypt.compare(req.body.password, user.password, (err, result) => {
       if(result) {
           const userModelForToken = {
               id: user._id,
               name: user.name,
               email: user.email,
               password: user.password
           };

           jwt.sign({userModelForToken}, process.env.JWT_KEY, {expiresIn: '60m'}, async (err, token) => {
               await user.updateOne({ temporaryToken: token });

               res.json({token});
           });
       }

       else return res.json({msg: "DATA IS NOT CORRECT"});
    });
});

router.post('/joinup', async (req, res, next) => {
    const emailAvailabitlity = await User.find({email: req.body.email});

    if(!emailAvailabitlity) return res.status(400).json({ msg: 'EMAIL WAS ALREADY TAKEN'});

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        const { name, email } = req.body;

        const newUser = await new User({
            name: name,
            email: email,
            password: hash
        });

        return newUser.save()
            .then(res => {
                return res.status(200).json({ msg: 'USER WAS SUCCESSFULLY REGISTERED'});
            })
            .catch(err => {
                throw res.status(400);
            })
    });
});

router.post('/tokenvalidity', (req, res, next) => {
    const token = req.body.token;

    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
        if (err) {
            return res.json({status: false});
        }

        const user = await User.find({email: decoded.userModelForToken.email, password: decoded.userModelForToken.password});

        return user ? res.json({status: true}) : res.json({status: false});
    });
});

router.post('/checkemail', async (req, res, next) => {
    const emailAvailabitlity = (await User.find({email: req.body.email})).length;

    if(emailAvailabitlity === 1) return res.json({status: false});

    return res.json({status: true});
});

module.exports = router;
