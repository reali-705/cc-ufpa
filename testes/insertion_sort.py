"""
Docstring para testes.insert_sort
"""

from algoritmos import InsertionSort
from .tabela import *

insertion_sort_linear = InsertionSort().ordenacao_linear
insertion_sort_binary = InsertionSort().ordenacao_binaria

print("Ordenação por inserção usando busca linear".upper())
display_pior_caso(insertion_sort_linear)
print("")
display_melhor_caso(insertion_sort_linear)
print("")
print("Ordenação por inserção usando busca binária".upper())
display_pior_caso(insertion_sort_binary)
print("")
display_melhor_caso(insertion_sort_binary)
