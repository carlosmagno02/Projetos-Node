const Sequelize = require('sequelize')

const connection = new Sequelize('#nomedobanco','#usuario','#senha',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection