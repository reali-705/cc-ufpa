"""
Docstring para testes.arvore_binaria
"""

from algoritmos import HeapSort
from .tabela import *



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
    print("Ordenação por inserção usando busca linear".upper())
    display_pior_caso(insertion_sort_linear, gerar_pior_caso)
    print("")
    display_melhor_caso(insertion_sort_linear, gerar_melhor_caso)
    print("")
    print("Ordenação por inserção usando busca binária".upper())
    display_pior_caso(insertion_sort_binary, gerar_pior_caso)
    print("")
    display_melhor_caso(insertion_sort_binary, gerar_melhor_caso)