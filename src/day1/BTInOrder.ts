function traverse(node: BinaryNode<number>, numbers: number[]): number[] {
  node.left && traverse(node.left, numbers);
  numbers.push(node.value);
  node.right && traverse(node.right, numbers);

  return numbers;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}
