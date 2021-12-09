const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db');
const Person = require('./person');

const Account = db.define("account", {
    balance: DataTypes.DOUBLE,
    dailyWithdrawLimit: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER
});

Person.hasMany(Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'personId',
        allowNull: false
    }
});
Account.belongsTo(Person);

module.exports = Account;