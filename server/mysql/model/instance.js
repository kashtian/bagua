import Sequelize from 'sequelize';
import baseMethods from './baseMethods';

const dbConfig = {
    database: 'bagua',
    user: 'root',
    password: 'tian@shi910324',
    host: 'localhost',
    port: 3306
};

let sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port || 3306,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        timestamps: false,
        freezeTableName: true,
        classMethods: baseMethods
    }
});

sequelize.authenticate()
    .then((err) => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

export default sequelize;