"""
Docstring para testes.insert_sort
"""

from algoritmos import InsertionSort
from .tabela import *

insertion_sort_linear = InsertionSort().ordenacao_linear
insertion_sort_binary = InsertionSort().ordenacao_binaria


def gerar_pior_caso(tamanho: int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem decrescente para o pior caso do Insertion Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem decrescente
    :rtype: list[int]
    '''
    return list(reversed(range(tamanho)))


def gerar_melhor_caso(tamanho: int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem crescente para o melhor caso do Insertion Sort
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem crescente
    :rtype: list[int]
    '''
    return list(range(tamanho))

def testar_insertion_sort_linear():
    '''
    Gera os testes para o Insertion Sort com busca linear
    '''
    calcular_testes(
        insertion_sort_linear,
        "Ordenação por inserção (busca linear)",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        insertion_sort_linear,
        "Ordenação por inserção (busca linear)",
        gerar_melhor_caso,
        "Melhor Caso"
    )

def testar_insertion_sort_binary():
    '''
    Gera os testes para o Insertion Sort com busca binária
    '''
    calcular_testes(
        insertion_sort_binary,
        "Ordenação por inserção (busca binária)",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        insertion_sort_binary,
        "Ordenação por inserção (busca binária)",
        gerar_melhor_caso,
        "Melhor Caso"
    )