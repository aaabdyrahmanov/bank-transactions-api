const paginate = (model, page, pageSize, skip) => {
  return model.aggregate([
    {
      $facet: {
        data: [
          { $match: {} },
          { $skip: skip },
          { $limit: pageSize },
          { $project: { __v: 0, updatedAt: 0 } },
        ],
      },
    },
  ]);
}

const getMany = (model) => async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.limit || 100;
  const skip = (page - 1) * pageSize;
  let docs;

  try {
    docs = await paginate(model, page, pageSize, skip);
    return res
      .status(200)
      .json({ total: docs[0].data.length, data: docs[0].data });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ status: "failure", message: err.message });
  }
};

module.exports.crudControllers = (model) => ({
  getMany: getMany(model),
});
