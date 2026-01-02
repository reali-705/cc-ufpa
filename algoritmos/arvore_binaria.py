"""
Docstring para algoritmos.arvore_binaria
"""

class No:
    """
    Docstring para No
    """
    def __init__(self):
        self.esquerda = None
        self.direita = None
        self.valor = None

class ArvoreBinaria:
    """
    Docstring para ArvoreBinaria
    """
    def __init__(self, no=No):
        self.raiz = None

    def inserir(self, valor):
        """
        Docstring para inserir
        """
        novo_no = No()
        novo_no.valor = valor

        if self.raiz is None:
            self.raiz = novo_no
        else:
            self._inserir_recursivo(self.raiz, novo_no)

    def _inserir_recursivo(self, no_atual, novo_no):
        """
        Docstring para _inserir_recursivo
        """
        if novo_no.valor < no_atual.valor:
            if no_atual.esquerda is None:
                no_atual.esquerda = novo_no
            else:
                self._inserir_recursivo(no_atual.esquerda, novo_no)
        else:
            if no_atual.direita is None:
                no_atual.direita = novo_no
            else:
                self._inserir_recursivo(no_atual.direita, novo_no)
