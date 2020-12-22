var db = require("../models");
var decodeToken = require("../helpers/decode-token")

async function deleteItem(req, res) {
    if (!req.headers.authorization) return res.sendStatus(401)

    let token = req.headers.authorization.slice(8, req.headers.authorization.length)
    const payload = decodeToken(token)
    const id = payload.id;

    try {
        const itemId = req.params.id;

        const item = await db.item.findByPk(itemId);

        if (!item) return res.sendStatus(404);

        if (item.userId == id) {
            await db.item.destroy({
                where: {
                    id: itemId
                }
            })
            res.sendStatus(200)
        } else {
           return res.status(403);            
        }

    }
    catch (err) {
        return err;
    }
}
module.exports = {
    deleteItem
}