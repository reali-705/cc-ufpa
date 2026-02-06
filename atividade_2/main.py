"""
Docstring para atividade_2.main
"""

import atividade_2.jesse_and_cook as jesse_and_cook
import atividade_2.no_prefix_set as no_prefix_set


def main():
    """
    Função principal para execução dos desafios de algoritmos da atividade 2.
    """
    print("Desafios de Algoritmos - Atividade 2")

    print("1. Jesse and Cookies")
    jesse_and_cook.carregar_dados()

    print("2. No Prefix Set")
    no_prefix_set.carregar_dados()


if __name__ == "__main__":
    main()
