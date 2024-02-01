type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  prepend(item: T): void {
    const node: Node<T> = { value: item };

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;

    return;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) throw new Error("Index out of bounds");
    else if (idx === this.length) return this.append(item);
    else if (idx === 0) return this.prepend(item);

    let curr = this.head;

    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next;
    }

    curr = curr as Node<T>;

    const node: Node<T> = {
      value: item,
      next: curr,
      prev: curr.prev,
    };

    this.length++;

    if (curr.prev) curr.prev.next = node;
    curr.prev = node;

    return;
  }

  append(item: T): void {
    const node: Node<T> = { value: item };

    this.length++;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;

    return;
  }

  remove(item: T): T | undefined {
    let curr = this.head;

    for (let i = 0; i < this.length && curr; i++) {
      if (curr.value === item) {
        break;
      }

      curr = curr.next;
    }

    if (!curr) {
      return undefined;
    }

    return this.removeNode(curr);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    let node = this.getAt(idx);

    if (!node) {
      return;
    }

    return this.removeNode(node);
  }

  private getAt(idx: number): Node<T> | undefined {
    let curr = this.head;

    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next;
    }

    return curr;
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;

    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node == this.head) {
      this.head = node.next;
    }

    if (node == this.tail) {
      this.tail = node.prev;
    }

    node.prev = node.next = undefined;

    return node.value;
  }
}
