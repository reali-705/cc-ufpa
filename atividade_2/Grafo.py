class Grafo:
    #construtor do grafo, recebe as arestas, os vertices e a densidade do grafo
    def __init__(self, arestas: list[tuple[str, str, int]], vertices: list[str],densidade: float):
        self.arestas = arestas | []
        self.vertices = vertices | []
        self.densidade = densidade | 0.0

    def add_aresta(self, vertice1: str, vertice2: str, peso: int):
        if vertice1 not in self.vertices:
            self.vertices.append(vertice1)
        if vertice2 not in self.vertices:
            self.vertices.append(vertice2)
        self.arestas.append((vertice1, vertice2, peso))
        self.arestas.append((vertice2, vertice1, peso))
        self.densidade = len(self.arestas) / (len(self.vertices) * (len(self.vertices) - 1) / 2)
    def remover_aresta(self, vertice1: str, vertice2: str):
        self.arestas = [aresta for aresta in self.arestas if not (aresta[0] == vertice1 and aresta[1] == vertice2) and not (aresta[0] == vertice2 and aresta[1] == vertice1)]
        self.densidade = len(self.arestas) / (len(self.vertices) * (len(self.vertices) - 1) / 2)

    def add_vertice(self, vertice: str):
        self.vertices.append(vertice)
        self.densidade = len(self.arestas) / (len(self.vertices) * (len(self.vertices) - 1) / 2)
    def remover_vertice(self, vertice: str):
        self.vertices.remove(vertice)
        self.arestas = [aresta for aresta in self.arestas if vertice not in aresta]
        self.densidade = len(self.arestas) / (len(self.vertices) * (len(self.vertices) - 1) / 2)

    def gerar_grafo_aleatorio(self, num_vertices, densidade, peso_min, peso_max, seed=None):
        import random
        if seed is not None:
            random.seed(seed)
        self.vertices = [f"V{i}" for i in range(num_vertices)]
        self.arestas = []
        for i in range(num_vertices):
            for j in range(i + 1, num_vertices):
                if random.random() < densidade:
                    peso = random.randint(peso_min, peso_max)
                    self.arestas.append((self.vertices[i], self.vertices[j], peso))
                    self.arestas.append((self.vertices[j], self.vertices[i], peso))
        self.densidade = len(self.arestas) / (len(self.vertices) * (len(self.vertices) - 1) / 2)
    def grafo_esta_vazio(self)->bool:
        return len(self.arestas) == 0 and len(self.vertices) == 0
    def criar_grafo(self) -> dict[str, list[tuple[str, int]]]:
        grafo: dict[str, list[tuple[str, int]]] = {vertice: [] for vertice in self.vertices}
        for vertice1, vertice2, peso in self.arestas:
            grafo[vertice1].append((vertice2, peso))
            grafo[vertice2].append((vertice1, peso))
        return grafo
    def print_grafo(self):
        print("Vértices:", self.vertices)
        print("Arestas:")
        for vertice1, vertice2, peso in self.arestas:
            print(f"  {vertice1} --({peso})--> {vertice2}")

    