"""
Arquivo interno para automatizar a geração de tabelas 
"""
from typing import Callable, Any


def mean(lista : list[float]) -> float:
    '''
    Função que calcula a média de uma lista de floats
    
    :param lista: Uma lista de floats
    :type lista: list[float]
    :return: Retorna a média da lista
    :rtype: float
    '''
    return sum(lista)/len(lista)

ENTRADAS = range(10, 110, 10)
NUM_REPETICOES = 100


def display_pior_caso(algoritmo_ordenacao : Callable[[list[int]],Any]):
    '''
    Função que recebe a dunção de ordenação que mostra uma tabela com o tamanho da entrada e o tempo de execução
    
    :param algoritmo_ordenacao: Função de ordenação
    :type algoritmo_ordenacao: Callable[[list[int]], Any]
    '''
    lista_resultados = []
    for i in ENTRADAS:
        lista_teste_pior_caso = list(reversed(range(i)))
        j = 0
        while j <= NUM_REPETICOES:
            lista_tempos = []
            tempo = algoritmo_ordenacao(lista_teste_pior_caso).tempo_ms
            lista_tempos.append(tempo)
            j += 1
        tempo_medio = mean(lista_tempos)
        lista_resultados.append((i, f"{tempo_medio:.4f}"))
    formatar(lista_resultados, "PIOR CASO")
        
def display_melhor_caso(algoritmo_ordenacao : Callable[[list[int]],Any]):
    lista_resultados = []
    for i in ENTRADAS:
        lista_teste_melhor_caso = list(reversed(range(i)))
        j = 0
        while j <= NUM_REPETICOES:
            lista_tempos = []
            tempo = algoritmo_ordenacao(lista_teste_melhor_caso).tempo_ms
            lista_tempos.append(tempo)
            j += 1
        tempo_medio = mean(lista_tempos)
        lista_resultados.append((i, f"{tempo_medio:.4f}"))
    formatar(lista_resultados, "MELHOR CASO")

def formatar(lista : list[tuple[int, str]], title : str):
    print("—"*16)
    print(f"|{title.center(14)}|")
    print("|"+"—"*14+"|")
    print(f"| {"N":<3} | {"Tempo":>6} |")
    print("|"+"—"*14+"|")
    for entrada, tempo in lista:
        print(f"| {entrada:<3} | {tempo:>2} |")
    print("—"*16)