const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db');
const Account = require('./account');

const Transaction = db.define( "transaction", {
        amount: DataTypes.DOUBLE
});

Account.hasMany(Transaction, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'accountId',
        allowNull: false
    }
});
Transaction.belongsTo(Account);

module.exports = Transaction ;