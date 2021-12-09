const db = require('../src/db');
const Person = require('../src/models/person');

const testPerson = {
    id: null,
    name: 'Carlos',
    cpf:'111.111.111-11',
    birthday: new Date('1978-1-11')
}
const testAccount = {
    id: null,
    balance: 0,
    dailyWithdrawLimit: 100,
    active: true,
    type: 1,
    personId: testPerson.id
};
const testTransaction = {
    id: null,
    amount: 100,
    accountId: testAccount.id
};

beforeAll(async () => {
    await db.sync();
});

test('create person', async () => {
    expect.assertions(1);

    const person = await Person.create(testPerson);

    expect(person.id).not.toBe(null);

    testPerson.id = person.id;
    testAccount.personId = testPerson.id;
});

test('get person', async () => {
    expect.assertions(3);

    const person = await Person.findByPk(testPerson.id);

    expect(person.id).toBe(testPerson.id);
    expect(person.name).toBe(testPerson.name);
    expect(person.cpf).toBe(testPerson.cpf);
});
/*
test('create account', async () => {
    expect.assertions(1);

    const account = await db.Account.create(testAccount);

    expect(account.id).not.toBe(null);

    testAccount.id = account.id;
    testTransaction.accountId = testAccount.id;
});

test('get account', async () => {
    expect.assertions(1);

    const account = await db.Account.findByPk(testAccount.id);

    expect(account).toEqual(
        expect.objectContaining({
            id: testAccount.id,
            balance: testAccount.balance,
            dailyWithdrawLimit: testAccount.dailyWithdrawLimit,
            active: testAccount.active,
            type: testAccount.type,
            personId: testPerson.id
        })
    );
});

test('create transaction', async () => {
    expect.assertions(1);

    const transaction = await db.Transaction.create(testTransaction);

    expect(transaction.id).not.toBe(null);

    testTransaction.id = transaction.id;
});

test('get transaction', async () => {
    expect.assertions(1);

    const transaction = await db.Transaction.findByPk(testTransaction.id);

    expect(transaction).toEqual(
        expect.objectContaining({
            id: testTransaction.id,
            amount: testTransaction.amount,
            accountId: testAccount.id
        })
    );
});

test('delete transaction', async () => {
    expect.assertions(1);

    await db.Transaction.destroy({
        where: {
            id: testTransaction.id
        }
    });
    const transaction = await db.Transaction.findByPk(testTransaction.id);

    expect(transaction).toBeNull();
});

test('delete account', async () => {
    expect.assertions(1);

    await db.Account.destroy({
        where: {
            id: testAccount.id
        }
    });
    const account = await db.Account.findByPk(testAccount.id);

    expect(account).toBeNull();
});
*/
test('delete person', async () => {
    expect.assertions(1);

    await Person.destroy({
        where: {
            id: testPerson.id
        }
    });
    const person = await Person.findByPk(testPerson.id);

    expect(person).toBeNull();
});

afterAll(async () => {
    await db.close();
});