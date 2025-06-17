export {}

class BloomFilter {
  private size: number;
  private bitArray: number[];
  private hashFunctions: ((item: string) => number)[];

  constructor(size: number) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);

    this.hashFunctions = [
      (item: string) => this.hash(item, 17),
      (item: string) => this.hash(item, 31),
      (item: string) => this.hash(item, 101)
    ];
  }

  private hash(item: string, seed: number): number {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * seed + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  public add(item: string): void {
    this.hashFunctions.forEach(fn => {
      const index = fn(item);
      this.bitArray[index] = 1;
    });
  }

  public contains(item: string): boolean {
    return this.hashFunctions.every(fn => this.bitArray[fn(item)] === 1);
  }

  public printBitArray(): void {
    console.log("Bit Array: " + this.bitArray.join(''));
  }
}

// 🚀 Driver Code
function runBloomFilterDemo(): void {
  const bloom = new BloomFilter(50);

  const existingEmails: string[] = [
    "pravalika@example.com",
    "chenna@weirdmail.com",
    "batman@gotham.com"
  ];

  const testEmails: string[] = [
    "pravalika@example.com",   // ✅ should be true
    "notfound@ghost.com",      // ❌ probably false
    "batman@gotham.com",       // ✅ should be true
    "joker@haha.com"           // ❌ maybe false
  ];

  // Add emails
  console.log("📬 Adding emails to Bloom Filter...");
  existingEmails.forEach(email => bloom.add(email));

  // Check emails
  console.log("\n🔍 Checking emails:");
  testEmails.forEach(email => {
    const result = bloom.contains(email);
    console.log(`${email} -> ${result ? "Possibly in set ✅" : "Definitely not ❌"}`);
  });

  // Print final bit array
  console.log("\n🧠 Final Bit Array State:");
  bloom.printBitArray();
}

runBloomFilterDemo();
