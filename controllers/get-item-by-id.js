var db = require("../models");

async function getItemById(req, res) {

    let idItem = req.params.id

    try {
        const item = await db.item.findByPk(idItem);

        if (!item) return res.sendStatus(404);

        let itemOwner = await item.getUser()

        let result = {
            id: item.id,
            createdAt: item.createdAt,
            title: item.title,
            price: item.price,
            image: item.image,
            userId: item.userId,
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
    getItemById
}