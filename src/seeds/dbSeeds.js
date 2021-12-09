const Person = require('../models/person');

exports.seedDatabase = async function () {
    let person = await Person.findByPk(1);
    if (person === null ) {
        await Person.create({
            id: 1,
            name: 'John',
            cpf: '111.111.111-11',
            birthday: new Date(1978-1-11),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        console.log("Banco de dados semeado.");
    }
}