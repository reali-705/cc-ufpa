"""
Docstring para atividade_2.main
"""

import pprint as ppt
import atividade_2.util as util


def main():
    """
    Função principal para a atividade 2.
    """
    print("QUerstão 3: Implementação do algoritmo de Prim")

    # Arestras (Vertice1, Vertice2, Peso)
    arestras = [
        ("T", "S", 5),
        ("T", "X", 4),
        ("T", "Y", 8),
        ("T", "Z", 9),
        ("S", "X", 6),
        ("S", "Y", 1),
        ("X", "Y", 3),
        ("Y", "Z", 7),
    ]

    grafo = util.criar_grafo(arestras)
    ppt.pprint(grafo)
    # A. Encontre manualmente uma árvore geradora mínima para o grafo abaixo
    # e use o programa para validar o resultado. Mostre o log da execução.

    # B. Qual a ordem de complexidade do programa?

    # C. Caso mais arestas e vertices fossem adicionados ao grafo, como o desempenho
    # do programa seria afetado? Em outras palavras, o algoritmo de
    # Prim e mais sensıvel ao incremento de arestas ou de vertices? Usando
    # dados reais, ilustre graficamente sua resposta.


if __name__ == "__main__":
    main()
