module.exports = (sequelize, Sequelize) => {

    class Mistake extends Sequelize.Model {

    }
    Mistake.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        field: Sequelize.STRING,
        message: Sequelize.STRING
    }, { sequelize, modelName: 'mistake' });

    return Mistake;
}