from testes import *

# Configurações globais para os testes
# Set_entradas configura os tamanhos das listas a serem testadas
set_entradas(range(10, 210, 10))
# Set_repeticoes configura o número de repetições para cada teste (Quanto maior, mais preciso, porém mais demorado)
set_repeticoes(100)

# Executa os testes e exibe as tabelas de resultados
insertion_sort_tabela()
print("="*40)
heap_sort_tabela()
print("="*40)
arvore_binaria_tabela()