const createOne = model => async (req, res) => {
  const { data } = req.body

  try {
    const doc = await model.create(data)

    return { status: 'success', data: doc }
  } catch (err) {
    console.error(err)
    return { status: 'failure', message: err }
  }
}

const createMany = model => async (data) => {
  try {
    const doc = await model.insertMany(data)
    
    return { status: 'success', data: doc }
  } catch (err) {
    console.error(err)
    return { status: 'failure', message: err }
  }
}

// paginated feature enabled
const getMany = model => async (req, res) => {
  let page = req.query.page || 1; 
  let pageSize = req.query.limit || 100;
  let skip = 0 

  try {
    if (pageSize) {
      pageSize *= 1
      skip = (page-1) * pageSize
    }

    const docs = await model
      .aggregate([
        { 
          $facet: {
            totalData: [
              { $match: {} },
              { $skip: skip },
              { $limit: pageSize },
              { $project : { __v : 0, updatedAt: 0 } }
            ],
            totalCount: [
              { 
                $count: 'count'
              }
            ]
          }
        }
      ])

    if (!docs[0].totalCount.length) {
      return res.status(404).json({ status: 'failure', message: 'Sorry, it looks like storage is empty. Data not found!'})
    }

    return res.status(200).json({ total: docs[0].totalCount[0].count, data: docs[0].totalData })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ status: 'failure', message: err.message })
  }
}
  
// get the whole data
const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find({}, { __v: 0, updatedAt: 0 })

    if (!docs.length) {
      return res.status(404).json({ status: 'failure', message: 'Sorry, it looks like storage is empty. Data was not found!'})
    }

    return { total: docs.length, data: docs }
  } catch (err) {
    console.error(err)
    return { status: "failure", message: err }
  }
}

const removeMany = model => async (req, res) => {
  try {
    const removed = await model.deleteMany()

    if (!removed.deletedCount) {
      return res.status(404).json({ status: 'failure', message: 'Sorry, it looks like storage is empty. Data not found!'})
    }

    return res.status(200).json({ status: 'success', "message": `Totally ${removed.deletedCount} data was removed!` })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ status: 'failure', message: err.message })
  }
}


module.exports.crudControllers = model => ({
  createOne: createOne(model),
  createMany: createMany(model),
  getMany: getMany(model),
  getAll: getAll(model),
  removeMany: removeMany(model)
})