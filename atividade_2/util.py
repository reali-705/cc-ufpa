"""
Docstring para atividade_2.util
"""

from collections import defaultdict


def criar_grafo(
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
