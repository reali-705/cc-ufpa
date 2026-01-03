"""
Docstring para testes.arvore_binaria
"""

from algoritmos import ArvoreBinaria, AVL
from .tabela import run_casos_para_algoritmo


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


def display_tabela():
    print("=" * 40)
    print("ORDENAÇÃO ÁRVORE BINÁRIA DE BUSCA".upper())

    run_casos_para_algoritmo(
        abb_sort,
        "Árvore Binária de Busca",
        gerar_melhor_caso,
        gerar_pior_caso
    )

    print("=" * 40)
    print("ORDENAÇÃO POR AVL".upper())

    run_casos_para_algoritmo(
        avl_sort,
        "AVL",
        gerar_melhor_caso,
        gerar_pior_caso
    )
