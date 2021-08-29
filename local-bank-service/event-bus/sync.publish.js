const amqplib = require("amqplib");

const {
  AMQP_URL,
  AMQP_EXCHANGE,
  AMQP_QUEUE,
  AMQP_ROUTING_KEY,
} = require("../config");

module.exports = async (data) => {
  try {
    const connection = await amqplib.connect(AMQP_URL, "heartbeat=60");
    const channel = await connection.createChannel();

    try {
      await channel.assertExchange(AMQP_EXCHANGE, "fanout", { durable: true });

      await channel.assertQueue(AMQP_QUEUE, { durable: true });
      await channel.bindQueue(AMQP_QUEUE, AMQP_EXCHANGE, AMQP_ROUTING_KEY);
      await channel.publish(
        AMQP_EXCHANGE,
        AMQP_ROUTING_KEY,
        Buffer.from(JSON.stringify(data))
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      console.info("Closing channel....");
      await channel.close();
      await connection.close();
      console.log("Channel and connection is being closed!");
    }
  } catch (err) {
    console.error(
      `Error Listening to URL ${AMQP_URL}, exchange: ${AMQP_EXCHANGE}, queue: ${AMQP_QUEUE} : ${err.message}`
    );
  }
};
