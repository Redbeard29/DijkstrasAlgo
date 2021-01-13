class WeightedGraph{
    constructor(){
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(vertex1, vertex2, weight){
        this.adjacencyList[vertex1].push({node: vertex2, weight: weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight: weight});
    }
    Dijkstras(start, end){
        var nodes = new PriorityQueue();
        var distances = {};
        var previous = {};
        var path = [];
        var smallest;

        for(var vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            }
            else{
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        while(nodes.values.length){
            smallest = nodes.dequeue().val;
            if(smallest === end){
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if(smallest || distances[smallest] !== Infinity){
                for(var neighbor in this.adjacencyList[smallest]){
                    var neighborNode = this.adjacencyList[smallest][neighbor];
                    var candidate = distances[smallest] + neighborNode.weight;
                    var nextNeighbor = neighborNode.node;
                    if(candidate < distances[nextNeighbor]){
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

class PriorityQueue{
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        var newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp(){
        var index = this.values.length - 1;
        var val = this.values[index];
        while(index > 0){
            var parentIdx = Math.floor((index - 1)/2);
            var parent = this.values[parentIdx];
            if(val.priority >= parent.priority){
                break;
            }
            this.values[parentIdx] = val;
            this.values[index] = parent;
            index = parentIdx;
        }
    }
    dequeue(){
        var min = this.values[0];
        var end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown(){
        var idx = 0;
        var length = this.values.length;
        var element = this.values[0];
        while(true){
            var leftChildIdx = 2 * idx + 1;
            var rightChildIdx = 2 * idx + 2;
            var leftChild;
            var rightChild;
            var swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority){
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)){
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node{
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

var wGraph = new WeightedGraph();

wGraph.addVertex("A");
wGraph.addVertex("B");
wGraph.addVertex("C");
wGraph.addVertex("D");
wGraph.addVertex("E");
wGraph.addVertex("F");
wGraph.addVertex("G");
wGraph.addVertex("H");
wGraph.addVertex("I");
wGraph.addVertex("J");
wGraph.addVertex("K");
wGraph.addVertex("L");
wGraph.addVertex("M");
wGraph.addVertex("N");
wGraph.addVertex("O");
wGraph.addVertex("P");


wGraph.addEdge("A", "B", 4);
wGraph.addEdge("A", "C", 2);
wGraph.addEdge("A", "P", 30);
wGraph.addEdge("B", "C", 12);
wGraph.addEdge("B", "E", 3);
wGraph.addEdge("C", "D", 2);
wGraph.addEdge("C", "F", 4);
wGraph.addEdge("D", "E", 3);
wGraph.addEdge("D", "F", 1);
wGraph.addEdge("E", "F", 1);
wGraph.addEdge("E", "G", 12);
wGraph.addEdge("F", "G", 3);
wGraph.addEdge("F", "I", 9);
wGraph.addEdge("G", "H", 2);
wGraph.addEdge("G", "L", 6);
wGraph.addEdge("G", "P", 22);
wGraph.addEdge("H", "I", 1);
wGraph.addEdge("H", "J", 7);
wGraph.addEdge("J", "O", 9);
wGraph.addEdge("J", "K", 2);
wGraph.addEdge("M", "N", 5);
wGraph.addEdge("M", "O", 3);
wGraph.addEdge("M", "P", 8);
wGraph.addEdge("O", "P", 2);


console.log(wGraph.Dijkstras("C", "P"));
