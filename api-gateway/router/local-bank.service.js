const router = require("express").Router();
const { Readable } = require("stream");

const apiAdapter = require("../helper/api-adapter");
const { LOCAL_BANK_SERVICE_URL: BASE_URL } = require("../config");

const api = apiAdapter(BASE_URL);

// health
router.get("/v1/local-bank/health", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { status, message } = error.response;
    console.error(message);

    res.status(status).send(message);
  }
});

// transactions
router.get("/v1/local-bank/transactions", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    res.status(status).send(data);
  }
});

router.post("/v1/local-bank/transactions", async (req, res) => {
  const { data } = req.body;
  let response;

  try {
    response = await api.post(req.path.replace("/local-bank", ""), { data });

    return res.status(response.status).send(response.data);
  } catch (error) {
    // const { message, status } = error.response
    console.error(error);

    res.status(400).send();
  }
});

router.delete("/v1/local-bank/transactions", async (req, res) => {
  let response;

  try {
    response = await api.delete(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    res.status(status).send(data);
  }
});

// balances
router.get("/v1/local-bank/balances", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    res.status(status).send(data);
  }
});

router.post("/v1/local-bank/balances", async (req, res) => {
  const { data } = req.body;
  let response;

  try {
    response = await api.post(req.path.replace("/local-bank", ""), { data });

    return res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);

    res.status(400).send();
  }
});

router.delete("/v1/local-bank/balances", async (req, res) => {
  let response;
  try {
    response = await api.delete(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    res.status(status).send(data);
  }
});

// syncs
router.get("/v1/local-bank/syncs", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    return res.status(status).send(data);
  }
});

router.delete("/v1/local-bank/syncs", async (req, res) => {
  let response;

  try {
    response = await api.delete(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    res.status(status).send(data);
  }
});

router.post("/v1/local-bank/syncs/init", async (req, res) => {
  let response;

  try {
    response = await api.post(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    return res.status(status).send(data);
  }
});

router.post("/v1/local-bank/syncs/terminate", async (req, res) => {
  let response;

  try {
    response = await api.post(req.path.replace("/local-bank", ""));
    const { data, status } = response;

    return res.status(status).send(data);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    return res.status(status).send(data);
  }
});

// export
router.get("/v1/local-bank/export/balances", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));

    res.header("Content-Type", "text/csv");
    res.attachment(`transactions.csv`);

    // read the data with stream
    const dataReadable = new Readable({
      objectMode: true,
    });
    dataReadable.push(response.data);
    dataReadable.push(null); // no more data

    process.stdout.pipe(dataReadable).pipe(res);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    return res.status(status).send(data);
  }
});

router.get("/v1/local-bank/export/transactions", async (req, res) => {
  let response;

  try {
    response = await api.get(req.path.replace("/local-bank", ""));

    res.header("Content-Type", "text/csv");
    res.attachment(`transactions.csv`);

    // read the data with stream
    const dataReadable = new Readable({
      objectMode: true,
    });
    dataReadable.push(response.data);
    dataReadable.push(null); // no more data

    process.stdout.pipe(dataReadable).pipe(res);
  } catch (error) {
    const { data, message, status } = error.response;
    console.error(message);

    return res.status(status).send(data);
  }
});

module.exports = router;
