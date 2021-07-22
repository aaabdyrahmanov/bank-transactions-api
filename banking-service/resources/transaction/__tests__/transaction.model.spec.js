const { Transaction } = require('../transaction.model.js')

describe('transaction model', () => {
  describe('schema', () => {
    test('id', () => {
      const id = Transaction.schema.obj.id
      expect(id).toEqual({
        type: String,
        required: true
      })
    })

    test('amount', () => {
      const amount = Transaction.schema.obj.amount
      expect(amount).toEqual({
        type: Number,
        required: true
      })
    })

    test('counterpart_name', () => {
      const counterpart_name = Transaction.schema.obj.counterpart_name
      expect(counterpart_name).toEqual({
        type: String,
        required: true
      })
    })

    test('counterpart_iban', () => {
      const counterpart_iban = Transaction.schema.obj.counterpart_iban
      expect(counterpart_iban).toEqual({
        type: String,
        required: true
      })
    })

    test('date', () => {
      const date = Transaction.schema.obj.date
      expect(date).toEqual({
        type: Date,
        required: true
      })
    })
  })
})