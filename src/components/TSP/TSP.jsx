import React from "react";

function TSP() {
  var shortestSuperstring = function (words) {
    let N = words.length,
      suffixes = new Map(),
      edges = Array.from({ length: N }, () => new Uint8Array(N));

    // Build the edge graph
    for (let i = 0, word = words; i < N; i++) {
      let word = words[i];
      for (let k = 1; k < word.length; k++) {
        let sub = word.slice(k);
        if (suffixes.has(sub)) suffixes.get(sub).push(i);
        else suffixes.set(sub, [i]);
      }
    }
    for (let j = 0; j < N; j++) {
      let word = words[j];
      for (let k = 1; k < word.length; k++) {
        let sub = word.slice(0, k);
        if (suffixes.has(sub))
          for (let i of suffixes.get(sub))
            edges[i][j] = Math.max(edges[i][j], k);
      }
    }

    // Initialize DP array
    let M = N - 1,
      dp = Array.from({ length: M }, () => new Uint16Array(1 << M));

    // Helper function to find the best value for dp[curr][currSet]
    // Store the previous node with bit manipulation for backtracking
    const solve = (curr, currSet) => {
      let prevSet = currSet - (1 << curr),
        bestOverlap = 0,
        bestPrev;
      if (!prevSet) return (edges[M][curr] << 4) + M;
      for (let prev = 0; prev < M; prev++)
        if (prevSet & (1 << prev)) {
          let overlap = edges[prev][curr] + (dp[prev][prevSet] >> 4);
          if (overlap >= bestOverlap)
            (bestOverlap = overlap), (bestPrev = prev);
        }
      return (bestOverlap << 4) + bestPrev;
    };

    // Build DP using solve
    for (let currSet = 1; currSet < 1 << M; currSet++)
      for (let curr = 0; curr < N; curr++)
        if (currSet & (1 << curr)) dp[curr][currSet] = solve(curr, currSet);

    // Join the ends at index M
    let curr = solve(M, (1 << N) - 1) & ((1 << 4) - 1);

    // Build the circle by backtracking path info from dp
    // and find the best place to cut the circle
    let path = [curr],
      currSet = (1 << M) - 1,
      bestStart = 0,
      lowOverlap = edges[curr][M],
      prev;
    while (curr !== M) {
      (prev = dp[curr][currSet] & ((1 << 4) - 1)), (currSet -= 1 << curr);
      let overlap = edges[prev][curr];
      if (overlap < lowOverlap)
        (lowOverlap = overlap), (bestStart = N - path.length);
      (curr = prev), path.unshift(curr);
    }

    // Build and return ans by cutting the circle at bestStart
    let ans = [];
    for (let i = bestStart; i < bestStart + M; i++) {
      let curr = path[i % N],
        next = path[(i + 1) % N],
        word = words[curr];
      ans.push(word.slice(0, word.length - edges[curr][next]));
    }
    ans.push(words[path[(bestStart + M) % N]]);
    return ans.join("");
  };
  const DFS = function (node, isGoal, depth) {
    if (depth == 0) {
      return SearchLimitExhausted();
    }
    /* same as above */
    const resultOfRecursion = BFS(child, isGoal, depth - 1);
    /* same as above */
  };
  const dfs_deepening = function (node, isGoal, limit) {
    for (let i = 1; i <= limit; i++) {
      const resultOfDFS = DFS(node, isGoal, i);
      if (resultOfDFS instanceof Solution) {
        return resultOfDFS;
      } else if (resultOfDFS instanceof NotFound) {
        return resultOfDFS;
      }
    }

    return SearchLimitExhausted();
  };
  const equals = (x) => (y) => x == y;
  // destination: is the goal state
  // current: is the current state
  const manhattanDistance = (destination) => (current) => {
    // for each tile in the current
    return current.reduce((totalDistance, cVal, cIdx) => {
      // find where it should be in the destination
      const dIdx = destination.findIndex(equals(cVal));
      // determine row/col in destination
      const dRow = Math.ceil(((dIdx + 1) * 3) / 9);
      const dCol = (dIdx % 3) + 1;
      // determine row/col in current
      const cRow = Math.ceil(((cIdx + 1) * 3) / 9);
      const cCol = (cIdx % 3) + 1;
      // calculate the distance and add to to
      const cellDistance = Math.abs(dRow - cRow) + Math.abs(dCol - cCol);
      return totalDistance + cellDistance;
    }, 0);
  };
  const rbfs_recursive = (node, heuristic, isGoal, hLimit) => {
    if (isGoal(node)) {
      return Solution(node);
    }
    if (node.children.length == 0) {
      return SearchLimitExhausted(Number.POSITIVE_INFINITY);
    }
    for (child of node.children) {
      child.h = heuristic(child);
    }
    while (true) {
      // out of all children, pick the two with the lowest "h"
      const best = node.children[indexOfSmallest(node.children)];
      const alt = node.children[indexOfSmallest(node.children, best)];
      // if the heuristic on the current node is higher than
      //   previous best (from the parent), we need to backtrack
      if (best.h > hLimit) {
        return SearchLimitExhausted(best.h);
      }
      // best alternate h is either the 2nd best sibling or
      //  2nd best sibling of the parent
      const bestAlternateH = min(hLimit, alt.h);
      // recurse down best path, knowing what the best Alt is
      const result = rbfs_recursive(best, heuristic, isGoal, bestAlternateH);

      if (result instanceof Solution) {
        return result;
      } else if (result instanceof SearchLimitExhausted) {
        // if we hit a limit (heuristic increases down the path)
        //  then extract that value and update the h value of
        //  this node (best) with the new information
        best.h = result[extract]();
      }
    }
  };
  const indexOfSmallest = (array, notThisNode) => {
    // essentially reduce the array looking for the min,
    //  the one gotcha is ignoring the "notThisNode"
    return array.reduce(
      function (lowest, next, index) {
        if (notThisNode && next != notThisNode) {
          return lowest;
        } else {
          return next.h < array[lowest].h ? index : lowest;
        }
      },
      { h: Number.POSITIVE_INFINITY }
    );
  };
  console.log(manhattanDistance());

  return <div>TSP</div>;
}

export default TSP;
