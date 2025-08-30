### Read Uncommitted
- Transactions can read changes made by other transactions even if they’re not committed yet (aka dirty reads). - No one uses this

### Read committed
- Only reads data that's committed. No dirty reads.


### Repeatable Reads
- Ensures that if a row is read once, reading it again returns the same value.
- takes a snapshot of current db state. makes use of xmin and xmax to read correct values

### Serializable
- The highest level — transactions appear as if run one after another (like waiting in a queue).
- locks the range condition, if any new transaction is committed it checks if any row in current range is affected, if yes, then rollbacks current transaction.

### Saga
- Break a transaction into a sequence of local transactions
- Each local transaction has a compensating action (undo)
- Choreography: Services emit events to each other (decentralized)
- Orchestration: A central controller tells services what to do

### 2PC

- **Phase 1 – Prepare:**
  - Coordinator asks each participant:
    - “Can you commit?”
  - If all say "yes":
    - Move to commit phase

- **Phase 2 – Commit:**
  - If all participants agreed:
    - Everyone commits
  - If any participant said "no":
    - Everyone rolls back

- **Cons:**
  - Blocking problem:
    - If coordinator crashes after Prepare:
      - Participants wait indefinitely (can’t commit or roll back)

