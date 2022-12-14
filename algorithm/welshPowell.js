class WelshPowell {
  constructor() {
    this.chromaticNumber = 0;
    this.graph = null;
  }
  init(graph) {
    this.graph = graph;
  }
  getChromaticNumber() {
    return this.chromaticNumber;
  }
  compute() {
    // ------- STEP 1 -----------
    // the algorithm requires the use of a sorted list using
    // degree values for sorting them.
    var heap = [];
    var sortedNodes = [];
    for (var j in this.graph) {
      if (!this.graph.hasOwnProperty(j)) {
        continue;
      }
      heap.push({ node: j, neighbors: this.graph[j] });
    }

    //console.log('sortedNodes:before', sortedNodes);
    sortedNodes = heap.sort(sortVertices);

    heap = null;
    //console.log('sortedNodes:after', sortedNodes);
    // ------ STEP 2 --------
    // color initialization
    var nbColors = 0;

    var nodeColors = {};

    // ------- STEP 3 --------
    while (sortedNodes.length > 0) {
      //Node root = sortedNodes.poll();
      var root = sortedNodes.shift();
      //LinkedList<Node> myGroup = new LinkedList<Node>();
      var myGroup = [];
      //myGroup.add(root);
      myGroup.push(root);

      //root.addAttribute(attributeName, nbColors);
      root["color"] = nbColors;
      nodeColors[root.node] = { color: nbColors };

      for (var i = 0; i < sortedNodes.length; ) {
        var p = sortedNodes[i];
        var conflict = false;

        for (j = 0; !conflict && j < myGroup.length; j++) {
          conflict = getEdgeBetween(p, myGroup[j].node) != null;
        }

        if (conflict) {
          i++;
        } else {
          //p.addAttribute(attributeName, nbColors);
          p["color"] = nbColors;
          nodeColors[p.node] = { color: nbColors };

          //myGroup.add(p);
          myGroup.push(p);
          //sortedNodes.remove(i);
          sortedNodes.splice(i, 1);
        }
      }
      myGroup = [];
      nbColors++;
    }

    this.chromaticNumber = nbColors;

    return nodeColors;
  }
}

function getEdgeBetween(node1, nodeId) {
  var nodeIndex = node1.neighbors.indexOf(parseInt(nodeId));
  var result = nodeIndex === -1 ? null : nodeId;
  return result;
}

function sortVertices(b, a) {
  return a.neighbors.length < b.neighbors.length
    ? 1
    : a.neighbors.length == b.neighbors.length
    ? 0
    : -1;
}

// chromaticNumber: 6,
//     graph: [
//       [1, 2, 3, 4, 5],
//       [0, 2, 3, 4, 5],
//       [0, 1, 3, 4, 5],
//       [0, 1, 2, 4, 5],
//       [0, 1, 2, 3, 5],
//       [0, 1, 2, 3, 4],
//     ],

// function colorGraph(graph, colors) {
//   // Create a map to store the colors assigned to each vertex
//   const colorMap = new Map();

//   // Sort the vertices in descending order by their degree (number of edges)
//   const vertices = graph.vertices.sort((a, b) => b.degree - a.degree);

//   for (const vertex of vertices) {
//     // Get the list of available colors (those not used by any of the vertex's neighbors)
//     const availableColors = new Set(colors);
//     for (const neighbor of vertex.neighbors) {
//       if (colorMap.has(neighbor)) {
//         availableColors.delete(colorMap.get(neighbor));
//       }
//     }

//     // Assign the first available color to the vertex
//     colorMap.set(vertex, availableColors.values().next().value);
//   }

//   return colorMap;
// }

// // Example usage
// const graph = {
//   vertices: [{
//     id: 1,
//     degree: 3,
//     neighbors: [2, 3, 4]
//   }, {
//     id: 2,
//     degree: 2,
//     neighbors: [1, 3]
//   }, {
//     id: 3,
//     degree: 2,
//     neighbors: [1, 2]
//   }, {
//     id: 4,
//     degree: 1,
//     neighbors: [1]
//   }]
// };

// const colors = ['red', 'green', 'blue'];

// console.log(colorGraph(graph, colors));
// Output: Map { 1 => 'red', 2 => 'green', 3 => 'green', 4 => 'blue' }
