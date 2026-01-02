"""
Arquivo interno para automatizar a geração de tabelas 
"""

ENTRADAS = range(10, 110, 10)
NUM_REPETICOES = 100

def set_entradas(entradas : range):
    '''
    Função para definir os tamanhos de entrada para os testes
    
    :param entradas: Um range com os tamanhos de entrada
    :type entradas: range
    '''
    global ENTRADAS
    ENTRADAS = entradas

def set_repeticoes(num_repeticoes : int):
    '''
    Função para definir o número de repetições para os testes
    
    :param num_repeticoes: Número de repetições
    :type num_repeticoes: int
    '''
    global NUM_REPETICOES
    NUM_REPETICOES = num_repeticoes

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



def display_pior_caso(algoritmo_ordenacao : Callable[[list[int]],Any], pior_caso : Callable[[int], list[int]]):
    '''
    Função que exibe a tabela do pior caso para um algoritmo de ordenação
    
    :param algoritmo_ordenacao: Função de ordenação
    :type algoritmo_ordenacao: Callable[[list[int]], Any]
    :param pior_caso: Função que gera o pior caso para o algoritmo de ordenação
    :type pior_caso: Callable[[int], list[int]]
    '''

    # Lista para armazenar os resultados
    lista_resultados = []

    # Loop para cada tamanho de entrada
    for i in ENTRADAS:

        # Gera uma lista de teste com o pior caso para o tamanho i
        lista_teste_pior_caso = pior_caso(i)

        # Loop para repetir o teste n vezes e calcular a média
        j = 0
        while j <= NUM_REPETICOES:
            lista_tempos = []
            tempo = algoritmo_ordenacao(lista_teste_pior_caso).tempo_ms
            lista_tempos.append(tempo)
            j += 1
        tempo_medio = mean(lista_tempos)

        # Adiciona o resultado à lista de resultados
        lista_resultados.append((i, f"{tempo_medio:.4f}"))
    # Formata e exibe a tabela de resultados
    formatar(lista_resultados, "PIOR CASO")
        

def display_melhor_caso(algoritmo_ordenacao : Callable[[list[int]],Any], melhor_caso : Callable[[int], list[int]]):
    '''
    Função que exibe a tabela do melhor caso para um algoritmo de ordenação
    
    :param algoritmo_ordenacao: Função de ordenação
    :type algoritmo_ordenacao: Callable[[list[int]], Any]
    :param melhor_caso: Função que gera o melhor caso para o algoritmo de ordenação
    :type melhor_caso: Callable[[int], list[int]]
    '''

    # Lista para armazenar os resultados
    lista_resultados = []

    # Loop para cada tamanho de entrada
    for i in ENTRADAS:

        # Gera uma lista de teste com o melhor caso para o tamanho i
        lista_teste_melhor_caso = melhor_caso(i)

        # Loop para repetir o teste n vezes e calcular a média
        j = 0
        while j <= NUM_REPETICOES:
            lista_tempos = []
            tempo = algoritmo_ordenacao(lista_teste_melhor_caso).tempo_ms
            lista_tempos.append(tempo)
            j += 1
        tempo_medio = mean(lista_tempos)

        # Adiciona o resultado à lista de resultados
        lista_resultados.append((i, f"{tempo_medio:.4f}"))

    # Formata e exibe a tabela de resultados
    formatar(lista_resultados, "MELHOR CASO")


def formatar(lista : list[tuple[int, str]], title : str):
    '''
    Função que formata e exibe uma tabela de resultados
    
    :param lista: Lista a ser formatada
    :type lista: list[tuple[int, str]]
    :param title: Um título para a tabela
    :type title: str
    '''
    print("—"*16)
    print(f"|{title.center(14)}|")
    print("|"+"—"*14+"|")
    print(f"| {"N":<3} | {"Tempo":>6} |")
    print("|"+"—"*14+"|")
    for entrada, tempo in lista:
        print(f"| {entrada:<3} | {tempo:>2} |")
    print("—"*16)