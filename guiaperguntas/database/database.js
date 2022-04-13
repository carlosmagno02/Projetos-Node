const Sequelize = require('sequelize');

const connection = new Sequelize('#nomedobanco','#usuario','#senha',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection