"""
Docstring para atividade_2.prim
"""

import time
import pprint as ppt
from collections import defaultdict
import heapq


class Prim:
    """
    Algoritmo de Prim para encontrar uma Árvore Geradora Mínima (AGM)
    utiliza grafos e heap na execução, utiliza métodos para análise posterior
    """

    def __init__(self, arestas: list[tuple[str, str, int]]):
        self.grafo = self._criar_grafo(arestas)

    def agm(
        self, vertice_inicial: str
    ) -> tuple[dict[str, list[tuple[str, int]]], int, int]:
        """
        Encontra a Árvore Geradora Mínima (AGM) usando o algoritmo de Prim.

        Args:
            vertice_inicial (str): O vértice de partida para o algoritmo.

        Returns:
            tuple[dict[str, list[tuple[str, int]]], int, int]: A AGM representada como um dicionário
            de adjacências e o número de operações de push e pop no heap.
        """
        # Resultado da AGM esperado
        agm: dict[str, list[tuple[str, int]]] = defaultdict(list)
        heap_push = 0
        heap_pop = 0

        # Conjunto para rastrear os vértices visitados
        visitados: set[str] = set(vertice_inicial)

        # Adiciona as arestas do vértice inicial ao heap
        heap: list[tuple[int, str, str]] = []
        for vizinho, peso in self.grafo[vertice_inicial]:
            heapq.heappush(heap, (peso, vertice_inicial, vizinho))
            heap_push += 1

        while heap:
            peso, vertice1, vertice2 = heapq.heappop(heap)
            heap_pop += 1

            if vertice2 not in visitados:
                visitados.add(vertice2)
                agm[vertice1].append((vertice2, peso))
                agm[vertice2].append((vertice1, peso))

                for vizinho, peso_vizinho in self.grafo[vertice2]:
                    if vizinho not in visitados:
                        heapq.heappush(heap, (peso_vizinho, vertice2, vizinho))
                        heap_push += 1

        return dict(agm), heap_push, heap_pop

    def analise_complexidade(
        self, arestas: list[tuple[str, str, int]]
    ) -> tuple[float, int, int, dict[str, list[tuple[str, int]]]]:
        """
        Método para retornar informações necessárias sobre o algoritmo, como tempo e iterações

        Args:
            arestas (list[tuple[str, str, int]]): Lista de arestas (vertice1, vertice2, peso).

        Returns:
            tuple[float, int, int, dict[str, list[tuple[str, int]]]]: Resposta com tempo de execução
            e número de operações de push e pop no heap e a AGM encontrada.
        """
        self.grafo = self._criar_grafo(arestas)
        tempo_inicial = time.perf_counter()
        agm, heap_push, heap_pop = self.agm(next(iter(self.grafo)))
        tempo_final = time.perf_counter()
        tempo_total = tempo_final - tempo_inicial
        return (tempo_total, heap_push, heap_pop, agm)

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

        return grafo


def questao3():
    """
    Função principal para a atividade 2.
    """
    print("Querstão 3: Implementação do algoritmo de Prim")

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

    prim = Prim(arestas)
    # A. Encontre manualmente uma árvore geradora mínima para o grafo abaixo
    # e use o programa para validar o resultado. Mostre o log da execução.
    agm, _, _ = prim.agm("T")
    print("Árvore Geradora Mínima (AGM) encontrada:")
    ppt.pprint(agm)

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
