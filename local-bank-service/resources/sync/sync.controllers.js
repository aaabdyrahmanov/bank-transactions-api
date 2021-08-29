const { crudControllers } = require("../../utils/crud");
const { Sync } = require("./sync.model");
const { Balance } = require("../balance/balance.model");
const { Transaction } = require("../transaction/transaction.model");

const { createAPICall } = require("../../helper");
const { publish } = require("../../event-bus");
const { sendTechnicalFailureEmail } = require("../../modules/email/email");

/**
 * @desc launches synchronization on TPP
 * @param object req - http request
 * @param object res - http response
 * @returns object - newly created sync
 */
async function initializeSync(req, res) {
  const { operations } = req;
  const apiCalls = operations.map((op) => createAPICall(op));
  let sync;

  try {
    req.body.data = {
      status: "pending",
      date: Date.now(),
    };
    sync = await crudControllers(Sync).createOne(req);
  } catch (err) {
    console.error(`Synchronization Initializing Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }

  /* eslint-disable no-underscore-dangle */
  await publish({
    id: sync.data._id,
    ...req.body.data,
    requests: apiCalls,
  });

  return res.status(201).json(sync);
}

/**
 * @desc finish with synchronization sent by TPP
 * @param object req - http request
 * @param object res - http response
 * @returns object - newly created sync
 */
async function terminateSync(req, res) {
  const isSucceed = req.body.status === "succeed";

  try {
    if (isSucceed && req.body.data.length) {
      if (req.body.data[0].transactions && req.body.data[0].transactions.status == "technicalFailure") {
        sendTechnicalFailureEmail(req.body.id, req.body.date);
      } else {
        if (req.body.data[0].transactions.length) {
          await crudControllers(Transaction).createMany(
            req.body.data[0].transactions
          );
          req.body.data.shift();
        }
        if (req.body.data[0].balances) {
          await crudControllers(Balance).createMany(req.body.data[0].balances);
          req.body.data.shift();
        }
      }
    }

    await crudControllers(Sync).updateOne(req, res);
  } catch (err) {
    console.error(`Synch Termination Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  initializeSync,
  terminateSync,
  ...crudControllers(Sync),
};
