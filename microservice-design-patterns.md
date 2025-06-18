### Decomposition Pattern

- Split services based on domain-driven design (DDD). Each microservice owns a specific business function.

In an e-commerce app:
- UserService handles users & auth
- OrderService handles orders
- InventoryService manages stock
- PaymentService takes your
<br>

### Strangler pattern
- is a gradual migration technique where you incrementally replace parts of a monolith with microservices.
<br>

### Saga Pattern
Each local transaction:
- Performs its operation, then
- Triggers the next step, or a compensation if something fails
<br>

### CQRS Pattern
- Separate the read model (queries) from the write model (commands) in your system.
