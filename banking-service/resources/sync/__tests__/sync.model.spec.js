const { Sync } = require('../sync.model')

describe('sync model', () => {
  describe('schema', () => {
    test('status', () => {
      const status = Sync.schema.obj.status
      expect(status).toEqual({
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
      })
    })

    test('operation', () => {
      const operation = Sync.schema.obj.operation
      expect(operation).toEqual({
        type: String
      })
    })

    test('date', () => {
      const date = Sync.schema.obj.date
      expect(date).toEqual({
        type: Date
      })
    })
  })
})