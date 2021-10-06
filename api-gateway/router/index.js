const router = require("express").Router();

const localBankService = require("./localBankService");

router.use((req, res, next) => {
  console.info({
    method: req.method.toUpperCase(),
    path: req.path,
  });
  next();
});

router.use(localBankService);

module.exports = router;
