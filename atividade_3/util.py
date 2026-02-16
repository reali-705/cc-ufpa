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


def gerar_menu_opcoes(opcoes: list[str]) -> str:
    """
    Gera um menu de opcoes a partir de uma lista de opções.

    Args:
        opcoes (list[str]): Uma lista de opções para o menu.

    Returns:
        str: Uma string formatada representando o menu.
    """
    opcoes = list(map(str.strip, opcoes))
    if "Sair" not in opcoes:
        opcoes.insert(0, "Sair")
    return "\n".join(f"({i})  {opcao}" for i, opcao in enumerate(opcoes))


def escolher_tamanho_texto() -> int:
    """
    Função para escolher o tamanho do texto a ser gerado.

    Returns:
        int: O tamanho do texto escolhido pelo usuário.
    """
    opcoes = ["500", "1000", "1500", "2000", "3000"]
    while True:
        try:
            print("Escolha o tamanho do texto:")
            print(gerar_menu_opcoes(opcoes))
            escolha = int(input("Digite o número correspondente ao tamanho do texto: "))

            if escolha < 0 or escolha > len(opcoes):
                raise ValueError("Escolha inválida. Por favor, tente novamente.")
            return int(opcoes[escolha - 1])
        except ValueError as e:
            print(f"Erro: {e}\n")


def escolher_k() -> int:
    """
    Função para escolher o número máximo de erros permitidos.

    Returns:
        int: O número máximo de erros permitido escolhido pelo usuário.
    """
    while True:
        try:
            k = int(input("Escolha o número máximo de erros permitidos (máximo 2): "))
            if k < 0 or k > 2:
                raise ValueError("O número de erros deve ser um inteiro entre 0 e 2.")
            return k
        except ValueError as e:
            print(f"Erro: {e}\n")


def menu_principal() -> int:
    """
    Docstring para menu_principal

    :return: Descrição
    :rtype: int
    """
    while True:
        try:
            print("Escolha uma opção:")
            print(
                gerar_menu_opcoes(["Gerar texto aleatório", "Gerar texto com padrão"])
            )
            escolha = int(input("Digite o número correspondente à opção desejada: "))

            if escolha < 0 or escolha > 2:
                raise ValueError("Escolha inválida. Por favor, tente novamente.")
            return escolha
        except ValueError as e:
            print(f"Erro: {e}\n")
