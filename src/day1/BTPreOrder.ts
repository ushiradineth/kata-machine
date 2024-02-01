function traverse(node: BinaryNode<number>, numbers: number[]): number[] {
  numbers.push(node.value);
  node.left && traverse(node.left, numbers);
  node.right && traverse(node.right, numbers);

  return numbers;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}
