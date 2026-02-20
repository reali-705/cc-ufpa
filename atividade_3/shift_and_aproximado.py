"""
Módulo para a implementação do algoritmo Shift-And Aproximado.
"""


def preprocessar_chave(chave: str) -> dict[str, int]:
    """
    Preprocessa a chave para criar uma máscara de bits.

    Args:
        chave (str): A chave a ser preprocessada.

    Returns:
        dict[str, int]:
            Um dicionário onde as chaves são os caracteres da chave
            e os valores são as máscaras de bits correspondentes.
    """
    mascara: dict[str, int] = {}
    for i, char in enumerate(chave):
        mascara[char] = mascara.get(char, 0) | (1 << i)
    return mascara


def buscar(texto: str, chave: str, k: int = 0) -> list[int]:
    """
    Busca por ocorrências aproximadas da chave no texto.

    Args:
        texto (str): O texto onde a busca será realizada.
        chave (str): A chave a ser buscado.
        k (int): O número máximo de erros permitidos.

    Returns:
        list[int]: Uma lista de índices onde o chave foi encontrado com até k erros.
    """
    # Cria uma lista para armazenar os resultados das posições onde a chave foi encontrada
    resultados: list[int] = []

    # O bit de sucesso é o bit mais à esquerda, que indica que a chave foi encontrada
    bit_sucesso = 1 << (len(chave) - 1)

    # Preprocessa a chave para criar a máscara de bits
    mascara = preprocessar_chave(chave)

    # Verificador de bits com 0, indicando que nenhum caractere da chave foi encontrado ainda
    verificadores = [0] * (k + 1)

    for i, letra in enumerate(texto):
        # Guarda o estado dos verificadores antes de atualizá-los,
        # pois eles dependem do estado anterior
        verificadores_antes = verificadores.copy()

        # Itera sobre os possíveis números de erros (de 0 a k)
        for j in range(k + 1):
            # Verifica se a letra bate e avança o bit do estado anterior
            exato = ((verificadores_antes[j] << 1) | 1) & mascara.get(letra, 0)

            if j == 0:
                # Se for busca exata (k=0), só existe o componente match
                verificadores[j] = exato
                continue

            # Assume erro na letra atual, pega o estado anterior de j-1 e avança o bit
            substituicao = (verificadores_antes[j - 1] << 1) | 1

            # Assume letra extra no texto. Mantém o estado j-1 parado (não avança bit)
            insercao = verificadores_antes[j - 1] | 1

            # Assume letra faltando no texto. Pega o resultado JÁ CALCULADO de j-1 (atual)
            # e avança o bit artificialmente.
            remocao = verificadores[j - 1] << 1 | 1

            # Combina os resultados dos 4 cenários possíveis:
            # match, substituição, inserção e remoção
            verificadores[j] = exato | substituicao | insercao | remocao

        if (verificadores[k] & bit_sucesso) != 0:
            resultados.append(i)

    return resultados


if __name__ == "__main__":
    # Usado para testes rápidos durante o desenvolvimento.
    # Pode ser removido ou comentado posteriormente.
    TEXTO_TESTE = "anna nasceu ao anoitecer"
    CHAVE_TESTE = "ana"

    print(
        "\n".join(
            f"{chave}: {valor:0{len(CHAVE_TESTE)}b}"
            for chave, valor in preprocessar_chave(CHAVE_TESTE).items()
        )
    )

    print(
        f"Chave encontrada nas posicoes: {', '.join(map(str, buscar(TEXTO_TESTE, CHAVE_TESTE, 1)))}"
    )
