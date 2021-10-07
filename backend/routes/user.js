const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECKERT = 'secondwedsite';
const fetchuser = require('../middleware/fetchuser');
var nodemailer = require('nodemailer');


// Create user here
router.post('/createuser', [
    body('email', 'Enter the vaild Email').isEmail(),
    body('name', 'Enter the name minimum 3 character, please try again').isLength({ min: 3 }),
    body('password', 'Enter minimum 4 character, please try again').isLength({ min: 4 })
], async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'sorry a user with this eamill already existes' });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECKERT);
        console.log(authtoken);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('Some internal error are here.')
        console.log(req.body);
    }
})

// Login user here
router.post('/login', [
    body('email', 'Enter the valid').isEmail(),
    body('password', 'Enter the valid password').exists()
], async(req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "This email are not exited please, go frist signup now." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Password is worng  please try again." });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECKERT);
        console.log(authtoken);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('interenal some Error are occuring.');
    }
})


// Find are are available user here
router.post('/finduser', [
    body('email', 'Enter the valid').isEmail(),
    body('name', 'Enter the min 3 character').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: "This email are not exited please try another email else go for login." });
        }
        success = true;

        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        const randNum = randomNumber(1000, 9999)
        const testmassage = 'That is my massage ' + randNum;
        const subjectwrite = 'Hi ' + name;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gd157488@gmail.com',
                pass: "7738273505"
            }
        })

        var mailOptions = {
            from: 'gd157488@gmail.com',
            to: email,
            subject: subjectwrite,
            text: testmassage
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                console.log('that is worng email');
            } else {
                console.log('that work.' + info.response);
            }
        })

        res.json({ success, email, name, randNum })
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('interenal some Error are occuring.');
    }
})

// fetching all data about user
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('interenal some Error are occuring.');
    }
})


// sent mail here.


module.exports = router;