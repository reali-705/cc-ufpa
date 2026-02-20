"""
Módulo para funções auxiliares da implementação do algoritmo Shift-And Aproximado.
"""

import time
from faker import Faker

import shift_and_aproximado

fake = Faker()


# --- Geração de texto ---
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
        str: Um texto aleatório contendo o padrão exato,
        com remoção, inserção e substituição de caracteres.
    """
    tamanho_padrao = len(padrao)
    parte_texto = tamanho // 4

    if tamanho_padrao > parte_texto:
        raise ValueError("O padrão é maior que um quarto do tamanho do texto.")

    # Gerar uma parte aleatória do texto
    if tamanho_padrao > parte_texto // 2:  # Segurança extra contra sobrescrita
        raise ValueError(
            "O padrão é grande demais para a margem de segurança do texto."
        )

    texto = list(gerar_texto_aleatorio(tamanho))

    # O pivô sempre começará no centro do respectivo quadrante
    # Quadrante 1: Exato
    pivo = parte_texto // 2
    texto[pivo : pivo + len(padrao)] = list(padrao)

    # Quadrante 2: Remoção
    pivo += parte_texto
    padrao_remocao = padrao[: tamanho_padrao // 2] + padrao[tamanho_padrao // 2 + 1 :]
    texto[pivo : pivo + len(padrao_remocao)] = list(padrao_remocao)

    # Quadrante 3: Inserção
    pivo += parte_texto
    padrao_insercao = (
        padrao[: tamanho_padrao // 2] + "X" + padrao[tamanho_padrao // 2 :]
    )
    texto[pivo : pivo + len(padrao_insercao)] = list(padrao_insercao)

    # Quadrante 4: Substituição
    pivo += parte_texto
    padrao_substituicao = (
        padrao[: tamanho_padrao // 2] + "Y" + padrao[tamanho_padrao // 2 + 1 :]
    )
    texto[pivo : pivo + len(padrao_substituicao)] = list(padrao_substituicao)

    return "".join(texto)


# --- Gerador de menus ---
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
    opcoes = ["Sair", "500", "1000", "1500", "2000", "3000"]
    while True:
        try:
            print("\nEscolha o tamanho do texto:")
            print(gerar_menu_opcoes(opcoes))
            escolha = int(input("Digite o número correspondente ao tamanho do texto: "))

            if escolha < 0 or escolha > len(opcoes) - 1:
                raise ValueError("Escolha inválida. Por favor, tente novamente.")
            elif escolha == 0:
                return 0

            return int(opcoes[escolha])
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
            k = int(input("\nEscolha o número máximo de erros permitidos (máximo 2): "))
            if k < 0 or k > 2:
                raise ValueError("O número de erros deve ser um inteiro entre 0 e 2.")
            return k
        except ValueError as e:
            print(f"Erro: {e}\n")


def analise_de_testes_aleatorios(tamanho_texto: int) -> float:
    """
    Função para realizar uma análise de testes aleatórios.

    Args:
        tamanho_texto (int): O tamanho do texto a ser gerado para os testes.

    returns:
        float: O tempo médio dos testes aleatórios em segundos.
    """
    print("\n=== Análise de Testes Aleatórios ===\n")

    while True:
        try:
            repeticoes = int(
                input(
                    "Digite o número de testes aleatórios (min: 1, max: 10) ou 0 para sair: "
                )
            )
            if repeticoes < 0:
                print(
                    "O número de testes deve ser um inteiro positivo. Por favor, tente novamente.\n"
                )
            elif repeticoes > 10:
                print(
                    "O número de testes é muito alto. Por favor, escolha um número menor.\n"
                )
            elif repeticoes == 0:
                return 0
            else:
                break
        except ValueError:
            print(
                "Entrada inválida. Por favor, digite um número inteiro entre 1 e 10.\n"
            )

    k = escolher_k()

    tempos: list[float] = []
    for i in range(repeticoes):
        padrao = fake.word()
        texto = gerar_texto_com_padrao(tamanho_texto, padrao)

        print(f"\nTeste {i + 1}: Padrão = '{padrao}'")

        tempo_inicial = time.perf_counter()
        resultados = shift_and_aproximado.buscar(texto, padrao, k)
        tempo_final = time.perf_counter()

        visualizar_resultados(resultados, texto, padrao, tempo_final - tempo_inicial)
        tempos.append(tempo_final - tempo_inicial)

    media_tempo = sum(tempos) / len(tempos) if tempos else 0
    return media_tempo


def menu_principal() -> int:
    """
    Docstring para menu_principal

    :return: Descrição
    :rtype: int
    """
    while True:
        opcoes = [
            "Sair",
            "Gerar texto aleatório",
            "Gerar texto com padrão",
            "Gerar testes aleatorios",
        ]
        try:
            print("\nEscolha uma opção:")
            print(gerar_menu_opcoes(opcoes))
            escolha = int(input("Digite o número correspondente à opção desejada: "))

            if escolha < 0 or escolha > len(opcoes) - 1:
                raise ValueError("Escolha inválida. Por favor, tente novamente.")
            return escolha
        except ValueError as e:
            print(f"Erro: {e}\n")


# --- Visualização de resultados ---
def visualizar_resultados(
    resultados: list[int], texto: str, padrao: str, delta_tempo: float
) -> None:
    """
    Função para visualizar os resultados da busca.

    Args:
        resultados (list[int]): Uma lista de índices onde o padrão foi encontrado.
        texto (str): O texto onde a busca foi realizada.
        padrao (str): O padrão buscado.
        delta_tempo (float): O tempo de execução da busca em segundos.
    """
    if resultados:
        print("Padrão encontrado nos indices:")
        for indice in resultados:
            inicio = max(0, indice - len(padrao) - 3)
            fim = min(len(texto), indice + 3)
            print(
                f"- Índice: {indice}, Contexto: '{texto[inicio:fim].replace("\n", " ")}'"
            )
    else:
        print("Padrão não encontrado no texto.")

    print(f"\nTempo de execução: {delta_tempo:.6f} segundos")
