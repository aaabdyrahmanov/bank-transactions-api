const { crudControllers } = require("../../utils/crud");
const { Balance } = require("./balance.model");

async function createAll(req, res) {
  const { data } = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ status: "failure", message: "Missing request body" });
  }

  const balances = await crudControllers(Balance).createMany(data);

  return res.status(201).json(balances);
}

module.exports = {
  createAll,
  ...crudControllers(Balance),
};
