import Sequelize from 'sequelize';

export default {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dExplain: {
        type: Sequelize.STRING,
        allowNull: true
    },
    xiang: {
        type: Sequelize.STRING,
        allowNull: false
    },
    xExplain: {
        type: Sequelize.STRING,
        allowNull: true
    },
    guaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}