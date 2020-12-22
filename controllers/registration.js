var db = require("../models");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { secretKey } = require('../config/auth.config');

async function registrationUser(req, res) {
    try {

        if (!req.body) return res.sendStatus(400);

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;

        if (password.length < 8) {
            let findErr = await db.mistake.findOne({ where: { field: "current_password" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const existingUser = await db.user.findOne({ where: { email } });
        if (existingUser) {
            let findErr = await db.mistake.findOne({ where: { field: "check_user" } })            
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            name,
            email,
            phone,
            password: hashedPassword
        });


        const newUser = await db.user.findOne({ where: { email } });

        const token = jwt.sign({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 * 60 // generate token with some expiration time
        }, secretKey);

        res.send(JSON.stringify(token));
    }
    catch (err) {
        return err
    }
}

module.exports = {
    registrationUser
}