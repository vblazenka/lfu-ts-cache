import { LinkedList, LinkedListNode } from "./linked-list.js";

class CacheItem<K, V> {
  public key: K;
  public value: V;
  public frequencyParent: LinkedListNode<FrequencyItem<K, V>>;
}

class FrequencyItem<K, V> {
  public freq: number = 0;
  public entries: Set<CacheItem<K, V>>;
}

export class LFUCache<K extends string | number, V> {
  readonly #capacity: number;
  #byKey: Map<K, CacheItem<K, V>> = new Map();
  #freq: LinkedList<FrequencyItem<K, V>> = new LinkedList<FrequencyItem<K, V>>();
  #size: number = 0;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }

    this.#capacity = capacity;
  }

  get(key: K): V | null {
    const item = this.#byKey.get(key);
    if (item) {
      this.increment(item);

      return item.value;
    }

    return null;
  }

  set(key: K, value: V): void {
    if (this.#byKey.has(key)) {
      const item = this.#byKey.get(key);
      item.value = value;
      this.increment(item);
    } else {
      const item = new CacheItem<K, V>();
      item.key = key;
      item.value = value;
      this.#byKey.set(key, item);
      this.#size++;

      if (this.atCapacity()) {
        this.evict(1);
      }

      this.increment(item);
    }
  }

  private increment(item: CacheItem<K, V>) {
    const currentFrequency = item.frequencyParent;
    let nextFrequencyAmount: number;
    let nextFrequency: LinkedListNode<FrequencyItem<K, V>>;

    if (!currentFrequency) {
      nextFrequencyAmount = 1;
      nextFrequency = this.#freq?.first;
    } else {
      nextFrequencyAmount = currentFrequency.value.freq + 1;
      nextFrequency = currentFrequency.next;
    }

    if (!nextFrequency || nextFrequency.value.freq !== nextFrequencyAmount) {
      const newFrequencyItem = new FrequencyItem<K, V>();
      newFrequencyItem.freq = nextFrequencyAmount;
      newFrequencyItem.entries = new Set<CacheItem<K, V>>();

      if (!currentFrequency) {
        nextFrequency = this.#freq.addFirst(newFrequencyItem);
      } else {
        nextFrequency = this.#freq.addAfter(currentFrequency, newFrequencyItem);
      }
    }

    item.frequencyParent = nextFrequency;
    nextFrequency.value.entries.add(item);
    if (currentFrequency) {
      this.remove(currentFrequency, item);
    }
  }

  private evict(count: number) {
    for (let i = 0; i < count; ) {
      const item = this.#freq.first;
      if (!item) break;

      item.value.entries.forEach((entry) => {
        if (i < count) {
          this.#byKey.delete(entry.key);
          this.remove(item, entry);
          this.#size--;
          i++;
        }
      });
    }
  }

  private remove(
    freqItem: LinkedListNode<FrequencyItem<K, V>>,
    item: CacheItem<K, V>
  ) {
    const frequencyItem = freqItem.value;

    frequencyItem.entries.forEach((entry) => {
      if (entry.key === item.key) {
        frequencyItem.entries.delete(entry);
      }
    });

    if (frequencyItem.entries.size === 0) {
      this.#freq.remove(freqItem);
    }
  }

  private atCapacity() {
    return this.#size > this.#capacity;
  }
}
