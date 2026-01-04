"""
Arquivo interno para automatizar a geração de tabelas
Saída para Excel com colunas:
nome_algoritmo | tamentrada | tempo | caso
"""

import os
from typing import Callable, Any, List, Tuple, Iterable
import pandas as pd
from algoritmos import Resultado

# ---------------- FUNÇÕES AUXILIARES ----------------

def range_exponencial(start: int, stop: int, factor: float) -> Iterable[int]:
    '''
    Cria um iterável que aumenta exponencialmente de start até stop com um fator específico.
    
    :param start: Description
    :type start: int
    :param stop: Description
    :type stop: int
    :param factor: Description
    :type factor: float
    :return: Description
    :rtype: Iterable[int]
    '''
    current = start
    while current < stop:
        yield int(current)
        current **= factor


# ---------------- CONFIGURAÇÕES GLOBAIS ----------------

ENTRADAS = range_exponencial(10, 110, 2)


def set_entradas(start: int, stop: int, factor: float):
    global ENTRADAS
    ENTRADAS = range_exponencial(start, stop, factor)



# ---------------- FUNÇÃO AUXILIAR (EXCEL) ----------------

def salvar_excel(
    dados: List[Tuple[str, int, float,int, int, str]],
    arquivo: str = "resultados.xlsx",
    append: bool = True
):
    df_novo = pd.DataFrame(
        dados,
        columns=["nome_algoritmo", "tamentrada", "tempo", "trocas", "comparações", "caso"]
    )

    if append and os.path.exists(arquivo):
        df_antigo = pd.read_excel(arquivo)
        df_novo = pd.concat([df_antigo, df_novo], ignore_index=True)

    df_novo.to_excel(arquivo, index=False)

# ---------------- SALVAR DADOS PARA QUALQUER CASO ----------------

def calcular_testes(
        algoritmo_ordenacao: Callable[[list[int]], Resultado],
        nome_algoritmo: str,
        gerar_lista_teste: Callable[[int], list[int]],
        nome_do_caso: str,
        salvar: bool = True,
        arquivo: str = "resultados.xlsx"
) -> List[Tuple[str, int, float, int, int, str]]:
    '''
    Calcula os testes e os salva em um arquivo Excel. Também retorna os dados calculados.
    
    :param algoritmo_ordenacao: A função de ordenação a ser testada
    :type algoritmo_ordenacao: Callable[[list[int]], Resultado]
    :param nome_algoritmo: Nome do algoritmo testado
    :type nome_algoritmo: str
    :param gerar_lista_teste: Função que gera as listas de teste
    :type gerar_lista_teste: Callable[[int], list[int]]
    :param nome_do_caso: Nome do caso de teste (e.g., "Pior Caso", "Melhor Caso")
    :type nome_do_caso: str
    :param salvar: booleno que indica se os resultados devem ser salvos. Por padrão é True
    :type salvar: bool
    :param arquivo: Nome do arquivo Excel onde os resultados serão salvos. Por padrão é "resultados.xlsx"
    :type arquivo: str
    :return: Lista de tuplas com nome do algoritmo, tamanho da entrada, tempo, trocas, comparaçãos e nome do caso
    :rtype: List[Tuple[str, int, float, int, int, str]]
    '''
    dados_excel = []
    for n in ENTRADAS:
        lista = gerar_lista_teste(n)
        resultado = algoritmo_ordenacao(lista)
        dados_excel.append((nome_algoritmo, n, resultado.tempo_ms, resultado.trocas, resultado.comparacoes, nome_do_caso))
    
    if salvar:
        salvar_excel(dados_excel, arquivo)
    
    return dados_excel