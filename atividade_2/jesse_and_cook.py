"""
Docstring para atividade_2.jesse_and_cook
"""

import heapq


def jesse_and_cookies(
    docura_minima: int, docuras: list[int], verboso: bool = False
) -> int:
    """
    Função para resolver o desafio Jesse and Cookies.

    Saída esperada:
    - Número mínimo de operações necessárias para garantir que todos os cookies tenham doçura >= k.
    - Se não for possível atingir a doçura desejada, imprimir -1.
    """
    print("\nExecutando o desafio Jesse and Cookies...")

    heapq.heapify(docuras)
    operacoes = 0

    if verboso:
        print(
            f"""
            Doçuras iniciais: {docuras}
            Doçura mínima desejada: {docura_minima}
            """
        )

    while docuras and docuras[0] < docura_minima:
        if len(docuras) < 2:
            return -1

        menor = heapq.heappop(docuras)
        segundo_menor = heapq.heappop(docuras)

        nova_docura = menor + 2 * segundo_menor
        heapq.heappush(docuras, nova_docura)

        operacoes += 1

        if verboso:
            print(
                f"""
                Operação {operacoes}:
                - Menor doçura: {menor}
                - Segundo menor doçura: {segundo_menor}
                - Nova doçura criada: {nova_docura}
                Doçuras atuais: {docuras}
                """
            )

    return operacoes


def carregar_dados():
    """
    Função para carregar dados necessários para o desafio Jesse and Cookies.
    Modelo simples de entradas:
        Doçura mínima
        Doçura dos cookies separados por espaço'
    """
    print("Carregando dados para o problema Jesse and Cookies...")

    docura_minima = int(input("Doçura mínima: ").strip())

    docuras = list(map(int, input("Doçura do cookie: ").strip().split()))

    print(jesse_and_cookies(docura_minima, docuras))


def carregar_dados_detalhado():
    """
    Função para carregar dados necessários para o desafio Jesse and Cookies.
    Com detalhes e validação de entrada.
    """
    print("Carregando dados para o problema Jesse and Cookies...\n")

    # Validação de entrada para quantidade de cookies
    while True:
        try:
            quantidade_docuras = int(input("Digite a quantidade de cookies: ").strip())
            if quantidade_docuras <= 0:
                raise ValueError(
                    """
                    A quantidade de cookies deve ser um número positivo.
                    Por favor, insira um valor válido.
                    """
                )
            elif quantidade_docuras == 1:
                raise ValueError(
                    """
                    Com apenas um cookie, não é possível realizar operações.
                    Por favor, insira uma quantidade maior.
                    """
                )
            elif quantidade_docuras > 1e6:
                raise ValueError(
                    """
                    A quantidade de cookies é muito grande.
                    Por favor, insira um valor menor (até 1.000.000).
                    """
                )
            else:
                break
        except ValueError as e:
            print(e)

    # Validação para as doçuras dos cookies que formarão a lista de doçuras
    docuras: list[int] = []
    while len(docuras) < quantidade_docuras:
        try:
            docura = int(input("Digite a doçura do cookie: ").strip())
            if docura < 0:
                raise ValueError(
                    """
                    A doçura não pode ser negativa.
                    Por favor, insira um valor válido.
                    """
                )
            elif docura > 1e6:
                raise ValueError(
                    """
                    A doçura não pode ser maior que 1.000.000.
                    Por favor, insira um valor válido.
                    """
                )
            else:
                docuras.append(docura)
        except ValueError as e:
            print(e)

    # Validação para doçura mínima desejada
    while True:
        try:
            docura_minima = int(input("Digite a doçura mínima desejada: ").strip())
            if docura_minima < 0:
                raise ValueError(
                    """
                    A doçura mínima não pode ser negativa.
                    Por favor, insira um valor válido.
                    """
                )
            elif docura_minima > 1e9:
                raise ValueError(
                    """
                    A doçura mínima não pode ser maior que 1.000.000.000.
                    Por favor, insira um valor válido.
                    """
                )
            else:
                break
        except ValueError as e:
            print(e)

    # Validação para escolha da visualização dos detalhes das operações
    while True:
        try:
            resposta = (
                input("Deseja ver detalhes das operações? (s/n): ").strip().lower()
            )
            if resposta not in ("s", "n"):
                raise ValueError(
                    """
                    Resposta inválida.
                    Por favor, responda com 's' para sim ou 'n' para não.
                    """
                )
            else:
                verboso = resposta == "s"
                break
        except ValueError as e:
            print(e)

    resultado = jesse_and_cookies(docura_minima, docuras, verboso=verboso)

    if resultado == -1:
        print("\nNão é possível atingir a doçura desejada.")
    else:
        print(f"\nNúmero mínimo de operações necessárias: {resultado}")


if __name__ == "__main__":
    carregar_dados_detalhado()
