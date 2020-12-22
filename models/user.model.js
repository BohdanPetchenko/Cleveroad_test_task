module.exports = (sequelize, Sequelize) => {

    class User extends Sequelize.Model {

    }
    User.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:{ 
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{ 
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{ 
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: Sequelize.STRING
    }, { sequelize, modelName: 'user' })

    return User;
}