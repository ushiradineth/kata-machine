import Queue from "./Queue";

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);
  const queue = new Queue<number>();

  // queue the source
  queue.enqueue(source);
  seen[source] = true;

  do {
    let curr = queue.deque();

    if (typeof curr !== "number") {
      continue;
    }

    // stop the loop if needle is found
    if (curr === needle) {
      break;
    }

    // get the adjacency row
    const adj = graph[curr];

    for (let i = 0; i < adj.length; i++) {
      // skip if there is no connection
      if (adj[i] === 0) {
        continue;
      }

      // skip if seen
      if (seen[i]) {
        continue;
      }

      // build path and seen for current row
      seen[i] = true;
      prev[i] = curr;

      // enqueue current value
      queue.enqueue(i);
    }
  } while (queue.length);

  let curr = needle;
  let out: number[] = [];

  // return null of needle is not in the path
  if (prev[needle] === -1) {
    return null;
  }

  // while a path exists
  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  // reverse the path and add source to the beginning
  return [source].concat(out.reverse());
}
