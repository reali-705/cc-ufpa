"""
Docstring para testes.arvore_binaria
"""

from algoritmos import HeapSort
from .tabela import *

heap_sort_iterativo = HeapSort().ordem_iterativa
heap_sort_recursivo = HeapSort().ordem_recursiva

def gerar_pior_caso(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem crescente para o pior caso do Heap Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem crescente
    :rtype: list[int]
    '''
    return list(range(tamanho))

def gerar_melhor_caso(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem decrescente para o melhor caso do Heap Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem decrescente
    :rtype: list[int]
    '''
    return list(reversed(range(tamanho)))

def display_tabela():
    print("Ordenação por Heap Sort iterativo".upper())
    display_pior_caso(heap_sort_iterativo, gerar_pior_caso)
    print("")
    display_melhor_caso(heap_sort_iterativo, gerar_melhor_caso)
    print("")
    print("Ordenação por Heap Sort recursivo".upper())
    display_pior_caso(heap_sort_recursivo, gerar_pior_caso)
    print("")
    display_melhor_caso(heap_sort_recursivo, gerar_melhor_caso)