export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  if (!head) {
    return false;
  }

  if (head.value === needle) {
    return true;
  }

  const left = head.left ? dfs(head.left, needle) : false;
  const right = head.right ? dfs(head.right, needle) : false;

  return left || right;
}
