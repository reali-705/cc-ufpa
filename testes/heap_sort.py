"""
Docstring para testes.arvore_binaria
"""

from algoritmos import HeapSort
from .tabela import *

heap_sort_iterativo = HeapSort().ordem_iterativa
heap_sort_recursivo = HeapSort().ordem_recursiva


def gerar_pior_caso(tamanho: int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem crescente para o pior caso do Heap Sort
    '''
    return list(range(tamanho))


def gerar_melhor_caso(tamanho: int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem decrescente para o melhor caso do Heap Sort
    '''
    return list(reversed(range(tamanho)))


def display_tabela():
    print("ORDENAÇÃO POR HEAP SORT ITERATIVO")
    display_pior_caso(
        heap_sort_iterativo,
        "Heap Sort (iterativo)",
        gerar_pior_caso
    )
    print("")
    display_melhor_caso(
        heap_sort_iterativo,
        "Heap Sort (iterativo)",
        gerar_melhor_caso
    )
    print("")

    print("ORDENAÇÃO POR HEAP SORT RECURSIVO")
    display_pior_caso(
        heap_sort_recursivo,
        "Heap Sort (recursivo)",
        gerar_pior_caso
    )
    print("")
    display_melhor_caso(
        heap_sort_recursivo,
        "Heap Sort (recursivo)",
        gerar_melhor_caso
    )
