const { Kafka } = require("kafkajs");

async function runConsumer() {
  const kafka = new Kafka({
    clientId: "groupB-consumer2",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "groupB" });
  await consumer.connect();
  await consumer.subscribe({ topic: "jobs", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`🟤 [GroupB-Consumer2] ${message.key?.toString()} => ${message.value?.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
