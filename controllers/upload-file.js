var db = require("../models");
var decodeToken = require("../helpers/decode-token")

async function uploadFile(req, res, next) {
    if (!req.headers.authorization) return res.sendStatus(401)

    let token = req.headers.authorization.slice(8, req.headers.authorization.length)
    const payload = decodeToken(token)
    const id = payload.id;

    try {
        const itemId = req.params.id;

        const item = await db.item.findByPk(itemId);

        if (!item) return res.sendStatus(404);

        let filedata = req.file;

        if (filedata.size > 5000000) {
            let findErr = await db.mistake.findOne({ where: { field: "image" } })
            let err = res.status(422).send([{
                field: findErr.field,
                message: findErr.message.replace("{file}", filedata.originalname)
            }])
            throw err
        }
        console.log(filedata);

        if (!filedata) {
            res.send("File upload error");
        } else {
            res.send("File downloaded");
        }


        if (item.userId == id) {
            await item.update({ image: filedata.path }, { where: { userId: id } })
            res.sendStatus(200)
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
        return err;
    }
};

module.exports = { uploadFile }
