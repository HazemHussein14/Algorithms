import Queue from "./Data-Structures/Queue.js";

class Vertex {
  constructor() {
    this.name = "";
    this.visited = false;
    this.totalLength = 0;
    this.sourceOfTotalLength = null;
    this.vertexLinks = [];
  }
}

class Edge {
  constructor(source, target, weight = 0) {
    this.source = source;
    this.target = target;
    this.weight = weight;
  }
}

class Graph {
  constructor(names) {
    this.lastIndex = 0;
    this.vertices = [];
    for (const name of names) {
      this.vertices[this.lastIndex] = new Vertex();
      this.vertices[this.lastIndex].name = name;
      this.lastIndex++;
    }
  }

  addEdges(vertexIndex, targets, weights) {
    for (let i = 0; i < targets.length; i++) {
      this.vertices[vertexIndex].vertexLinks[i] = new Edge(
        this.vertices[vertexIndex],
        this.vertices[targets[i]],
        weights[i]
      );
    }
  }

  BFS() {
    console.log("BFS running");
    const q = new Queue();

    q.enqueue(this.vertices[0]);
    this.vertices[0].visited = true;

    let currentVertex;
    let destinations = [];

    while (q.hasData()) {
      currentVertex = q.dequeue();
      destinations = currentVertex.vertexLinks;

      for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].target.visited == false) {
          q.enqueue(destinations[i].target);
          destinations[i].target.visited = true;
          console.log(currentVertex.name + " - " + destinations[i].target.name);
        }
      }
    }
    this.restoreVertices();
  }

  DFS() {
    console.log("DFS running");
    this.DFSRecursion(this.vertices[0]);
    this.restoreVertices();
  }

  DFSRecursion(currentVertex) {
    currentVertex.visited = true;
    let destinations = currentVertex.vertexLinks;
    for (let i = 0; i < destinations.length; i++) {
      if (destinations[i].target.visited == false) {
        console.log(currentVertex.name + " - " + destinations[i].target.name);
        this.DFSRecursion(destinations[i].target);
      }
    }
  }

  Dijkastra() {
    console.log("Dijkastra running");
    for (let i = 1; i < this.vertices.length; i++) {
      this.vertices[i].totalLength = Number.MAX_VALUE;
    }

    let currentVertex;
    for (let i = 0; i < this.vertices.length; i++) {
      currentVertex = this.vertices[i];
      let destinations = currentVertex.vertexLinks;
      if (destinations == null) continue;

      let currentEdge;
      for (let j = 0; j < destinations.length; j++) {
        currentEdge = destinations[j];
        let newLength = currentVertex.totalLength + currentEdge.weight;

        if (newLength < currentEdge.target.totalLength) {
          currentEdge.target.totalLength = newLength;
          currentEdge.target.sourceOfTotalLength = currentVertex;
        }
      }
    }
    let path = this.vertices[this.vertices.length - 1].name;
    let v = this.vertices[this.vertices.length - 1];

    while (v.sourceOfTotalLength != null) {
      path = v.sourceOfTotalLength.name + " - " + path;
      v = v.sourceOfTotalLength;
    }

    console.log(this.vertices[this.vertices.length - 1].totalLength);
    console.log(path);
  }

  restoreVertices() {
    for (const v of this.vertices) {
      v.visited = false;
      v.totalLength = 0;
      v.sourceOfTotalLength = null;
    }
  }
}

const graph = new Graph(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
graph.addEdges(0, [1, 2, 3], [2, 4, 3]);

graph.addEdges(1, [4, 5, 6], [7, 4, 6]);
graph.addEdges(2, [4, 5, 6], [3, 2, 4]);
graph.addEdges(3, [4, 5, 6], [4, 1, 5]);

graph.addEdges(4, [7, 8], [1, 4]);
graph.addEdges(5, [7, 8], [6, 3]);
graph.addEdges(6, [7, 8], [3, 3]);

graph.addEdges(7, [9], [3]);
graph.addEdges(8, [9], [4]);

// graph.BFS();
// graph.DFS();

graph.Dijkastra();
