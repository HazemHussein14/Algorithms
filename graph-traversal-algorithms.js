import Queue from "./Data-Structures/Queue.js";

class Vertex {
  constructor() {
    this.name = "";
    this.visited = false;
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

  addEdges(vertexIndex, targets) {
    for (let i = 0; i < targets.length; i++) {
      this.vertices[vertexIndex].vertexLinks[i] = new Edge(
        this.vertices[vertexIndex],
        this.vertices[targets[i]]
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

  restoreVertices() {
    for (const v of this.vertices) {
      v.visited = false;
    }
  }
}

const graph = new Graph(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
graph.addEdges(0, [1, 2]);
graph.addEdges(1, [0, 3, 4]);
graph.addEdges(2, [0, 3, 5]);
graph.addEdges(3, [1, 2, 4]);
graph.addEdges(4, [1, 5]);
graph.addEdges(5, [2, 3, 4, 7]);
graph.addEdges(6, [7, 8]);
graph.addEdges(7, [5, 6, 8]);
graph.addEdges(8, [6, 7]);
graph.BFS();
graph.DFS();
