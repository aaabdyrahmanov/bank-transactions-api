const { crudControllers } = require("../../utils/crud");
const { Balance } = require("./balance.model");

module.exports = { ...crudControllers(Balance) };
