import Sequelize from 'sequelize';
import sequelize from '../instance';

export default sequelize.define('gua', {
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
    elements: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'gua64'
});