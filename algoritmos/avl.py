"""
Módulo de Árvore AVL (Adelson-Velsky e Landis) auto-balanceada.

Uma árvore AVL é uma BST que se auto-balanceia após cada inserção/remoção,
mantendo o fator de balanceamento de cada nó entre -1 e 1. Isso garante
altura máxima de O(log n), resultando em operações sempre eficientes.

Características:
- Todas as operações são O(log n) garantido (melhor que BST simples)
- Usa rotações (esquerda/direita) para rebalancear após modificações
- Fator de balanceamento: altura(esquerda) - altura(direita)
- Mantém propriedade BST durante o rebalanceamento

Casos de Rotação:
- Esquerda-Esquerda: rotação direita
- Direita-Direita: rotação esquerda
- Esquerda-Direita: rotação esquerda no filho, depois direita no pai
- Direita-Esquerda: rotação direita no filho, depois esquerda no pai
"""

from typing import cast, Optional

from algoritmos.arvore_binaria import ArvoreBinaria, NoBase

class NoAVL(NoBase):
    """
    Nó especializado para árvore AVL com informações de balanceamento.
    
    Estende NoBase adicionando:
    - altura: altura da subárvore com raiz neste nó
    - fator_balanceamento: diferença entre alturas das subárvores
    
    A altura é usada para calcular o fator de balanceamento e determinar
    quando rotações são necessárias para manter a árvore balanceada.
    """

    def __init__(self, valor: int) -> None:
        super().__init__(valor)
        self.altura: int = 1
        self.fator_balanceamento: int = 0

    def atualizar(self) -> None:
        """Atualiza altura e fator de balanceamento após modificação nos filhos."""
        filho_esquerda = cast(Optional[NoAVL], self.esquerda)
        filho_direita = cast(Optional[NoAVL], self.direita)
        
        altura_esquerda = filho_esquerda.altura if filho_esquerda else 0
        altura_direita = filho_direita.altura if filho_direita else 0
        
        self.altura = 1 + max(altura_esquerda, altura_direita)
        self.fator_balanceamento = altura_esquerda - altura_direita
    
class AVL(ArvoreBinaria):
    """
    Árvore AVL auto-balanceável.
    Garante todas as operações em O(log n) através de rotações.
    """

    def inserir(self, valor: int) -> None:
        """
        Insere valor mantendo a árvore balanceada.
        
        Algoritmo:
        1. Se árvore vazia, cria raiz
        2. Senão, insere recursivamente e rebalanceia
        3. Atualiza raiz com retorno (pode mudar após rotações)
        
        Complexidade: O(log n) - altura sempre balanceada
        """
        self.trocas += 1
        novo_no = NoAVL(valor)
        if self.raiz is None:
            self.raiz = novo_no
        else:
            self.raiz = self._inserir_balanceado(cast(NoAVL, self.raiz), valor)

    def _inserir_balanceado(self, no: NoAVL, valor: int) -> NoAVL:
        """Insere recursivamente e rebalanceia, retornando nova raiz."""
        self.comparacoes += 1
        if valor < no.valor:
            if no.esquerda is None:
                self.trocas += 1
                no.esquerda = NoAVL(valor)
            else:
                no.esquerda = self._inserir_balanceado(cast(NoAVL, no.esquerda), valor)
        else:
            if no.direita is None:
                self.trocas += 1
                no.direita = NoAVL(valor)
            else:
                no.direita = self._inserir_balanceado(cast(NoAVL, no.direita), valor)
        
        return self._balancear(no)

    def _balancear(self, no: NoAVL) -> NoAVL:
        """Verifica fator de balanceamento e aplica rotações se necessário."""
        no.atualizar()
        self.comparacoes += 1
        if no.fator_balanceamento > 1:
            filho_esquerda = cast(NoAVL, no.esquerda)
            self.comparacoes += 1
            if filho_esquerda.fator_balanceamento < 0:
                no.esquerda = self._rotacao_esquerda(filho_esquerda)
            return self._rotacao_direita(no)
        if no.fator_balanceamento < -1:
            filho_direita = cast(NoAVL, no.direita)
            self.comparacoes += 1
            if filho_direita.fator_balanceamento > 0:
                no.direita = self._rotacao_direita(filho_direita)
            return self._rotacao_esquerda(no)
        return no

    def _rotacao_direita(self, no: NoAVL) -> NoAVL:
        """Rotação à direita (caso LL)."""
        self.trocas += 1
        novo_pai = cast(NoAVL, no.esquerda)
        no.esquerda = novo_pai.direita
        novo_pai.direita = no
        no.atualizar()
        novo_pai.atualizar()
        return novo_pai
    
    def _rotacao_esquerda(self, no: NoAVL) -> NoAVL:
        """Rotação à esquerda (caso RR)."""
        self.trocas += 1
        novo_pai = cast(NoAVL, no.direita)
        no.direita = novo_pai.esquerda
        novo_pai.esquerda = no
        no.atualizar()
        novo_pai.atualizar()
        return novo_pai