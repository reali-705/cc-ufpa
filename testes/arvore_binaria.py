"""
Docstring para testes.arvore_binaria
"""

from algoritmos import ArvoreBinaria
from algoritmos import AVL
from .tabela import *

abb_sort = ArvoreBinaria().ordenar
avl_sort = AVL().ordenar

def gerar_pior_caso(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem crescente para o pior caso da Árvore Binária de Busca
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros em ordem crescente
    :rtype: list[int]
    '''
    return list(range(tamanho))

def gerar_melhor_caso(tamanho : int) -> list[int]:
    '''
    Função que gera uma lista de inteiros em ordem exata para sempre manter a árvore balanceada para o melhor caso da Árvore Binária de Busca
    
    :param tamanho: Tamanho da lista a ser gerada
    :type tamanho: int
    :return: Retorna uma lista de inteiros
    :rtype: list[int]
    '''

    lista = [(tamanho * 100) / 2]
    lista.extend([lista[0] / 2, lista[0] + lista[0] / 2])
    i = 3
    while i < tamanho:
        pai = (i - 1) // 2
        avo = (pai - 1) // 2
        passo = (lista[pai] - lista[avo]) / 2
        lista.append(lista[pai] - passo)
        lista.append(lista[pai] + passo)
        i += 2

    return lista[:tamanho]

def display_tabela():
    print("Ordenação Árvore de Busca Binária".upper())
    display_pior_caso(abb_sort, gerar_pior_caso)
    print("")
    display_melhor_caso(abb_sort, gerar_melhor_caso)
    print("")
    print("Ordenação por AVL".upper())
    display_pior_caso(avl_sort, gerar_pior_caso)
    print("")
    display_melhor_caso(avl_sort, gerar_melhor_caso)