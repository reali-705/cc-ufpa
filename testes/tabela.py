"""
Arquivo interno para automatizar a geração de tabelas
Saída para Excel com colunas:
nome_algoritmo | tamentrada | tempo | caso | trocas | comparações
"""

import os
from typing import Callable, List, Tuple
import pandas as pd
from algoritmos import Resultado

# ---------------- FUNÇÕES AUXILIARES ----------------

def range_exponencial(start: int, stop: int, factor: float) -> List[int]:
    '''
    Cria uma lista que aumenta exponencialmente de start até stop com um fator específico.

    :param start: valor inicial (inteiro > 0)
    :param stop: valor de parada (não incluído)
    :param factor: fator de multiplicação (> 1.0)
    :return: lista de inteiros (cada valor = int(previous * factor))
    '''
    if start <= 0:
        raise ValueError("start deve ser maior que 0")
    if stop <= start:
        return [start] if start < stop else []
    if factor <= 1:
        raise ValueError("factor deve ser maior que 1")

    valores: List[int] = []
    current = float(start)
    while int(current) < stop:
        valores.append(int(current))
        current *= factor


    valores_unicos = []
    last = None
    for v in valores:
        if v != last:
            valores_unicos.append(v)
            last = v

    return valores_unicos


# ---------------- CONFIGURAÇÕES GLOBAIS ----------------

# padrão (reutilizável)
ENTRADAS: List[int] = range_exponencial(10, 110, 2)


def set_entradas(start: int, stop: int, factor: float):
    '''
    Atualiza a variável global ENTRADAS com uma lista gerada por range_exponencial.
    '''
    global ENTRADAS
    ENTRADAS = range_exponencial(start, stop, factor)


# ---------------- FUNÇÃO AUXILIAR (EXCEL) ----------------

def salvar_excel(
    dados: List[Tuple[str, int, float, int, int, str]],
    arquivo: str = "resultados.xlsx",
    append: bool = True
):
    df_novo = pd.DataFrame(
        dados,
        columns=["nome_algoritmo", "tamentrada", "tempo_ms", "trocas", "comparacoes", "caso"]
    )

    # Se não há dados novos, não faz nada
    if df_novo.empty:
        return

    if append and os.path.exists(arquivo):
        try:
            df_antigo = pd.read_excel(arquivo)

            # Remove DataFrames vazios antes de concatenar (CORREÇÃO DO WARNING)
            frames_validos = []
            if not df_antigo.empty:
                frames_validos.append(df_antigo)
            if not df_novo.empty:
                frames_validos.append(df_novo)

            if frames_validos:
                df_final = pd.concat(frames_validos, ignore_index=True)
            else:
                df_final = df_novo

            df_final.to_excel(arquivo, index=False)

        except Exception as e:
            print(f"Aviso: erro ao ler '{arquivo}' ({e}). Sobrescrevendo.")
            df_novo.to_excel(arquivo, index=False)
    else:
        df_novo.to_excel(arquivo, index=False)


# ---------------- SALVAR DADOS PARA QUALQUER CASO ----------------

def calcular_testes(
        algoritmo_ordenacao: Callable[[List[int]], Resultado],
        nome_algoritmo: str,
        gerar_lista_teste: Callable[[int], List[int]],
        nome_do_caso: str,
        salvar: bool = True,
        arquivo: str = "resultados.xlsx"
) -> List[Tuple[str, int, float, int, int, str]]:
    '''
    Calcula os testes e os salva em um arquivo Excel. Também retorna os dados calculados.

    :param algoritmo_ordenacao: A função de ordenação a ser testada (recebe lista[int] e retorna Resultado)
    :param nome_algoritmo: Nome do algoritmo testado
    :param gerar_lista_teste: Função que gera as listas de teste a partir do tamanho n
    :param nome_do_caso: Nome do caso de teste (e.g., "Pior Caso", "Melhor Caso")
    :param salvar: booleano que indica se os resultados devem ser salvos. Por padrão é True
    :param arquivo: Nome do arquivo Excel onde os resultados serão salvos. Por padrão é "resultados.xlsx"
    :return: Lista de tuplas com (nome do algoritmo, tamanho da entrada, tempo_ms, trocas, comparações, nome do caso)
    '''
    dados_excel: List[Tuple[str, int, float, int, int, str]] = []

    if not ENTRADAS:
        print("A lista ENTRADAS está vazia. Verifique set_entradas(...) ou os parâmetros de range_exponencial.")
        return dados_excel

    for n in ENTRADAS:
        lista = gerar_lista_teste(n)
        resultado = algoritmo_ordenacao(lista)
        # resultado deve ter atributos: tempo_ms, trocas, comparacoes
        dados_excel.append((nome_algoritmo, n, resultado.tempo_ms, resultado.trocas, resultado.comparacoes, nome_do_caso))

    if salvar:
        salvar_excel(dados_excel, arquivo)

    return dados_excel
