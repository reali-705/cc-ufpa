"""
Módulo de Árvore Binária de Busca (BST) para ordenação.

Uma BST (Binary Search Tree) mantém elementos ordenados através de sua
propriedade fundamental: para cada nó, todos os valores à esquerda são
menores e todos à direita são maiores ou iguais.

O percurso em-ordem (esquerda -> raiz -> direita) produz uma lista ordenada.
Útil para comparar com algoritmos de ordenação tradicionais.

Características:
- Estrutura de dados baseada em nós
- Ordenação implícita pela estrutura
- Performance depende do balanceamento da árvore
"""

import time
from typing import Optional

from algoritmos.resultado import Resultado

class NoBase:
    """Nó base para árvore binária (valor, esquerda, direita)."""

    def __init__(self, valor: int) -> None:
        self.valor: int = valor
        self.esquerda: Optional[NoBase] = None
        self.direita: Optional[NoBase] = None

class ArvoreBinaria:
    """
    Árvore Binária de Busca (BST) para ordenação de inteiros.
    
    Propriedade BST: para cada nó, todos os valores à esquerda são menores
    e todos à direita são maiores ou iguais.
    """

    def __init__(self) -> None:
        self.raiz: Optional[NoBase] = None
        self.comparacoes: int = 0
        self.trocas: int = 0

    def inserir(self, valor: int) -> None:
        """Insere valor na árvore. Complexidade: O(h) onde h é altura."""
        self.trocas += 1

        novo_no = NoBase(valor)

        if self.raiz is None:
            self.raiz = novo_no
        else:
            self._inserir_recursivo(self.raiz, novo_no)
    
    def inserir_iterativo(self, valor: int) -> None:
        """
        Insere valor na árvore de forma iterativa.
        Alternativa ao método recursivo.
        """
        self.trocas += 1
        novo_no = NoBase(valor)

        if self.raiz is None:
            self.raiz = novo_no
            return

        no_atual = self.raiz
        while True:
            self.comparacoes += 1
            if valor < no_atual.valor:
                if no_atual.esquerda is None:
                    self.trocas += 1
                    no_atual.esquerda = novo_no
                    return
                no_atual = no_atual.esquerda
            else:
                if no_atual.direita is None:
                    self.trocas += 1
                    no_atual.direita = novo_no
                    return
                no_atual = no_atual.direita

    def ordenar(self, lista: list[int], recursivo: bool = False) -> Resultado:
        """
        Ordena lista usando Tree Sort.
        Complexidade: O(n log n) melhor caso, O(n²) pior caso.
        """
        self.raiz = None
        
        tempo_inicial = time.perf_counter()

        # Insere todos os elementos
        for valor in lista:
            self.inserir(valor) if recursivo else self.inserir_iterativo(valor)

        lista_ordenada = self._em_ordem(self.raiz)

        tempo_final = time.perf_counter()
        
        # Retorna lista ordenada via travessia em-ordem
        return Resultado(
            metodo='arvore_binaria',
            comparacoes=self.comparacoes,
            trocas=self.trocas,
            tempo_ms=(tempo_final - tempo_inicial) * 1000,
            lista_base=lista,
            lista_ordenada=lista_ordenada,
        )


    def _em_ordem(self, no: Optional[NoBase]) -> list[int]:
        """
        Retorna lista de valores em travessia em-ordem (esquerda -> raiz -> direita).
        Esta travessia produz os valores em ordem crescente para uma BST.
        """
        if no is None:
            return []
        resultado = self._em_ordem(no.esquerda)
        resultado.append(no.valor)
        resultado.extend(self._em_ordem(no.direita))
        return resultado

    def _inserir_recursivo(self, no_atual: NoBase, novo_no: NoBase) -> None:
        """
        Insere recursivamente um nó na posição correta mantendo a propriedade BST.
        
        Compara o valor do novo nó com o nó atual:
        - Se menor: tenta inserir na subárvore esquerda
        - Se maior ou igual: tenta inserir na subárvore direita
        """
        self.comparacoes += 1
        if novo_no.valor < no_atual.valor:
            if no_atual.esquerda is None:
                self.trocas += 1
                no_atual.esquerda = novo_no
            else:
                self._inserir_recursivo(no_atual.esquerda, novo_no)
        else:
            if no_atual.direita is None:
                self.trocas += 1
                no_atual.direita = novo_no
            else:
                self._inserir_recursivo(no_atual.direita, novo_no)