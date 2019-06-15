const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'users',
    {
        idUsers:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UsersName:{
            type: Sequelize.STRING,            
        },
        UsersPassword:{
            type: Sequelize.STRING,            
        },
        UsersEmail:{
            type: Sequelize.STRING,            
        },
        UsersAddress:{
            type: Sequelize.STRING,            
        },
        UsersPhoneNum:{
            type: Sequelize.INTEGER,            
        },
        UsersPermission:{
            type: Sequelize.STRING
        }
    }
)