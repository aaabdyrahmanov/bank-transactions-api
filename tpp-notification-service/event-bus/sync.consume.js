const amqplib = require("amqplib");

const { AMQP_URL, AMQP_QUEUE, LOCAL_BANK_SERVICE_URL } = require("../config");
const { sendSynchAcceptionEmail } = require("../modules/email/email");
const { call } = require("../services");

module.exports = async () => {
  const connection = await amqplib.connect(AMQP_URL, "heartbeat=60");
  const channel = await connection.createChannel();

  channel.prefetch(10);
  
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(AMQP_QUEUE, { durable: true });
  await channel.consume(
    AMQP_QUEUE,
    async (msg) => {
      const receivedSync = JSON.parse(msg.content.toString());
      await sendSynchAcceptionEmail(receivedSync.id, receivedSync.date);

      // execute necessary HTTP calls
      await executeCalls(receivedSync);

      await channel.ack(msg);
    },
    {
      noAck: false,
      consumerTag: "sync_consumer",
    }
  );

  console.log(" [*] Waiting for messages. To exit press CTRL+C");
};

async function executeCalls(reqData) {
  const data = [];
  let isFailed = false;

  for (let i = 0; i < reqData.requests.length; i += 1) {
    /* eslint-disable no-await-in-loop */
    const response = await call(reqData.requests[i]);

    // check if there is any client server related error
    if (response.status !== "success") {
      isFailed = true;
    }

    const obj = {};
    obj[reqData.requests[i].type] = response;
    data.push(obj);
  }

  await call({
    url: LOCAL_BANK_SERVICE_URL,
    method: "POST",
    uri: "/v1/sync/terminate",
    body: {
      id: reqData.id,
      status: isFailed ? "failed" : "succeed",
      data,
    },
  });
}
