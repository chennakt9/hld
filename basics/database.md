### Sharding vs. Partitioning:
- It's important to differentiate sharding from database partitioning:

- Partitioning generally refers to dividing a large table into smaller, more manageable parts within the same database instance. These partitions are still managed by a single database server.
Sharding is a form of horizontal partitioning where these smaller parts (shards) are then distributed across multiple, independent database server instances. Each shard is a complete, self-contained database.

### WAL and Change Data Captures
- WAL is a durability mechanism used in databases where every change is first written to a log before being applied to the actual database.
- CDC is a set of techniques used to capture and stream database changes (INSERT/UPDATE/DELETE) in real time.

### Database replica arch
1. Primary-Replica:
“One node writes, the rest just read and chill — async replication with read scaling.”

2. Multi-Primary:
“Everyone’s a leader here — write-anywhere setup with conflict drama on the side.”

3. Cascading Replication:
“Replicas raising replicas — a replication family tree to offload the primary.”

4. Multi-Source Replication:
“Multiple primaries feed a single replica — great for merging data, not your sanity.”

5. Masterless (Quorum-Based):
“Every node’s a boss — peer-to-peer writes with quorum keeping order.”

### APIs
🔹 REST
Get or send data using normal URLs and JSON.

🔹 SOAP
Old-school method that uses XML and strict rules.

🔹 GraphQL
Ask for exactly the data you need in one request.

🔹 Polling
Keep asking the server if there’s anything new.

🔹 WebSockets
Stay connected and get updates instantly.

🔹 gRPC
Fast communication between services using Protobuf.

