"""
Docstring para atividade_2.kruskal
"""

import time
import pprint as ppt
from typing import List, Tuple, Optional


class Kruskal:
    """
    Algoritmo de Kruskal para encontrar uma Árvore Geradora Mínima (AGM).
    Usa Union-Find (disjoint set) para unir componentes e contabiliza métricas
    para posterior análise (arestas analisadas, número de finds/unions, tempo).
    """

    def __init__(self, grafo: Optional[List[Tuple[str, str, int]]] = None):
        """
        Inicializa a instância de Kruskal.

        Args:
            grafo: lista de arestas no formato (vertice1, vertice2, peso) ou None.
        """
        self.arestas: List[Tuple[str, str, int]] = []
        if grafo:
            self.arestas = self._normalizar_arestas(grafo)

    def _normalizar_arestas(
        self, arestas: List[Tuple[str, str, int]]
    ) -> List[Tuple[str, str, int]]:
        """Garante que arestas venham no formato (u, v, peso) como tuplas."""
        return [tuple(a) for a in arestas]

    # --- Disjoint Set (Union-Find) ---
    def _make_sets(self, vertices):
        parent = {v: v for v in vertices}
        rank = {v: 0 for v in vertices}
        return parent, rank

    def _find(self, parent: dict, x: str) -> str:
        """Find com compressão de caminho. Retorna o representante."""
        if parent[x] != x:
            parent[x] = self._find(parent, parent[x])
        return parent[x]

    def _union(self, parent: dict, rank: dict, x: str, y: str) -> None:
        """Union by rank sem retorno."""
        rx = self._find(parent, x)
        ry = self._find(parent, y)
        if rx == ry:
            return
        if rank[rx] < rank[ry]:
            parent[rx] = ry
        elif rank[ry] < rank[rx]:
            parent[ry] = rx
        else:
            parent[ry] = rx
            rank[rx] += 1

    # --- Método principal (agm) ---
    def agm(
        self, verbose: bool = False
    ) -> Tuple[
        List[Tuple[str, str, int]], float, int, int, int, int, int
    ]:
        """
        Executa o algoritmo de Kruskal sobre self.arestas.

        Returns:
            tuple:
                - solucao: lista de arestas da AGM [(u,v,p), ...]
                - tempo_execucao_total: tempo total (em segundos)
                - arestas_analisadas: quantas arestas foram consideradas
                - union_count: quantas uniões foram efetuadas (quando uma aresta entrou na MST)
                - find_count: quantas chamadas "find" foram realizadas 
                - mst_arestas: número de arestas adicionadas à MST
                - peso_minimo: soma dos pesos da solução (MST)
        """
        start_time = time.perf_counter()

        # normaliza e ordena arestas por peso (crescente)
        arestas = self._normalizar_arestas(self.arestas)
        tempo_inicio_sort = time.perf_counter()
        sorted_arestas = sorted(arestas, key=lambda x: x[2])
        tempo_fim_sort = time.perf_counter()
        tempo_sort = tempo_fim_sort - tempo_inicio_sort

        if verbose:
            print("Arestas ordenadas (asc):")
            print(ppt.pformat(sorted_arestas))
            print()

        # coleta vértices únicos
        vertices = set()
        for u, v, _ in sorted_arestas:
            vertices.add(u)
            vertices.add(v)

        parent, rank = self._make_sets(vertices)

        solucao: List[Tuple[str, str, int]] = []
        arestas_analisadas = 0
        union_count = 0
        find_count = 0
        mst_arestas = 0

        # itera sobre arestas ordenadas
        for u, v, peso in sorted_arestas:
            arestas_analisadas += 1

            # Faz dois finds (contabiliza)
            find_count += 1
            ru = self._find(parent, u)
            find_count += 1
            rv = self._find(parent, v)

            if verbose:
                print(
                    f"Aresta considerada #{arestas_analisadas}: ({u}, {v}, {peso}) -> representantes: {ru}, {rv}"
                )

            # se pertencem a componentes diferentes, adiciona à solução e faz union
            if ru != rv:
                solucao.append((u, v, peso))
                # union (internamente _union faz finds — já contamos os finds acima,
                # mas o _union fará finds novamente por simplicidade; para contagem
                # exata sem duplicação, podemos fazer o union por representantes)
                # Para evitar contar finds extras automáticos, usamos união por representantes:
                if rank[ru] < rank[rv]:
                    parent[ru] = rv
                elif rank[rv] < rank[ru]:
                    parent[rv] = ru
                else:
                    parent[rv] = ru
                    rank[ru] += 1

                union_count += 1
                mst_arestas += 1

                if verbose:
                    print(f"Aresta adicionada à MST: ({u}, {v}, {peso})")
                    print(f"Estado parcial dos representantes (amostra): {dict(list(parent.items())[:10])}")
                    print()

            else:
                if verbose:
                    print("Aresta descartada (mesma componente).")
                    print()

            # parada rápida: se já temos V-1 arestas, parar
            if mst_arestas == len(vertices) - 1:
                if verbose:
                    print("MST completa (V-1 arestas obtidas). Parando iteração.")
                break

        end_time = time.perf_counter()
        tempo_execucao_total = end_time - start_time

        peso_minimo = sum(p for (_, _, p) in solucao)

        # valida: se solucao tem V-1 arestas
        if len(solucao) != max(0, len(vertices) - 1):
            if verbose:
                print("A solução não formou uma AGM completa (grafo possivelmente desconexo).")

        return (
            solucao,
            tempo_execucao_total,
            arestas_analisadas,
            union_count,
            tempo_execucao_set_ops,
            mst_arestas,
            tempo_execucao_total,
        )

    def kruskal(
        self, arestas: List[Tuple[str, str, int]], verbose: bool = False
    ) -> Tuple[int, int, int, int, int, float, float]:
        """
        Wrapper para executar kruskal com uma nova lista de arestas — similar ao método prim()
        da classe Prim. Retorna métricas resumidas.

        Returns:
            tuple:
                - arestas_analisadas (int)
                - mst_arestas (int)
                - union_count (int)
                - find_count (int)
                - peso_minimo (int)
                - tempo_execucao_total (float)
                - tempo_total (float)  # inclui preparação + execução (idem ao tempo_execucao_total aqui)
        """
        self.arestas = self._normalizar_arestas(arestas)
        tempo_inicial = time.perf_counter()
        (
            solucao,
            tempo_execucao_total,
            arestas_analisadas,
            union_count,
            find_count,
            mst_arestas,
            peso_minimo,
        ) = self.agm(verbose=verbose)
        tempo_final = time.perf_counter()
        tempo_total = tempo_final - tempo_inicial

        return (
            arestas_analisadas,
            mst_arestas,
            union_count,
            find_count,
            peso_minimo,
            tempo_execucao_total,
            tempo_total,
        )


def questao_kruskal_demo():
    """
    """
    arestas = [
        ("A", "B", 7),
        ("A", "D", 5),
        ("B", "C", 8),
        ("B", "D", 9),
        ("B", "E", 7),
        ("C", "E", 555),
        ("D", "E", 0),
        ("D", "F", 6),
        ("E", "F", 8),
        ("E", "G", 9),
        ("F", "G", 111),
    ]

    kr = Kruskal(arestas)
    (
        arestas_analisadas,
        mst_arestas,
        union_count,
        find_count,
        peso_minimo,
        tempo_execucao,
        tempo_total,
    ) = kr.kruskal(arestas, verbose=True)

    print("\n=== Resultado do Kruskal ===\n")
    print(f"Arestas analisadas: {arestas_analisadas}")
    print(f"Arestas na MST: {mst_arestas}")
    print(f"Número de unions efetuados: {union_count}")
    print(f"Número de finds efetuados (contados): {find_count}")
    print(f"Peso mínimo (soma da MST): {peso_minimo}")
    print(f"Tempo de execução (agm): {tempo_execucao:.6f} s")
    print(f"Tempo total (wrapper): {tempo_total:.6f} s")

