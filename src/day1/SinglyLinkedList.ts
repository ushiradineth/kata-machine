type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class SinglyLinkedList<T> {
  public length: number;
  public head?: Node<T>;
  public tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  prepend(item: T): void {
    const node: Node<T> = {
      value: item,
      next: undefined,
    };

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  append(item: T): void {
    const node: Node<T> = {
      value: item,
      next: undefined,
    };

    this.length++;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  insertAt(item: T, idx: number): void {
    let node: Node<T> | undefined = this.head;
    const newNode: Node<T> = { value: item };
    if (!node) {
      this.head = this.tail = undefined;
      return;
    }

    this.length++;

    if (idx === 0) {
      const temp = this.head;
      this.head = newNode;
      newNode.next = temp;

      return;
    }

    for (let i = 0; i < idx - 1 && node; i++) {
      node = node.next;
    }

    if (node) {
      newNode.next = node.next?.next;
      node.next = newNode;
    }

    return;
  }

  removeAt(idx: number): T | undefined {
    let node: Node<T> | undefined = this.head;

    if (!node) {
      this.head = this.tail = undefined;
      return;
    }

    if (idx === 0) {
      const temp = this.head?.value;
      this.head = this.head?.next;
      this.length--;

      return temp;
    }

    let prevNode: Node<T> = node;

    for (let i = 0; i < idx && node; i++) {
      prevNode = node;
      node = node.next;
    }

    this.length--;
    prevNode.next = node?.next;

    return node?.value;
  }

  remove(item: T): T | undefined {
    let node: Node<T> | undefined = this.head;

    if (!node) {
      this.head = this.tail = undefined;
      return;
    }

    let prevNode: Node<T> = node;

    if (this.head?.value === item) {
      const temp = this.head?.value;
      this.head = this.head?.next;
      this.length--;

      return temp;
    }

    for (let i = 0; i < this.length && node; i++) {
      if (node.value === item) {
        this.length--;
        prevNode.next = node.next;
        return node.value;
      }

      prevNode = node;
      node = node.next;
    }

    return undefined;
  }

  get(idx: number): T | undefined {
    let node: Node<T> | undefined = this.head;

    for (let i = 0; i < idx && node; i++) {
      node = node.next;
    }

    return node?.value;
  }
}
