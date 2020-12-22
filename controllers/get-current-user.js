var db = require("../models");
var decodeToken = require("../helpers/decode-token")

async function getCurrentUser(req, res) {

    if (!req.headers.authorization) return res.sendStatus(401)


    let token = req.headers.authorization.slice(8, req.headers.authorization.length)
    const payload = decodeToken(token)

    const email = payload.email;
    try {
        const user = await db.user.findOne({ where: { email } });

        if (!user) {
            throw new Error('Error');
        }
        let id = user.id;
        let phone = user.phone;
        let name = user.name;
        let mail = user.email;

        res.send(JSON.stringify({ id, phone, name, mail }))
    }
    catch (err) {
        return err;
    }
}
module.exports = {
    getCurrentUser
}