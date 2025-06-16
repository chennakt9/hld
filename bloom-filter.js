class BloomFilter {
  constructor(size) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);

    this.hashFunctions = [
      (item) => this.hash(item, 17),
      (item) => this.hash(item, 31),
      (item) => this.hash(item, 101)
    ];
  }

  hash(item, seed) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * seed + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  add(item) {
    this.hashFunctions.forEach(fn => {
      const index = fn(item);
      this.bitArray[index] = 1;
    });
  }

  contains(item) {
    return this.hashFunctions.every(fn => this.bitArray[fn(item)] === 1);
  }

  printBitArray() {
    console.log("Bit Array: " + this.bitArray.join(''));
  }
}

// 🚀 Driver Code
function runBloomFilterDemo() {
  const bloom = new BloomFilter(50);

  const existingEmails = [
    "pravalika@example.com",
    "chenna@weirdmail.com",
    "batman@gotham.com"
  ];

  const testEmails = [
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
