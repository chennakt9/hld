const { Kafka } = require("kafkajs");

async function runConsumer() {
  const kafka = new Kafka({
    clientId: "groupA-consumer2",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "groupA" });
  await consumer.connect();
  await consumer.subscribe({ topic: "jobs", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`🔵 [GroupA-Consumer2] ${message.key?.toString()} => ${message.value?.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
