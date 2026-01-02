"""
Docstring para testes.insert_sort
"""

from algoritmos import InsertionSort
from .tabela import *

insertion_sort_linear = InsertionSort().ordenacao_linear
insertion_sort_binary = InsertionSort().ordenacao_binaria


def gerar_lista_pior_caso_insert_sort(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem decrescente para o pior caso do Insertion Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem decrescente
    :rtype: list[int]
    '''
    return list(reversed(range(tamanho)))

def gerar_lista_melhor_caso_insert_sort(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem crescente para o melhor caso do Insertion Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem crescente
    :rtype: list[int]
    '''
    return list(range(tamanho))

print("Ordenação por inserção usando busca linear".upper())
display_pior_caso(insertion_sort_linear, gerar_lista_pior_caso_insert_sort)
print("")
display_melhor_caso(insertion_sort_linear, gerar_lista_melhor_caso_insert_sort)
print("")
print("Ordenação por inserção usando busca binária".upper())
display_pior_caso(insertion_sort_binary, gerar_lista_pior_caso_insert_sort)
print("")
display_melhor_caso(insertion_sort_binary, gerar_lista_melhor_caso_insert_sort)
