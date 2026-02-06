"""
Docstring para atividade_2.jesse_and_cook
"""


def jesse_and_cookies(docura_minima: int, doucuras: list[int]) -> int:
    """
    Função para resolver o desafio Jesse and Cookies.

    Saída esperada:
    - Número mínimo de operações necessárias para garantir que todos os cookies tenham doçura >= k.
    - Se não for possível atingir a doçura desejada, imprimir -1.
    """
    print("Executando o desafio Jesse and Cookies...")
    # Lógica do desafio Jesse and Cookies aqui

    print(docura_minima, doucuras)

    return -1


def carregar_dados():
    """
    Função para carregar dados necessários para o desafio Jesse and Cookies.
    """
    print("Carregando dados para Jesse and Cookies...")

    docura_minima = int(input().strip())

    quantidade_cookies = int(input().strip())
    doucuras: list[int] = []
    for _ in range(quantidade_cookies):
        docura = int(input().strip())
        doucuras.append(docura)

    # Outra forma de carregar a lista de doçuras:
    # doucuras = [int(input().strip()) for _ in range(int(input().strip()))]

    jesse_and_cookies(docura_minima, doucuras)


if __name__ == "__main__":
    carregar_dados()
