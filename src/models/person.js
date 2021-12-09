const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db');

const Person = db.define( "person", {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    birthday: DataTypes.DATEONLY
});

module.exports = Person;