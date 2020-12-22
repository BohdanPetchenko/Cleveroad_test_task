var db = require("../models");
var decodeToken = require("../helpers/decode-token")

async function createItem(req, res) {
    if (!req.headers.authorization) return res.sendStatus(401)

    let token = req.headers.authorization.slice(8, req.headers.authorization.length)
    const payload = decodeToken(token)

    const id = payload.id;
    const email = payload.email;
    const phone = payload.phone;
    const name = payload.name;

    try {

        if (!req.body) return res.sendStatus(400);

        const title = req.body.title;
        const price = req.body.price;

        if (title.length < 3) {
            let findErr = await db.mistake.findOne({ where: { field: "title_lenght" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        } else if (!title) {
            let findErr = await db.mistake.findOne({ where: { field: "title" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const user = await db.user.findOne({ where: { email } });

        if (!user) return res.status(403);

        let newItem;
        await user.createItem({ title, price }).then(res => {

            const item = {
                id: res.id,
                createdAt: res.createdAt,
                title: res.title,
                price: res.price,
                image: res.image,
                userId: res.userId,
            }
            newItem = item
        }).catch(err => console.log(err));

        newItem.user = {};
        newItem.user.id = id;
        newItem.user.email = email;
        newItem.user.name = name;
        newItem.user.phone = phone;

        res.send(JSON.stringify(newItem))
    }
    catch (err) {
        return err;
    }
}
module.exports = {
    createItem
}