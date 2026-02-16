"""
Módulo para executar a implementação do algoritmo Shift-And Aproximado.
"""

import util
from shift_and_aproximado import buscar


def main():
    """
    Função principal do módulo main.
    """
    while True:
        tipo_texto = util.menu_principal()
        match tipo_texto:
            case 0:
                print("Saindo do programa...")
                return
            case 1:
                texto = util.gerar_texto_aleatorio(util.escolher_tamanho_texto())
            case 2:
                texto = util.gerar_texto_com_padrao(
                    util.escolher_tamanho_texto(),
                    input("Digite o padrão a ser inserido no texto: "),
                )
            case _:
                print("Opção inválida. Por favor, tente novamente.")
                continue

        print(f"Texto gerado:\n{texto}\n")

        k = util.escolher_k()
        padrao = input("Digite o padrão de busca: ")

        # Buscar o padrão no texto usando o algoritmo Shift-And Aproximado
        resultados = buscar(texto, padrao, k)
        if resultados:
            print(f"Padrão encontrado nas posições: {resultados}")
        else:
            print("Padrão não encontrado no texto.")


if __name__ == "__main__":
    main()
