"""
Docstring para testes.arvore_binaria
"""

from algoritmos import ArvoreBinaria, AVL
from .tabela import *


abb_sort = ArvoreBinaria().ordenar
avl_sort = AVL().ordenar


def gerar_pior_caso(tamanho: int) -> list[int]:
    """
    Lista crescente → pior caso para ABB (degenera em lista)
    """
    return list(range(tamanho))


def gerar_melhor_caso(tamanho: int) -> list[int]:
    """
    Gera inserção em ordem que mantém a ABB aproximadamente balanceada
    """
    if tamanho == 0:
        return []

    def gerar_ordem_balanceada(valores):
        if not valores:
            return []
        meio = len(valores) // 2
        return (
            [valores[meio]]
            + gerar_ordem_balanceada(valores[:meio])
            + gerar_ordem_balanceada(valores[meio + 1 :])
        )

    valores = list(range(tamanho))
    return gerar_ordem_balanceada(valores)

def testar_abb_sort():
    '''
    Gera os testes para a ordenação por Árvore Binária de Busca (ABB)
    '''
    calcular_testes(
        abb_sort,
        "Ordenação por ABB",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        abb_sort,
        "Ordenação por ABB",
        gerar_melhor_caso,
        "Melhor Caso"
    )

def testar_avl_sort():
    '''
    Gera os testes para a ordenação por Árvore AVL
    '''
    calcular_testes(
        avl_sort,
        "Ordenação por AVL",
        gerar_pior_caso,
        "Pior Caso"
    )

    calcular_testes(
        avl_sort,
        "Ordenação por AVL",
        gerar_melhor_caso,
        "Melhor Caso"
    )