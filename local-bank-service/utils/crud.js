const { setCache } = require("../middleware");

const createOne = (model) => async (req) => {
  const { data } = req.body;

  try {
    const doc = await model.create(data);

    return { status: "success", data: doc };
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMany = (model) => async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ status: "failure", message: "Missing request body!" });
  }

  try {
    const doc = await model.insertMany(data);

    return res.status(201).json({ status: "success", data: doc });
  } catch (err) {
    throw new Error(err.message);
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
          data: [
            { $match: {} },
            { $skip: skip },
            { $limit: pageSize },
            { $project: { __v: 0, updatedAt: 0 } },
          ]
        },
      },
    ]);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }

  if (!docs[0].data.length) {
    return res.status(404).json({
      status: "failure",
      message: "Sorry, it looks like storage is empty. Data not found!",
    });
  }

  req.body = { total: docs[0].data.length, data: docs[0].data };

  await setCache(req, res);

  return res.status(200).json(req.body);
};

const updateOne = (model) => async (req) => {
  try {
    const updatedDoc = await model.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      req.body
    );

    return { status: "success", data: updatedDoc };
  } catch (err) {
    throw new Error(err.message);
  }
};

// get the whole data
const getAll = (model) => async () => {
  try {
    const docs = await model.find({}, { __v: 0, updatedAt: 0 });

    return { status: "success", data: docs };
  } catch (err) {
    throw new Error(err.message);
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

    return res.status(200).json({
      status: "success",
      message: `Totally ${removed.deletedCount} data was removed!`,
    });
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
