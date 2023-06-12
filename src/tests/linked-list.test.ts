import { describe, expect, test } from "vitest";
import { LinkedList, LinkedListNode } from "../linked-list.js";

describe("LinkedList<T>", () => {
  test("addFirst", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    expect(list.first.value).toEqual(2);
    expect(list.last.value).toEqual(1);
    expect(list.count).toEqual(2);
  });

  test("addFirst with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addFirst(node1);
    list.addFirst(node2);
    expect(list.first).toEqual(node2);
    expect(list.last).toEqual(node1);
    expect(list.count).toEqual(2);
  });

  test("removeFirst", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    list.removeFirst();
    expect(list.first.value).toEqual(1);
    expect(list.count).toEqual(1);
  });

  test("removeFirst with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addFirst(node1);
    list.addFirst(node2);
    list.removeFirst();
    expect(list.first).toEqual(node1);
    expect(list.count).toEqual(1);
  });

  test("addLast", () => {
    const list = new LinkedList<number>();
    list.addLast(1);
    list.addLast(2);
    expect(list.first.value).toEqual(1);
    expect(list.last.value).toEqual(2);
    expect(list.count).toEqual(2);
  });

  test("addLast with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addLast(node1);
    list.addLast(node2);
    expect(list.last).toEqual(node2);
    expect(list.count).toEqual(2);
  });

  test("removeLast", () => {
    const list = new LinkedList<number>();
    list.addLast(1);
    list.addLast(2);
    list.removeLast();
    expect(list.last.value).toEqual(1);
    expect(list.count).toEqual(1);
  });

  test("remove", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    list.addFirst(3);
    list.remove(2);
    expect(list.first.value).toEqual(3);
    expect(list.last.value).toEqual(1);
    expect(list.count).toEqual(2);
  });

  test("addAfter", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    list.addAfter(1, 3);
    expect(list.last.value).toEqual(3);
    expect(list.count).toEqual(3);
  });

  test("find", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    list.addFirst(3);

    const n1 = list.find(2);
    const n2 = list.find(4);

    expect(n1.value).toEqual(2);
    expect(n2).toBeNull();
  });

  test("clear", () => {
    const list = new LinkedList<number>();
    list.addFirst(1);
    list.addFirst(2);
    list.addFirst(3);
    list.clear();
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
    expect(list.count).toEqual(0);
  });

  test("removeFirst with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addFirst(node1);
    list.addFirst(node2);
    list.removeFirst();
    expect(list.first).toEqual(node1);
    expect(list.count).toEqual(1);
  });

  test("addLast with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addLast(node1);
    list.addLast(node2);
    expect(list.last).toEqual(node2);
    expect(list.count).toEqual(2);
  });

  test("removeLast with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addLast(node1);
    list.addLast(node2);
    list.removeLast();
    expect(list.last).toEqual(node1);
    expect(list.count).toEqual(1);
  });

  test("remove with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    list.addFirst(node1);
    list.remove(node1);
    expect(list.first).toBeNull();
    expect(list.count).toEqual(0);
  });

  test("addAfter with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    const node2 = new LinkedListNode<number>(2);
    list.addFirst(node1);
    list.addAfter(node1, node2);
    expect(list.last).toEqual(node2);
    expect(list.count).toEqual(2);
  });

  test("find with LinkedListNode", () => {
    const list = new LinkedList<number>();
    const node1 = new LinkedListNode<number>(1);
    list.addFirst(node1);

    const n1 = list.find(node1.value);
    const n2 = list.find(2);

    expect(n1).toEqual(node1);
    expect(n2).toBeNull();
  });
});
