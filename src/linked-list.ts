/**
 * Represents a node in a doubly linked list with a value of type `T`, a `next` node, and a `previous` node.
 */
export class LinkedListNode<T> {
  /**
   * @param value - The data stored in the node.
   * @param next - The next node in the linked list.
   * @param prev - The previous node in the linked list.
   */
  constructor(
    readonly value: any,
    public next: LinkedListNode<T> | null = null,
    public prev: LinkedListNode<T> | null = null
  ) {}
}

/**
 * Represents a doubly linked list.
 */
export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  /**
   * The number of nodes in the linked list.
   */
  public count: number = 0;

  /**
   * The first node in the linked list, or `null` if the list is empty.
   */
  public get first(): LinkedListNode<T> | null {
    return this.head;
  }

  /**
   * The last node in the linked list, or `null` if the list is empty.
   */
  public get last(): LinkedListNode<T> | null {
    return this.tail;
  }

  /**
   * Adds a node or value at the beginning of the list.
   *
   * @param value - The value to add to the list.
   * @returns The new `LinkedListNode<T>` containing value
   */
  addFirst(value: T | LinkedListNode<T>): LinkedListNode<T> {
    const newNode = this.getNode(value);

    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
    }

    this.head = newNode;

    // If the list was empty, the new node is also the tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    this.count++;
    return newNode;
  }

  /**
   * Removes the first node from the list.
   */
  removeFirst(): void {
    if (!this.head) {
      return;
    }

    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = this.tail = null;
    }

    this.count--;
  }

  /**
   * Adds a node or a value at the end of the list.
   *
   * @param value - The value to add to the list.
   * @returns The new `LinkedListNode<T>` containing value
   */
  addLast(value: T | LinkedListNode<T>): LinkedListNode<T> {
    const newNode = this.getNode(value);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.count++;
    return newNode;
  }

  /**
   * Removes the last node from the list.
   */
  removeLast(): void {
    if (!this.tail) {
      return;
    }

    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = this.tail = null;
    }

    this.count--;
  }

  /**
   * Removes the first occurrence of a node with the provided value or value
   * from the list.
   *
   * @param value - The value of the node to remove.
   */
  remove(value: T | LinkedListNode<T>): void {
    const lookupValue = this.isLinkedListNodeInstance(value)
      ? value.value
      : value;

    let current = this.head;

    while (current) {
      if (current.value === lookupValue) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.count--;
        return;
      }

      current = current.next;
    }
  }

  /**
   * Adds a node or a value after a specified node in the list.
   *
   * @param node - The node after which to add the new value.
   * @param newNode - The value or node to add to the list.
   * @returns The new `LinkedListNode<T>` containing value
   */
  addAfter(node: T | LinkedListNode<T>, newNode: T | LinkedListNode<T>) {
    const lookupNode = this.isLinkedListNodeInstance(node)
      ? node
      : this.find(node);
    if (!lookupNode) {
      return null;
    }
    const insertNode = this.getNode(newNode);

    insertNode.next = lookupNode.next;
    insertNode.prev = lookupNode;

    if (lookupNode.next) {
      lookupNode.next.prev = insertNode;
    } else {
      this.tail = insertNode;
    }

    lookupNode.next = insertNode;

    this.count++;
    return insertNode;
  }

  /**
   * Finds a node with the provided value in the list.
   *
   * @param value - The value of the node to find.
   * @returns The `LinkedListNode<T>` if it is found, otherwise `null`.
   */
  find(value: T): LinkedListNode<T> | null {
    let node = this.head;

    while (node) {
      if (node.value === value) {
        return node;
      }
      node = node.next;
    }

    return null;
  }

  /**
   * Removes all nodes from the list.
   */
  clear() {
    this.head = null;
    this.tail = null;

    this.count = 0;
  }

  /**
   * Creates a new node from the provided value, or returns the node if it
   * is already an instance of `LinkedListNode`.
   *
   * @param value - The value of the node.
   * @returns `LinkedListNode<T>`
   */
  private getNode(value: T | LinkedListNode<T>): LinkedListNode<T> {
    return this.isLinkedListNodeInstance(value)
      ? value
      : new LinkedListNode<T>(value);
  }

  private isLinkedListNodeInstance<T>(
    value: T | LinkedListNode<T>
  ): value is LinkedListNode<T> {
    return value instanceof LinkedListNode;
  }
}
