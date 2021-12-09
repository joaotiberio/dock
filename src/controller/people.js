const Person = require("../models/person");

exports.findAll = async function (req, res) {
  const people = await Person.findAll();
  res.json(people);
};