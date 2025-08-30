##### steps to run
1. npm ci
2. docker-compose up
3. node groupA-consumer1.js
4. node groupA-consumer2.js
5. node groupB-consumer1.js
6. node groupB-consumer2.js
7. node producer.js
8. check http://localhost:8080/ for kafka-ui
9. kill the consumer after some time (~20 seconds)

##### expected behavior
- Each consumer group gets all messages.
- Inside a group, messages are shared between consumers.

#### clean up
1. docker-compose down --remove-orphans
