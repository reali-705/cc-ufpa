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


def testar_heap_sort_iterativo():
    '''
    Gera os testes para a ordenação por Heap Sort (iterativo)
    '''
    calcular_testes(
        heap_sort_iterativo,
        "Ordenação por heap sort (iterativo)",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        heap_sort_iterativo,
        "Ordenação por heap sort (iterativo)",
        gerar_melhor_caso,
        "Melhor Caso"
    )

def testar_heap_sort_recursivo():
    '''
    Gera os testes para a ordenação por Heap Sort (recursivo)
    '''
    calcular_testes(
        heap_sort_recursivo,
        "Ordenação por heap sort (recursivo)",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        heap_sort_recursivo,
        "Ordenação por heap sort (recursivo)",
        gerar_melhor_caso,
        "Melhor Caso"
    )