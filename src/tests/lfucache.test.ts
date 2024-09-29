import { describe, test, expect, beforeEach } from "vitest";
import { LFUCache } from "../lfu-cache.js";

describe("LFUCache", () => {
  let lfu: LFUCache<string | number, any>;

  beforeEach(() => {
    lfu = new LFUCache<string | number, any>(3);
  });

  test("returns null for a key not present in the cache", () => {
    expect(lfu.get("missingKey")).toBe(null);
  });

  test("returns the correct value for a key present in the cache", () => {
    lfu.set("key", 100);
    expect(lfu.get("key")).toBe(100);
  });

  test("correctly evicts the least frequently used item", () => {
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

  test("correctly updates the value of an existing key", () => {
    lfu.set("key", 100);
    expect(lfu.get("key")).toBe(100);
    lfu.set("key", 200);
    expect(lfu.get("key")).toBe(200);
  });

  test("handles string and number keys", () => {
    lfu.set("key1", "value1");
    lfu.set(2, "value2");
    lfu.set(3, "value3");

    expect(lfu.get("key1")).toBe("value1");
    expect(lfu.get(2)).toBe("value2");
    expect(lfu.get(3)).toBe("value3");
  });

  test("evicts least frequently used item when at capacity", () => {
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.set("key3", 300);
    lfu.set("key4", 400);
    expect(lfu.get("key1")).toBe(null);
    expect(lfu.get("key2")).toBe(200);
    expect(lfu.get("key3")).toBe(300);
  });

  test("handles multiple evictions", () => {
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.set("key3", 300);
    lfu.get("key1");
    lfu.get("key2");
    lfu.set("key4", 400);
    lfu.set("key5", 500);

    expect(lfu.get("key1")).toBe(100);
    expect(lfu.get("key2")).toBe(200);
    expect(lfu.get("key3")).toBe(null);
    expect(lfu.get("key4")).toBe(null);
    expect(lfu.get("key5")).toBe(500);
  });

  test("handles frequent updates to the same key", () => {
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.set("key1", 101);
    lfu.set("key1", 102);
    lfu.set("key3", 300);

    expect(lfu.get("key1")).toBe(102);
    expect(lfu.get("key2")).toBe(200);
    expect(lfu.get("key3")).toBe(300);
  });

  test("should handle edge case with capacity of 1", () => {
    lfu = new LFUCache<string, number>(1);
    lfu.set("key1", 100);
    lfu.set("key2", 200);

    expect(lfu.get("key1")).toBe(null);
    expect(lfu.get("key2")).toBe(200);
  });

  test("throws an error when initialized with invalid capacity", () => {
    expect(() => new LFUCache<string, number>(0)).toThrow();
    expect(() => new LFUCache<string, number>(-1)).toThrow();
  });

  test("handles get operations on an empty cache", () => {
    expect(lfu.get("nonexistent")).toBe(null);
  });

  test("correctly updates frequency on get operations", () => {
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.set("key3", 300);

    lfu.get("key1");
    lfu.get("key1");
    lfu.set("key4", 400);

    expect(lfu.get("key1")).toBe(100);
    expect(lfu.get("key4")).toBe(400);
    expect(lfu.get("key2")).toBe(null);
  });

  test("maintains correct order with same frequency", () => {
    lfu.set("key1", 100);
    lfu.set("key2", 200);
    lfu.set("key3", 300);

    lfu.get("key1");
    lfu.get("key2");
    lfu.set("key4", 400);

    expect(lfu.get("key1")).toBe(100);
    expect(lfu.get("key2")).toBe(200);
    expect(lfu.get("key4")).toBe(400);
    expect(lfu.get("key3")).toBe(null);
  });
});
