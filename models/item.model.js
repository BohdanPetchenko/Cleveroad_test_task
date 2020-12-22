module.exports = (sequelize, Sequelize) => {

    class Item extends Sequelize.Model {

    }
    Item.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title:{ 
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        image: Sequelize.STRING
    }, { sequelize, modelName: 'item' });

    return Item;
}