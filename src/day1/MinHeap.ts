export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  delete(): number {
    if (this.length === 0) {
      return -1;
    }

    const value = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return value;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);

    return value;
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const parent = this.parent(idx);
    const parentValue = this.data[parent];
    const currentValue = this.data[idx];

    if (parentValue > currentValue) {
      this.data[parent] = currentValue;
      this.data[idx] = parentValue;
      this.heapifyUp(parent);
    }

    return;
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.length) {
      return;
    }

    const leftChildIdx = this.leftChild(idx);
    const rightChildIdx = this.rightChild(idx);

    if (leftChildIdx >= this.length) {
      return;
    }

    const leftChildValue = this.data[leftChildIdx];
    const rightChildValue = this.data[rightChildIdx];
    const currentValue = this.data[idx];

    if (leftChildValue > rightChildValue && currentValue > rightChildValue) {
      this.data[idx] = rightChildValue;
      this.data[rightChildIdx] = currentValue;
      this.heapifyDown(rightChildIdx);
    }

    if (rightChildValue > leftChildValue && currentValue > leftChildValue) {
      this.data[idx] = leftChildValue;
      this.data[leftChildIdx] = currentValue;
      this.heapifyDown(leftChildIdx);
    }

    return;
  }
}
