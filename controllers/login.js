var db = require("../models");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { secretKey } = require('../config/auth.config');

async function loginUser(req, res) {
    try {
        if (!req.body) return res.sendStatus(400);

        const email = req.body.email;
        const password = req.body.password;

        const user = await db.user.findOne({ where: { email } });

        if (!user) {
            let findErr = await db.mistake.findOne({ where: { field: "password" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            let findErr = await db.mistake.findOne({ where: { field: "password" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 * 60 // generate token with some expiration time
        }, secretKey);

        res.send(JSON.stringify(token));
    }
    catch (err) {
        return err
    }
}

module.exports = { loginUser }