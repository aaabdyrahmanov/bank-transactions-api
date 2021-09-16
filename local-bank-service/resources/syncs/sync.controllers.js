const { crudControllers } = require("../../utils/crud");
const { Sync } = require("./sync.model");
const { Balance } = require("../balances/balance.model");
const { Transaction } = require("../transactions/transaction.model");

const { createAPICall, Logger } = require("../../helper");
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
  const currentDate = Date.now();
  const uniqueId = `sync_${currentDate}`;

  try {
    await publish({
      id: uniqueId,
      requests: apiCalls,
    });

    req.body.data = {
      id: uniqueId,
      date: currentDate,
      status: "pending",
    };

    const sync = await crudControllers(Sync).createOne(req);

    return res.status(201).json(sync);
  } catch (err) {
    Logger.error(err);
    return res.status(400).json({ status: "failure", message: err.message });
  }
}

/**
 * @desc terminates the synchronization using the message sent by notification service
 * @param object req - http request
 * @param object res - http response
 * @returns object - newly created sync
 */
async function terminateSync(req, res) {
  let isSucceed;
  let sync;

  try {
    if (
      req.body &&
      req.body.data &&
      ["succeed", "failed"].includes(req.body.status)
    ) {
      isSucceed = req.body.status === "succeed";
      sync = await crudControllers(Sync).updateOne(req);
    }

    // missing body OR invalid sync status
    if (!req.body || typeof isSucceed !== "boolean") {
      Logger.warn("Invalid body or synchronization ID!");
      return res.status(404).json({
        status: "failure",
        message:
          "Invalid body or synchronization ID. PLease, make sure that you have provided proper request structure!",
      });
    }

    // notify in failed synchronizations
    if (!isSucceed) {
      sendTechnicalFailureEmail(req.body.id, req.body.date);
    }

    // save the
    if (
      isSucceed &&
      req.body.data.length &&
      req.body.data[0].transactions.length
    ) {
      await crudControllers(Transaction).createManyOnly(
        req.body.data[0].transactions
      );
      if (req.body.data[0].transactions.length) {
        await crudControllers(Balance).createManyOnly(
          req.body.data[1].balances
        );
      }
    }

    return res.status(200).json(sync);
  } catch (err) {
    Logger.error(err);
    return res.status(400).json({ status: "failure", message: err.message });
  }
}

module.exports = {
  initializeSync,
  terminateSync,
  ...crudControllers(Sync),
};
