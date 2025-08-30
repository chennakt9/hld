// producer.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "job-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  let counter = 1;

  setInterval(async () => {
    const job = `job-${counter}`;
    await producer.send({
      topic: "jobs",
      messages: [{ key: String(counter), value: `This is job number ${counter}` }],
    });
    console.log(`✅ Sent ${job}`);
    counter++;
  }, 2000); // every 2 seconds
};

run().catch(console.error);
