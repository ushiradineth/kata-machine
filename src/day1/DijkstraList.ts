function hasUnvisited(curr: number, arr: WeightedAdjacencyList, seen: number[]): boolean {
  if (arr[curr].length === 0) {
    return false;
  }

  for (let i = 0; i < arr[curr].length; i++) {
    if (seen[arr[curr][i].to]) {
      continue;
    }

    return true;
  }

  return false;
}

function getLowestUnvisited(curr: number, arr: WeightedAdjacencyList, seen: boolean[], sink: number): GraphEdge {
  let lowest = arr[curr][0];

  for (let i = 0; i < arr[curr].length; i++) {
    const edge = arr[curr][i];

    if (seen[edge.to]) {
      continue;
    }

    if (lowest.to === sink) {
      return lowest;
    }

    if (edge.weight < lowest.weight) {
      lowest = edge;
    }
  }

  return lowest;
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
  const seen = new Array(arr.length).fill(false);
  const dist = new Array(arr.length).fill(Infinity);
  const prev = [];

  dist[source] = 0;

  let curr = source;
  seen[curr] = true;

  console.log(arr);

  while (hasUnvisited(curr, arr, seen)) {
    const low = getLowestUnvisited(curr, arr, seen, sink);

    console.log(low, curr, seen, prev, arr[curr]);

    seen[low.to] = true;
    dist[low.to] = low.weight;
    prev.push(curr);
    curr = low.to;

    if (low.to === sink) {
      prev.push(low.to);
      break;
    }
  }

  return prev;
}
