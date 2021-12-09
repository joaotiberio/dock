require('dotenv').config();
const express = require("express");
const routes = require("./routes.js");
const db = require("./src/db.js");
const seed = require("./src/seeds/dbSeeds")

const app = express();

app.use(express.json());
app.use(routes);

db.sync().then((result)=>{
    console.log(`Banco de dados conectado: ${process.env.DB_NAME}`);
    seed.seedDatabase()
});

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));