"""
Docstring para atividade_2.prim
"""

import time
import pprint as ppt
from collections import defaultdict
import heapq
from Grafo import Grafo


class Prim:
    """
    Algoritmo de Prim para encontrar uma Árvore Geradora Mínima (prim)
    utiliza grafos e heap na execução, utiliza métodos para análise posterior
    """

    def __init__(self, grafo: Grafo | list[tuple[str, str, int]]):
        if isinstance(grafo, Grafo):
            self.grafo = self._criar_grafo(grafo.arestas)
        else:
            self.grafo = self._criar_grafo(grafo)

    def agm(
        self, vertice_inicial: str | None = None, verbose: bool = False
    ) -> tuple[dict[str, list[tuple[str, int]]], int, int, int, int, float]:
        """
        Encontra a Árvore Geradora Mínima (agm) usando o algoritmo de Prim.

        Args:
            vertice_inicial (str): O vértice de partida para o algoritmo.

        Returns:
            tuple[dict[str, list[tuple[str, int]]], int, int, int]:
            A agm representada como um dicionário de adjacências e
            o número de operações de push, pop no heap e número de iterações.
        """
        # Resultado da agm esperado
        agm: dict[str, list[tuple[str, int]]] = defaultdict(list)
        heap_push = 0
        heap_pop = 0
        tempo_heap = 0

        vertice_inicial = vertice_inicial if vertice_inicial else next(iter(self.grafo))

        # Conjunto para rastrear os vértices visitados
        visitados: set[str] = {vertice_inicial}

        # Adiciona as arestas do vértice inicial ao heap
        heap: list[tuple[int, str, str]] = []
        for vizinho, peso in self.grafo[vertice_inicial]:
            tempo_inicial_heap = time.perf_counter()
            heapq.heappush(heap, (peso, vertice_inicial, vizinho))
            tempo_final_heap = time.perf_counter()
            tempo_heap += tempo_final_heap - tempo_inicial_heap
            heap_push += 1

        if verbose:
            print(f"Vértice inicial: {vertice_inicial}")
            print(f"Estado inicial do heap: {ppt.pformat(heap)}")
            print(f"Grafo: {ppt.pformat(self.grafo)}\n")

        aresta_analisada = 0
        while heap:
            peso, vertice1, vertice2 = heapq.heappop(heap)
            heap_pop += 1

            if vertice2 not in visitados:
                aresta_analisada += 1
                visitados.add(vertice2)
                agm[vertice1].append((vertice2, peso))
                agm[vertice2].append((vertice1, peso))

                for vizinho, peso_vizinho in self.grafo[vertice2]:
                    if vizinho not in visitados:
                        tempo_inicial_heap = time.perf_counter()
                        heapq.heappush(heap, (peso_vizinho, vertice2, vizinho))
                        tempo_final_heap = time.perf_counter()
                        tempo_heap += tempo_final_heap - tempo_inicial_heap
                        heap_push += 1

                if verbose:
                    print(f"Aresta escolhida: ({vertice1}, {vertice2}, {peso})")
                    print(f"Estado atual do heap: {ppt.pformat(heap)}\n")

            else:
                if verbose:
                    print(f"Vértice já visitado: ({vertice1}, {vertice2}, {peso})")
                    print(f"Estado atual do heap: {ppt.pformat(heap)}\n")

        return (
            dict(agm),
            heap_push,
            heap_pop,
            len(visitados),
            aresta_analisada,
            tempo_heap,
        )

    def prim(
        self, arestas: list[tuple[str, str, int]], verbose: bool = False
    ) -> tuple[int, int, int, int, float, int, float]:
        """
        Método para retornar informações necessárias sobre o algoritmo, como tempo e iterações

        Args:
            arestas (list[tuple[str, str, int]]): Lista de arestas (vertice1, vertice2, peso).

        Returns:
            tuple[float, int, int, int, int, float]:
            Resposta com tempo de execução e número de operações de push e pop no heap
            e o número de iterações, tempo total do heap e a agm encontrada.
        """
        self.grafo = self._criar_grafo(arestas)
        tempo_inicial = time.perf_counter()
        agm, heap_push, heap_pop, vertices_visitados, arestas_analisadas, tempo_heap = (
            self.agm(verbose=verbose)
        )
        quantidade_arestas = sum(len(vizinhos) for vizinhos in agm) // 2
        tempo_final = time.perf_counter()
        tempo_total = tempo_final - tempo_inicial
        return (
            heap_push,
            heap_pop,
            tempo_heap,
            quantidade_arestas,
            tempo_total,
        )

    def _criar_grafo(
        self,
        arestas: list[tuple[str, str, int]],
    ) -> dict[str, list[tuple[str, int]]]:
        """
        Cria um grafo a partir de uma lista de arestas.

        Args:
            arestas (list[tuple[str, str, int]]):
            Lista de arestas no formato (vertice1, vertice2, peso).

        Returns:
            dict[str, list[tuple[str, int]]]: Grafo representado como um dicionário de adjacências.
        """
        grafo: dict[str, list[tuple[str, int]]] = defaultdict(list)

        for vertice1, vertice2, peso in arestas:
            grafo[vertice1].append((vertice2, peso))
            grafo[vertice2].append((vertice1, peso))

        return dict(grafo)


def questao3():
    """
    Função principal para a atividade 2.
    """
    print("Querstão 3: Implementação do algoritmo de Prim".center(50, "="), end="\n\n")

    # Arestras (Vertice1, Vertice2, Peso)
    arestas = [
        ("T", "S", 5),
        ("T", "X", 4),
        ("T", "Y", 8),
        ("T", "Z", 9),
        ("S", "X", 6),
        ("S", "Y", 1),
        ("X", "Y", 3),
        ("Y", "Z", 7),
    ]

    # A. Encontre manualmente uma árvore geradora mínima para o grafo abaixo
    # e use o programa para validar o resultado. Mostre o log da execução.
    prim, heap_push, heap_pop, vertices_visitados, arestas_analisadas, tempo_heap = (
        Prim(arestas).agm("T", verbose=True)
    )
    print("\n=== Resultado da prim: ===\n")
    print(f"Número de operações de push no heap: {heap_push}")
    print(f"Número de operações de pop no heap: {heap_pop}")
    print(f"Número de vértices visitados: {vertices_visitados}")
    print(f"Número de arestas analisadas: {arestas_analisadas}")
    print(f"Tempo total do heap: {tempo_heap}")
    print(f"Árvore Geradora Mínima (prim) encontrada: {ppt.pformat(prim)}\n")

    # B. Qual a ordem de complexidade do programa?
    print(
        "A complexidade do algoritmo de Prim utilizando um heap é O(E log V),"
        "onde E é o número de arestas e V é o número de vértices."
    )

    # C. Caso mais arestas e vertices fossem adicionados ao grafo, como o desempenho
    # do programa seria afetado? Em outras palavras,
    # o algoritmo de Prim e mais sensıvel ao incremento de arestas ou de vertices?
    # Usando dados reais, ilustre graficamente sua resposta.


if __name__ == "__main__":
    questao3()
