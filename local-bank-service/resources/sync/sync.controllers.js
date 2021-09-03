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

  req.body.data = {
    status: "pending",
    date: Date.now(),
  };
  
  try {
    const sync = await crudControllers(Sync).createOne(req);

    if (process.env.NODE_ENV !== "test") {
      /* eslint-disable no-underscore-dangle */
      await publish({
        id: sync.data._id,
        ...req.body.data,
        requests: apiCalls,
      });
    }

    return res.status(201).json(sync);
  } catch (err) {
    console.error(`Synch Initiation Error: ${err.message}`);
    return res.status(400).json({ status: "failure", message: err.message });
  }
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
      if (
        req.body.data[0].transactions &&
        req.body.data[0].transactions.status == "technicalFailure"
      ) {
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

    const sync = await crudControllers(Sync).updateOne(req);

    if (!sync.data) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid document ID. PLease, provide valid information!",
      });
    }

    return res.status(200).json(sync);
  } catch (err) {
    console.error(`Synch Termination Error: ${err.message}`);
    return res.status(400).json({ status: "failure", message: err.message });
  }
}

module.exports = {
  initializeSync,
  terminateSync,
  ...crudControllers(Sync),
};
