function traverse(node: BinaryNode<number>, numbers: number[]): number[] {
  node.left && traverse(node.left, numbers);
  node.right && traverse(node.right, numbers);
  numbers.push(node.value);

  return numbers;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  return traverse(head, []);
}
