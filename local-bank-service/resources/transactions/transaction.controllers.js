const { crudControllers } = require("../../utils/crud");
const { Transaction } = require("./transaction.model");

module.exports = { ...crudControllers(Transaction) };
