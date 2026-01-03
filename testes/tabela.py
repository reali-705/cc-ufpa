"""
Arquivo interno para automatizar a geração de tabelas
Saída para Excel com colunas:
nome_algoritmo | tamentrada | tempo | caso
"""

import os
from typing import Callable, Any, List, Tuple
import pandas as pd


# ---------------- CONFIGURAÇÕES GLOBAIS ----------------

ENTRADAS = range(10, 110, 10)
NUM_REPETICOES = 100


def set_entradas(entradas: range):
    global ENTRADAS
    ENTRADAS = entradas


def set_repeticoes(num_repeticoes: int):
    global NUM_REPETICOES
    NUM_REPETICOES = num_repeticoes


def mean(lista: List[float]) -> float:
    if not lista:
        return 0.0
    return sum(lista) / len(lista)


# ---------------- FUNÇÃO AUXILIAR (EXCEL) ----------------

def salvar_excel(
    dados: List[Tuple[str, int, float, str]],
    arquivo: str = "resultados.xlsx",
    append: bool = True
):
    df_novo = pd.DataFrame(
        dados,
        columns=["nome_algoritmo", "tamentrada", "tempo", "caso"]
    )

    if append and os.path.exists(arquivo):
        df_antigo = pd.read_excel(arquivo)
        df_novo = pd.concat([df_antigo, df_novo], ignore_index=True)

    df_novo.to_excel(arquivo, index=False)


# ---------------- PIOR CASO ----------------

def display_pior_caso(
    algoritmo_ordenacao: Callable[[list[int]], Any],
    nome_algoritmo: str,
    pior_caso: Callable[[int], list[int]],
    salvar: bool = True,
    arquivo: str = "resultados.xlsx"
):
    lista_resultados = []
    dados_excel = []

    for n in ENTRADAS:
        tempos = []

        for _ in range(NUM_REPETICOES):
            lista = pior_caso(n)
            tempos.append(algoritmo_ordenacao(lista).tempo_ms)

        tempo_medio = mean(tempos)
        lista_resultados.append((n, f"{tempo_medio:.4f}"))
        dados_excel.append((nome_algoritmo, n, tempo_medio, "pior"))

    formatar(lista_resultados, "PIOR CASO")

    if salvar:
        salvar_excel(dados_excel, arquivo)


# ---------------- MELHOR CASO ----------------

def display_melhor_caso(
    algoritmo_ordenacao: Callable[[list[int]], Any],
    nome_algoritmo: str,
    melhor_caso: Callable[[int], list[int]],
    salvar: bool = True,
    arquivo: str = "resultados.xlsx"
):
    lista_resultados = []
    dados_excel = []

    for n in ENTRADAS:
        tempos = []

        for _ in range(NUM_REPETICOES):
            lista = melhor_caso(n)
            tempos.append(algoritmo_ordenacao(lista).tempo_ms)

        tempo_medio = mean(tempos)
        lista_resultados.append((n, f"{tempo_medio:.4f}"))
        dados_excel.append((nome_algoritmo, n, tempo_medio, "melhor"))

    formatar(lista_resultados, "MELHOR CASO")

    if salvar:
        salvar_excel(dados_excel, arquivo)


# ---------------- FORMATAÇÃO ----------------

def formatar(lista: List[tuple[int, str]], title: str):
    print("-" * 24)
    print(f"{title.center(24)}")
    print("-" * 24)
    print(f"{'N':>5} | {'Tempo médio (ms)':>15}")
    print("-" * 24)
    for n, tempo in lista:
        print(f"{n:>5} | {tempo:>15}")
    print("-" * 24)


# ---------------- HELPER ----------------

def run_casos_para_algoritmo(
    algoritmo_ordenacao: Callable[[list[int]], Any],
    nome_algoritmo: str,
    melhor_caso: Callable[[int], list[int]],
    pior_caso: Callable[[int], list[int]],
    arquivo: str = "resultados.xlsx"
):
    display_pior_caso(algoritmo_ordenacao, nome_algoritmo, pior_caso, True, arquivo)
    display_melhor_caso(algoritmo_ordenacao, nome_algoritmo, melhor_caso, True, arquivo)
