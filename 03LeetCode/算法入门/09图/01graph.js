import Dictionary from './02dict'
function Graph() {
    // 顶点
    this.vertexes = []
    // 边
    this.edges = new Dictionary();
    // 添加顶点的方法
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v);
        this.edges(v, [])
    }
    Graph.prototype.addEdges = function (v1, v2) {
        this.edges.get(v1).push(v2);
    }
}