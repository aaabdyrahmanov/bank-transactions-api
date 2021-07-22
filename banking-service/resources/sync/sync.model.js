const mongoose = require('mongoose')

const syncSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    },
    operation: {
      type: String
    },
    date: {
      type: Date
    }
  },
  { timestamps: true }
)

module.exports.Sync = mongoose.model('sync', syncSchema) 
