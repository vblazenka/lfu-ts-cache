import { LinkedList } from "./linked-list";


class FrequencyNode {}

type LFUCacheOptions = {
  max: number,
  ttl: number,
}

/**
 * LFU algorithm implementation that has a runtime complexity of O(1)
 * for each of the operations: get, set and delete.
 */
class LFUCache<K extends {}, V extends {}> {
  private max: number;
  private ttl: number;
  private size: number = 0;
  private minFreq: number = 0;
  private lookupTable = new Map<K, V>();
  private freqList: LinkedList<FrequencyNode> = new LinkedList<FrequencyNode>();

  constructor(options: LFUCacheOptions) {
    this.max = options.max
    this.ttl = options.ttl
  }

  get(key: string): any {}

  set(key: K, value: V): void {
    if (this.max <= 0) return;

    console.log("Inserting ", key, value)

    this.size++;
  }

  delete(): void {}
}

/*
    Usage:

    const options = {}

    const cache = new LFUCache<string, string>(options);

    cache.set("key123", "value123")
 */

const cache = new LFUCache({ max: 100, ttl: 3600 })
cache.set("my-key", "my-value")
