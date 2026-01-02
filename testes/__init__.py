'''
Modulo para a criação dos testes e das tabelas de resultados

Para cada resultado
'''

from .insertion_sort import display_tabela as insertion_sort_tabela
from .heap_sort import display_tabela as heap_sort_tabela
from .arvore_binaria import display_tabela as arvore_binaria_tabela
from .tabela import set_repeticoes, set_entradas

__all__ = [
    "insertion_sort_tabela",
    "heap_sort_tabela",
    "arvore_binaria_tabela",
    "set_repeticoes",
    "set_entradas",
]