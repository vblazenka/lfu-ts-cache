# LFU Cache Implementation

This library provides an efficient implementation of the LFU (Least Frequently Used) cache algorithm with a complexity of O(1) for insertion, lookup, and deletion operations.
Library uses a combination of HashMap and LinkedList for achieving this efficiency.

You can read [this paper](http://dhruvbird.com/lfu.pdf) to learn how to implement it on your own.

> ⚠️ WIP: not intended for usage just yet

## Usage

Import the LFUCache class from the library, initialize it with a capacity, and start using its methods.

Here's an example:

```typescript
import { LFUCache } from "lfu-ts-cache";

// Create a new LFU cache with a capacity of 5
const cache = new LFUCache<string, number>(5);

// Set values
cache.set("key1", 1);
cache.set("key2", 2);

// Get values
console.log(cache.get("key1")); // Outputs: 1
console.log(cache.get("key2")); // Outputs: 2

```

## API Reference

### LFUCache class
**constructor(capacity: number)**

Initializes a new instance of the LFUCache class with the specified capacity.

### get(key: K): V
Gets the value associated with the specified key.

### set(key: K, value: V): void
Sets the value associated with the specified key.