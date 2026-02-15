"""
Módulo para funções auxiliares da implementação do algoritmo Shift-And Aproximado.
"""

from faker import Faker

fake = Faker()


def gerar_texto_aleatorio(tamanho: int) -> str:
    """
    Gera um texto aleatório de um determinado tamanho.

    Args:
        tamanho (int): O tamanho do texto a ser gerado.

    Returns:
        str: Um texto aleatório.
    """
    # Gera texto com uma margem de caracteres para garantir o tamanho desejado
    return fake.text(max_nb_chars=tamanho + 100)[:tamanho]


def gerar_texto_com_padrao(tamanho: int, padrao: str) -> str:
    """
    Gera um texto aleatório de um determinado tamanho que contém um padrão específico.

    Args:
        tamanho (int): O tamanho do texto a ser gerado.
        padrao (str): O padrão que deve estar presente no texto.

    Returns:
        str: Um texto aleatório contendo o padrão.
    """
    tamanho_padrao = len(padrao)

    if tamanho_padrao > tamanho:
        raise ValueError("O padrão não pode ser maior que o tamanho do texto.")

    # Gerar uma parte aleatória do texto
    texto = gerar_texto_aleatorio(tamanho - tamanho_padrao)

    # Inserir o padrão em uma posição aleatória do texto
    indice = fake.random_int(min=0, max=len(texto))
    texto_com_padrao = texto[:indice] + padrao + texto[indice:]

    return texto_com_padrao
