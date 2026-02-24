import random

class Grafo:
    def __init__(
        self,
        arestas: list[tuple[str, str, int]] | None = None,
        vertices: list[str] | None = None,
        densidade: float | None = None
    ):
        self.arestas = arestas if arestas is not None else []
        self.vertices = vertices if vertices is not None else []
        self.densidade = densidade if densidade is not None else 0.0

    def _get_num_arestas_reais(self) -> int:
        """Retorna o número de arestas únicas (pares não direcionados)."""
        # Como cada conexão física gera (u,v) e (v,u), dividimos por 2
        return len(self.arestas) // 2

    def _atualizar_densidade(self):
        n = len(self.vertices)
        if n <= 1:
            self.densidade = 0.0
            return
        # Fórmula: E / (V * (V-1) / 2)
        max_arestas = (n * (n - 1)) / 2
        self.densidade = self._get_num_arestas_reais() / max_arestas

    def add_aresta(self, vertice1: str, vertice2: str, peso: int):
        if vertice1 not in self.vertices: self.vertices.append(vertice1)
        if vertice2 not in self.vertices: self.vertices.append(vertice2)
        
        # Impede auto-laços que quebram a lógica de grafos simples
        if vertice1 == vertice2: return

        self.arestas.append((vertice1, vertice2, peso))
        self.arestas.append((vertice2, vertice1, peso))
        self._atualizar_densidade()

    def gerar_grafo_aleatorio(self, num_vertices, densidade, peso_min, peso_max, seed=None):
        if seed is not None:
            random.seed(seed)
            
        self.vertices = [f"V{i}" for i in range(num_vertices)]
        self.arestas = []
        
        for i in range(num_vertices):
            for j in range(i + 1, num_vertices):
                if random.random() < densidade:
                    peso = random.randint(peso_min, peso_max)
                    # Adiciona o par para representar a aresta não direcionada
                    self.arestas.append((self.vertices[i], self.vertices[j], peso))
                    self.arestas.append((self.vertices[j], self.vertices[i], peso))
        
        self._atualizar_densidade()

    def grafo_esta_vazio(self) -> bool:
        return len(self.arestas) == 0 and len(self.vertices) == 0