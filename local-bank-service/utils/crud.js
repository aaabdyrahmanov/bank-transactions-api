const { setCache } = require("../middleware");

const DEFAULT_CACHE_TTL = 90;

const createOne = (model) => async (req, res) => {
  const { data } = req.body;

  try {
    const doc = await model.create(data);

    return { status: "success", data: doc };
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

const createMany = (model) => async (data, res) => {
  try {
    const doc = await model.insertMany(data);

    return { status: "success", data: doc };
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

// paginated feature enabled
const getMany = (model) => async (req, res) => {
  const { isCached } = req;

  // if cached return the data
  if (isCached) {
    return res.status(200).send(res.body);
  }

  const page = req.query.page || 1;
  let pageSize = req.query.limit || 100;
  let skip = 0;
  let docs;

  try {
    if (pageSize) {
      pageSize *= 1;
      skip = (page - 1) * pageSize;
    }

    docs = await model.aggregate([
      {
        $facet: {
          totalData: [
            { $match: {} },
            { $skip: skip },
            { $limit: pageSize },
            { $project: { __v: 0, updatedAt: 0 } },
          ],
          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }

  if (!docs[0].totalCount.length) {
    return res.status(404).json({
      status: "failure",
      message: "Sorry, it looks like storage is empty. Data not found!",
    });
  }

  req.body = { total: docs[0].totalCount[0].count, data: docs[0].totalData };

  await setCache(req, res, DEFAULT_CACHE_TTL);

  return res.status(200).json(req.body);
};

const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      req.body
    );

    if (!updatedDoc) {
      return res.status(400).end();
    }

    return res.status(200).json(updatedDoc);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

// get the whole data
const getAll = (model) => async (req, res) => {
  try {
    const docs = await model.find({}, { __v: 0, updatedAt: 0 });

    if (!docs.length) {
      return res.status(404).json({
        status: "failure",
        message: "Sorry, it looks like storage is empty. Data was not found!",
      });
    }

    return { total: docs.length, data: docs };
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

const removeMany = (model) => async (req, res) => {
  try {
    const removed = await model.deleteMany();

    if (!removed.deletedCount) {
      return res.status(404).json({
        status: "failure",
        message: "Sorry, it looks like storage is empty. Data not found!",
      });
    }

    res.body = {
      status: "success",
      message: `Totally ${removed.deletedCount} data was removed!`,
    };

    return res.status(200).json(res.body);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

module.exports.crudControllers = (model) => ({
  createOne: createOne(model),
  createMany: createMany(model),
  getMany: getMany(model),
  getAll: getAll(model),
  removeMany: removeMany(model),
  updateOne: updateOne(model),
});
