type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class Queue<T> {
  public length: number;
  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node: Node<T> = {
      value: item,
      next: undefined,
    };

    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) return undefined;

    const head = this.head;
    this.head = this.head.next;

    head.next = undefined;

    this.length--;

    if (!this.head) {
      this.tail = undefined;
    }

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
