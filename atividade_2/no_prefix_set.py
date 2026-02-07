"""
Docstring para atividade_2.no_prefix_set
"""


class NoTrie:
    """
    Nó da Trie para o desafio No Prefix Set.
    """
    def __init__(self):
        self.filhos: dict[str, "NoTrie"] = {}
        self.e_final: bool = False


def no_prefix_set(palavras: list[str]) -> None:
    """
    Função para resolver o desafio No Prefix Set.

    Saída esperada:
    - Se não houver prefixos, imprimir "GOOD SET".
    - Se houver prefixos, imprimir "BAD SET" seguido da primeira palavra que causa o conflito.
    """
    print("Executando o desafio No Prefix Set...")

    raiz = NoTrie()

    for palavra in palavras:
        no = raiz
        for c in palavra:
            if no.e_final:  # palavra anterior é prefixo da atual
                print("BAD SET")
                print(palavra)
                return
            if c not in no.filhos:
                no.filhos[c] = NoTrie()
            no = no.filhos[c]
        if no.filhos:  # palavra atual é prefixo de alguma palavra anterior
            print("BAD SET")
            print(palavra)
            return
        no.e_final = True

    print("GOOD SET")


def carregar_dados():
    """
    Função para carregar dados necessários para o desafio No Prefix Set.
    """
    print("Carregando dados para No Prefix Set...")

    quantidade_palavras = int(input().strip())
    palavras: list[str] = []
    for _ in range(quantidade_palavras):
        palavra = input().strip()
        palavras.append(palavra)

    # Outra forma de carregar a lista de palavras:
    # palavras = [input().strip() for _ in range(int(input().strip()))]

    no_prefix_set(palavras)


if __name__ == "__main__":
    carregar_dados()
