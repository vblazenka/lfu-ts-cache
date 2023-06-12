import { describe, test, expect } from "vitest";
import { LFUCache } from "../lfu-cache.js";

describe("LFUCache", function () {
  test("should return null for a key not present in the cache", () => {
    const lfu = new LFUCache<string, number>(2);
    expect(lfu.get("missingKey")).toBe(null);
  });

  test("should return the correct value for a key present in the cache", () => {
    const lfu = new LFUCache<string, number>(2);
    lfu.set("key", 100);
    expect(lfu.get("key")).toBe(100);
  });

  test("should correctly evict the least frequently used item", () => {
    const lfu = new LFUCache<string, number>(3);
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.get("key2");
    lfu.set("key3", 300);
    lfu.get("key3");
    lfu.get("key3");

    lfu.set("key4", 400);

    expect(lfu.get("key1")).toBe(null);
    expect(lfu.get("key2")).toBe(200);
    expect(lfu.get("key3")).toBe(300);
  });

  test("should correctly update the value of an existing key", () => {
    const lfu = new LFUCache<string, number>(2);
    lfu.set("key", 100);
    expect(lfu.get("key")).toBe(100);
    lfu.set("key", 200);
    expect(lfu.get("key")).toBe(200);
  });
});
