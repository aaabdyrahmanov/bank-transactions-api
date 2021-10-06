const { AMQP_QUEUE } = require("../config");
const { consume } = require("../event-bus");

module.exports = {
  start: async () => {
    try {
      await consume();
    } catch (err) {
      console.error(`Error listening to queue-${AMQP_QUEUE}: ${err.message}`);
    }
  },
};
