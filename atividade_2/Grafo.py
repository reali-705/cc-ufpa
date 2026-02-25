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
    
    def gerar_grafo_melhor_caso_agm(
        self,
        num_vertices: int,
        densidade: float,
        peso_mst_min: int = 1,
        peso_mst_max: int = 10,
        peso_extra_min: int = 1000,
        peso_extra_max: int = 2000,
        seed: int | None = None,
        forma: str = "cadeia",  # "estrela", "cadeia", "binaria"
    ):
        """
        Gera um grafo NÃO-direcionado com uma AGM "óbvia" (única) e densidade controlada.

        Ideia:
        1) constrói uma árvore base (n-1 arestas) com pesos pequenos e únicos -> essa árvore será a AGM.
        2) adiciona arestas extras até atingir a densidade desejada, com pesos muito maiores -> não entram na AGM.

        Melhor caso típico:
        - Prim: se a árvore base for "estrela" e você começar no centro, ele pega sempre a aresta mais barata fácil.
        - Kruskal: as (n-1) arestas baratas vêm todas antes das extras no sort.

        Observação:
        - densidade mínima possível para grafo conexo simples com n vértices é (n-1) / (n*(n-1)/2) = 2/n.
        """

        if seed is not None:
            random.seed(seed)

        if num_vertices <= 0:
            self.vertices = []
            self.arestas = []
            self.densidade = 0.0
            return

        self.vertices = [f"V{i}" for i in range(num_vertices)]
        self.arestas = []

        n = num_vertices
        max_arestas = n * (n - 1) // 2  # total de arestas não-direcionadas possíveis (sem laço)

        if n == 1:
            self._atualizar_densidade()
            return

        # número de arestas reais desejado
        alvo = int(round(densidade * max_arestas))
        # precisa ser pelo menos n-1 pra ser conexo (árvore)
        alvo = max(alvo, n - 1)
        alvo = min(alvo, max_arestas)

        # conjunto de arestas reais já usadas (u,v) com u< v
        usadas: set[tuple[str, str]] = set()

        def add_real(u: str, v: str, w: int):
            a, b = (u, v) if u < v else (v, u)
            if a == b:
                return False
            if (a, b) in usadas:
                return False
            usadas.add((a, b))
            self.arestas.append((a, b, w))
            self.arestas.append((b, a, w))
            return True

        # 1) Construir árvore base (AGM garantida) com pesos pequenos e únicos
        #    Usamos pesos distintos pra evitar empates e manter AGM única.
        peso_atual = peso_mst_min

        if forma == "estrela":
            centro = self.vertices[0]
            for i in range(1, n):
                add_real(centro, self.vertices[i], peso_atual)
                peso_atual += 1 if peso_atual < peso_mst_max else 1  # continua único mesmo se passar
        elif forma == "cadeia":
            for i in range(n - 1):
                add_real(self.vertices[i], self.vertices[i + 1], peso_atual)
                peso_atual += 1 if peso_atual < peso_mst_max else 1
        elif forma == "binaria":
            # liga i ao pai (i-1)//2 (árvore binária implícita)
            for i in range(1, n):
                pai = (i - 1) // 2
                add_real(self.vertices[pai], self.vertices[i], peso_atual)
                peso_atual += 1 if peso_atual < peso_mst_max else 1
        else:
            raise ValueError("forma deve ser: 'estrela', 'cadeia' ou 'binaria'")

        # 2) Adicionar arestas extras com pesos muito maiores (não entram na AGM)
        #    Para evitar empate com a árvore, usamos intervalo bem maior.
        while len(usadas) < alvo:
            i = random.randrange(n)
            j = random.randrange(n)
            if i == j:
                continue
            u, v = self.vertices[i], self.vertices[j]
            w = random.randint(peso_extra_min, peso_extra_max)
            add_real(u, v, w)

        self._atualizar_densidade()