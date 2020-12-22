var db = require("../models");


async function getItemsList(req, res) {

    try {
        const itemsList = await db.item.findAll();

        if (!itemsList) {
            throw new Error('Error');
        }

        let result = [];

        for (let item of itemsList) {
            debugger
            let itemOwner = await item.getUser()

            result.push({
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
            })

        }

        res.send(JSON.stringify(result))
    }
    catch (err) {
        return err;
    }
}
module.exports = {
    getItemsList
}