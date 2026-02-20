"""
Módulo para executar a implementação do algoritmo Shift-And Aproximado.
"""

import time
import util
from shift_and_aproximado import buscar


def main():
    """
    Função principal do módulo main.
    """
    while True:
        print("\n=== Algoritmo Shift-And Aproximado ===\n")

        tipo_texto = util.menu_principal()
        tamanho_texto = util.escolher_tamanho_texto()

        if tamanho_texto == 0:
            print("\nSaindo do programa...\n")
            return

        match tipo_texto:
            case 0:
                print("\nSaindo do programa...\n")
                return
            case 1:
                texto = util.gerar_texto_aleatorio(tamanho_texto)
            case 2:
                texto = util.gerar_texto_com_padrao(
                    tamanho_texto,
                    input("\nDigite o padrão a ser inserido no texto: "),
                )
            case _:
                print("\nOpção inválida. Por favor, tente novamente.\n")
                continue

        while True:
            print(f"\nTexto gerado:\n{texto}\n")

            k = util.escolher_k()
            padrao = input("\nDigite o padrão de busca: ")

            diferenciar = (
                input("\nDeseja diferenciar maiúsculas de minúsculas? (s/n): ")
                .strip()
                .lower()
            )
            if diferenciar not in ["s", "sim"]:
                padrao = padrao.lower()
                texto = texto.lower()

            # Buscar o padrão no texto usando o algoritmo Shift-And Aproximado
            tempo_inicial = time.perf_counter()
            resultados = buscar(texto, padrao, k)
            tempo_final = time.perf_counter()

            util.visualizar_resultados(
                resultados, texto, padrao, tempo_final - tempo_inicial
            )

            repetir = (
                input("\nDeseja realizar outra busca no mesmo texto? (s/n): ")
                .strip()
                .lower()
            )
            if repetir not in ["s", "sim"]:
                break


if __name__ == "__main__":
    main()
