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
    console.error(err);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

// paginated feature enabled
const getMany = (model) => async (req, res) => {
  // coercion - implicitly type conversion
  // string into number using *1
  const page = req.query.page * 1 || 1;
  const pageSize = req.query.limit * 1 || 100;
  const skip = (page - 1) * pageSize;
  let docs;

  try {
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

    if (!docs[0].data.length) {
      return res.status(404).json({
        status: "failure",
        message: "Sorry, it looks like storage is empty. Data not found!",
      });
    }

    return res.status(200).json({ total: docs[0].data.length, data: docs[0].data });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "failure", message: err.message });
  }
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
    console.error(err);
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
