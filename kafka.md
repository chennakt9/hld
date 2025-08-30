## ==FIFO SQS==
- fifo is an ordered queue
- but ordered queue is slow right. so they introduced messageGroup concept to achieve parallelism
- each message will have a messageGroupId.
- messages within each messageGroup will be processed sequentially. but each messageGroup is independent so they can be processed in parallel.

## ==Kafka Basics==
### Prereq
queue pattern (1 producer 1 consumer)
pub / sub pattern (1 producer N consumers)
stream (1 producer N consumers, with durability)

### Before kafka
ActiveMQ, RabbitMQ - also supports pub / sub modes.
these are suited for:
- Reliability + ordering for small to medium workloads.
- Not streaming big data firehoses (millions/sec).
- And they usually didn’t store events for long → no replay.

### KAKFA
Kafka was the first log-based pub/sub system that:
- Scaled horizontally like crazy (millions/sec).
- Kept data durable (events persisted to disk).
- Allowed consumers to replay history at will.

### Do we need retention of default 7 days ?
- for normal interservice communication it is not required, as a service can come online in an hour mostly.
- For snowflake ingestion, imagine there is a bug in your service, we need to reprocess all the events from past 3 days then it is very useful.

### Log based
- Producer → appends events to the log.
- Each consumer → keeps track of “where I am in the log” (my offset).
- This makes it replayable → you can rewind and reread history, or fast-forward and just read new events.

##### Does kafka really support 1 producer N consumers ?
> Yes, but it is only possible if consumerGroups >= 2.
> If we have only consumerGroup == 1, it behaves just like SQS fifo with messageGroupId

## ==Kafka Core components==
### Producer
- kafka producers are fire and forget. they don't care about consumers consumed or not.
- both sqs producer and kafka producer same in this case

### Consumer
- 1 producer N consumers (Kafka consumer) - only possible with Consumer groups
- 1 producer 1 consumer (SQS consumer)
- Offset commits
  - at most once (commit before processing)
  - at least once (process before commit) --> use it when message processing is idempotent
  - exactly once - complex to implement

### Topic & partition
- topic == sqs fifo
- partition = message group in fifo
- partitionId = messageGroupId
- in 1 CG scenario
  - 100 partitions, 2 consumers -> each get 50 partitions each
  - 100 partitions, 100 consumers -> each get 1 each
  - 100 partitions, 150 consumers -> 100 consumers will get 1 each. 50 will be idle

### Consumer group
- Main use case is 1 P -> N C.
- Each CG will maintain their own offsets. You can imagine this as Each CG will get a copy of the topic.
- ex: billing_events topic is consumed by SEP service, data team service, entitlements service etc..
- rule of thumb: consumers with same code below to same consumer group. ex: multiple ecs task containers of same service will belong to same consumer-group because they have same code.
