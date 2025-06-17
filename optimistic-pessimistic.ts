interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  locked: boolean;
}

interface InventoryItemWithVersion {
  id: number;
  name: string;
  stock: number;
  version: number;
}

// Simulated in-memory DBs
const pessimisticDB: Record<number, InventoryItem> = {
  1: { id: 1, name: 'PS5', stock: 5, locked: false },
};

const optimisticDB: Record<number, InventoryItemWithVersion> = {
  1: { id: 1, name: 'PS5', stock: 5, version: 1 },
};

// ------------ Pessimistic Locking ------------
async function updateStockPessimistic(id: number, quantity: number) {
  const item = pessimisticDB[id];

  // Step 1: Try to lock
  if (item.locked) {
    console.log(`[Pessimistic] Item ${id} is locked by another transaction`);
    return;
  }

  item.locked = true;
  console.log(`[Pessimistic] Locked item ${id}`);

  try {
    if (item.stock < quantity) {
      throw new Error('Not enough stock');
    }

    item.stock -= quantity;
    console.log(`[Pessimistic] Bought ${quantity} ${item.name}. Remaining: ${item.stock}`);
  } catch (err) {
    console.error(`[Pessimistic] ${err}`);
  } finally {
    item.locked = false;
    console.log(`[Pessimistic] Released lock on item ${id}`);
  }
}

// ------------ Optimistic Locking ------------
async function updateStockOptimistic(id: number, quantity: number, versionWhenRead: number) {
  const item = optimisticDB[id];

  // Step 1: Check for version mismatch
  if (item.version !== versionWhenRead) {
    console.log(`[Optimistic] Version mismatch on item ${id}. Current: ${item.version}, You had: ${versionWhenRead}`);
    return;
  }

  // Step 2: Simulate business logic
  if (item.stock < quantity) {
    console.log(`[Optimistic] Not enough stock on item ${id}`);
    return;
  }

  // Step 3: Apply update
  item.stock -= quantity;
  item.version += 1;

  console.log(`[Optimistic] Bought ${quantity} ${item.name}. Remaining: ${item.stock}, New version: ${item.version}`);
}

// ------------ Test both methods ------------
(async () => {
  console.log('\n--- Testing Pessimistic Locking ---');
  await updateStockPessimistic(1, 2);   // Lock & update
  await updateStockPessimistic(1, 2);   // Should succeed
  await updateStockPessimistic(1, 3);   // Not enough stock

  console.log('\n--- Testing Optimistic Locking ---');
  await updateStockOptimistic(1, 2, 1); // Success
  await updateStockOptimistic(1, 2, 1); // Version mismatch
  await updateStockOptimistic(1, 2, 2); // Should succeed
})();
