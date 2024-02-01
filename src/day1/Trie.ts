class TrieNode {
  public children: (TrieNode | undefined)[];
  public isWord: boolean;
  public value: string;

  constructor(value: string) {
    this.children = new Array(26).fill(undefined);
    this.isWord = false;
    this.value = value;
  }
}

export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  insert(word: string): void {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
      const index = this.letterIndex(word[i]);
      let node = curr.children[index];

      if (!node) {
        node = curr.children[index] = new TrieNode(word[i]);
      }

      curr = node;
    }

    curr.isWord = true;
  }

  delete(word: string): boolean {
    var curr = this.root;
    var nodes = [curr];

    for (let char of word) {
      let idx = this.letterIndex(char);
      let node = curr.children[idx];
      if (!node) {
        return false;
      }
      nodes.push(node);
      curr = node;
    }

    if (!curr.isWord) {
      return false;
    }

    curr.isWord = false;

    for (let i = nodes.length - 2; i >= 0; i--) {
      let parent = nodes[i];
      let child = nodes[i + 1];
      if (child.isWord || child.children.some(Boolean)) {
        break;
      }
      let idx = this.letterIndex(child.value);
      parent.children[idx] = undefined;
    }

    return true;
  }

  find(partial: string): string[] {
    const node = this.findNode(partial);

    if (!node) {
      return [];
    }

    return this.traverse(node, partial, []);
  }

  private findNode(str: string): TrieNode | undefined {
    let curr = this.root;

    for (let i = 0; i < str.length; i++) {
      let idx = this.letterIndex(str[i]);
      let node = curr.children[idx];

      if (!node) {
        return undefined;
      }

      curr = node;
    }

    return curr;
  }

  private traverse(node: TrieNode, partial: string, results: string[]): string[] {
    if (node.isWord) {
      results.push(partial);
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];

      if (child) {
        this.traverse(child, partial + child.value, results);
      }
    }

    return results;
  }

  private letterIndex(letter: string): number {
    return letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  }
}
