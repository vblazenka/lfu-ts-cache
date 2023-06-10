import { describe, expect, test } from "vitest";
import { LinkedList, LinkedListNode } from "../linked-list";

describe("LinkedList<T>", () => {
  test("addFirst", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    expect(list.first).toEqual(new LinkedListNode(1));
    expect(list.count).toEqual(1);
  });

  test("removeFirst", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.removeFirst();
    expect(list.first).toBeNull();
    expect(list.count).toEqual(0);
  });

  test("addLast", () => {
    const list = new LinkedList<number>();
    list.addLast(1);
    expect(list.last).toEqual(new LinkedListNode(1));
    expect(list.count).toEqual(1);
  });

  test("removeLast", () => {
    const list = new LinkedList<number>();
    list.addLast(1);
    list.removeLast();
    expect(list.last).toBeNull();
    expect(list.count).toEqual(0);
  });

  test("remove", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.remove(1);
    expect(list.first).toBeNull();
    expect(list.count).toEqual(0);
  });

  test("addAfter", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addAfter(1, 2)
    expect(list.last.value).toEqual(2)
    expect(list.count).toEqual(2)
  })

  test("find", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);

    const n1 = list.find(1);
    const n2 = list.find(2);

    expect(n1).toEqual(n1);
    expect(n2).toBeNull();
  });

  test("clear", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.clear();
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
    expect(list.count).toEqual(0);
  });
});
