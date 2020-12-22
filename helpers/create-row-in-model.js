async function createRow(model, row) {

    if (!await model.findOne({ where: row })) {
        model.create(row);
    }
}

module.exports = createRow