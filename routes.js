const express = require("express");
const people = require("./src/controller/people");
const accounts = require("./src/controller/accounts");

const routes = express.Router();

routes.get("/v1/people", people.findAll);

routes.get("/v1/accounts", accounts.findAll);
routes.post("/v1/accounts", accounts.openAccount);
routes.post("/v1/accounts/:id/event", accounts.executeEvent);
routes.get("/v1/accounts/:id/balance", accounts.getBalance);
routes.get("/v1/accounts/:id/statement", accounts.getStatement);

module.exports = routes;