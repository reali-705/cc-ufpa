"""
Módulo de utilidades para atividades de Matemática Computacional.
Suporta visualização estática e animações dinâmicas (estilo GIF).
"""

import numpy as np

# ==============================================================================
# FUNÇÕES DE FORMATAÇÃO (LaTeX)
# ==============================================================================


def vetor_para_latex(nome: str, vetor: np.ndarray) -> str:
    """Converte um vetor para representação LaTeX (coluna)."""
    vetor_str = " \\\\ ".join(map(lambda x: f"{x:g}", vetor))
    return f"$\\vec{{{nome}}}$ = $\\begin{{bmatrix}} {vetor_str} \\end{{bmatrix}}$"


def matriz_para_latex(nome: str, matriz: np.ndarray) -> str:
    """Converte uma matriz para representação LaTeX."""
    matriz_str = "\\\\".join(
        " & ".join(map(lambda x: f"{x:g}", linha)) for linha in matriz
    )
    return f"${nome}$ = $\\begin{{bmatrix}} {matriz_str} \\end{{bmatrix}}$"

# ==============================================================================