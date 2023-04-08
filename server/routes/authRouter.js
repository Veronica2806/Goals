const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function generateAccessToken(id, email) {
    const payload = {
        id, email
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "60m" })
}


router.post('/registration', async (req, res) => {

    try {
        const { email, firstName, password, lastName } = req.body;
        const candidate = await User.findOne({ email });
        if (typeof candidate === "string") {
            return res.status(400).json({ message: "This email is already in use" });
        }

        const hashPassword = await bcrypt.hashSync(password, 5);
        const user = new User({ email, firstName, password: hashPassword, lastName })
        await user.save();
        return res.json({ message: `User ${firstName} ${lastName} is saved successfully` });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: `User with email ${email} does not exist` });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: `The password is incorrect` });
        }
        const token = generateAccessToken(user._id, email);
        return res.json({ token, user })
    }
    catch (err) {
    }
})
//probably redundant
router.post('/verifyToken', async(req, res) => {
    try {
        const { accessToken } = req.body;
        let valid = true;
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, function(error, decoded) {
            if(error){
                valid = false;
            }
          });
          
        return res.json({ valid })
    }
    catch (err) {
    }
})


module.exports = router;