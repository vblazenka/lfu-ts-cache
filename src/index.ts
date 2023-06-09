import { LinkedList } from "./linked-list";

class FrequencyNode {}

type LFUCacheOptions = {
  max: number;
  ttl: number;
};

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
    this.max = options.max;
    this.ttl = options.ttl;
  }

  get(key: string): any {}

  set(key: K, value: V): void {}

  delete(): void {}
}
