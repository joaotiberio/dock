const db = require("../db");
const Person = require("../models/person");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const moment = require("moment");
const { Op } = require("sequelize/dist");

const isAccountActive = async (accountId) => {
    let account = await Account.findByPk(accountId, {
        attributes: ['active']
    });

    return account?.active === true;
}

const freezeAccount = async (accountId) => {
    await Account.update({ active: false }, {
        where: {
          id: accountId
        }
    });
}

const createAccountWithDeposit = async (req) => {
    let balance = null;

    balance = await db.transaction(async (dbTransaction) => {
        const newAccount = await Account.create({
            balance: req.body.balance,
            dailyWithdrawLimit: req.body.dailyWithdrawLimit,
            active: true,
            type: req.body.type,
            personId: req.body.personId
        }, { transaction: dbTransaction });

        await Transaction.create({
            accountId: newAccount.id,
            amount: req.body.balance
        }, { transaction: dbTransaction });
    
        return newAccount;
    });

    return balance;
};

const makeTransaction = async (accountId, amount) => {
    let balance = null;

    if (await isAccountActive(accountId)) {
        balance = await db.transaction(async (dbTransaction) => {
            await Transaction.create({
                accountId: accountId,
                amount: amount
            }, { transaction: dbTransaction });
        
            return await Account.increment({balance: amount}, 
            {
                where: {id: accountId},
                transaction: dbTransaction,
                returning: true
            });    
        });
    } else {
        throw new Error("Account inactive");
    }

    return balance;
};

exports.findAll = function (req, res) {
    Account.findAll({
        where: {
            active: true
        },
        include: Person
    }).then((result) => res.json(result));
};

exports.openAccount = function (req, res) {
    if (!!req.body.balance && req.body.balance > 0) {
        createAccountWithDeposit(req).then((result) => res.json(result));;
    } else {
        Account.create({
            dailyWithdrawLimit: req.body.dailyWithdrawLimit,
            active: true,
            type: req.body.type,
            personId: req.body.personId
        }).then((result) => res.json(result));
    }
};

exports.getBalance = function (req, res) {
    Account.findAll({
        attributes: ['id', 'balance'],
        where: {
            id: req.params.id,
            active: true
        }
    }).then((result) => res.json(result));
};

exports.executeEvent = function (req,res) {
    let accountId = req.params.id;
    let event = req.body;

    if (event.type === 'deposit') {
        makeTransaction(accountId, event.amount).then((result) => res.json(result));
    } else if (event.type === 'withdraw') {
        makeTransaction(accountId, (event.amount > 0 ? -1 : 1) * event.amount).then((result) => res.json(result));
    } else if (event.type === 'freeze') {
        freezeAccount(accountId).then((result) => res.json(result));
    } else {
        throw new Error('Invalid event');
    };
};

const defineWhereStatement = (req) => {
    let where = {
        accountId: req.params.id
    }

    if (req.body?.periodStart || req.body?.periodEnd) {
        let createdAt = {}
        if (req.body?.periodStart) createdAt[Op.gte] = moment(req.body.periodStart).startOf('day').toDate();
        if (req.body?.periodEnd) createdAt[Op.lte] = moment(req.body.periodEnd).endOf('day').toDate();
        where.createdAt = createdAt;
    }

    return where;
}

exports.getStatement = function (req, res) {
    Transaction.findAll({
        attributes: ['createdAt', 'amount'],
        where: defineWhereStatement(req)
    }).then((result) => res.json(result));
};