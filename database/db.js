const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("sneaker","sneaker","phuc1997@",{
    host: "den1.mysql6.gear.host",
    dialect: "mysql",
    operatorAliases: false,
    
    pool:{
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: false
    }
})
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db;