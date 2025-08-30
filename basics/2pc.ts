type TransactionStatus = 'READY' | 'COMMITTED' | 'ABORTED';

interface Participant {
  name: string;
  prepare(): Promise<boolean>;
  commit(): void;
  rollback(): void;
}

class Bank implements Participant {
  name: string;
  private canCommit: boolean;
  private status: TransactionStatus = 'READY';

  constructor(name: string, canCommit: boolean = true) {
    this.name = name;
    this.canCommit = canCommit;
  }

  async prepare(): Promise<boolean> {
    console.log(`[${this.name}] Preparing...`);
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`[${this.name}] Vote: ${this.canCommit ? 'YES' : 'NO'}`);
        resolve(this.canCommit);
      }, 500);
    });
  }

  commit() {
    this.status = 'COMMITTED';
    console.log(`[${this.name}] 💰 Transaction committed!`);
  }

  rollback() {
    this.status = 'ABORTED';
    console.log(`[${this.name}] ❌ Transaction rolled back!`);
  }
}

class Coordinator {
  private participants: Participant[];

  constructor(participants: Participant[]) {
    this.participants = participants;
  }

  async executeTransaction() {
    console.log(`🟡 Phase 1: PREPARE`);
    const votes = await Promise.all(
      this.participants.map(p => p.prepare())
    );

    if (votes.every(vote => vote)) {
      console.log(`🟢 Phase 2: COMMIT`);
      this.participants.forEach(p => p.commit());
    } else {
      console.log(`🔴 Abort: Not all participants agreed.`);
      this.participants.forEach(p => p.rollback());
    }
  }
}

// Driver code
const bankA = new Bank('BankA');
const bankB = new Bank('BankB', false);

const coordinator = new Coordinator([bankA, bankB]);
coordinator.executeTransaction();
