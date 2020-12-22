var db = require("../models");
var decodeToken = require("../helpers/decode-token")

async function updateItem(req, res) {
    if (!req.headers.authorization) {
        let err = res.sendStatus(401)
        throw err
    }
    let token = req.headers.authorization.slice(8, req.headers.authorization.length)
    const payload = decodeToken(token)

    const id = payload.id;

    try {
        if (!req.body) return res.sendStatus(400);

        const title = req.body.title;
        const price = req.body.price;
        const itemId = req.params.id;

        if (title.length < 3) {
            let findErr = await db.mistake.findOne({ where: { field: "title_lenght" } })
            let err = res.status(422).send([{ field: findErr.field, message: findErr.message }])
            throw err
        }

        const item = await db.item.findByPk(itemId);

        if (!item) return res.sendStatus(404);


        if (item.userId == id) {
            await db.item.update({ title, price }, {
                where: {
                    id: itemId
                }
            })
        } else {
            return res.status(403);
            
        }
        const updateItem = await db.item.findByPk(itemId);
        let itemOwner = await updateItem.getUser()

        let result = {
            id: updateItem.id,
            createdAt: updateItem.createdAt,
            title: updateItem.title,
            price: updateItem.price,
            image: updateItem.image,
            userId: updateItem.userId,
            user: {
                id: itemOwner.id,
                email: itemOwner.email,
                name: itemOwner.name,
                phone: itemOwner.phone
            }
        }
        res.send(JSON.stringify(result))
    }
    catch (err) {
        return err
    }
}
module.exports = {
    updateItem
}