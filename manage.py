"""
Runner para os mains das atividades.
"""

from __future__ import annotations

import argparse
import runpy
from pathlib import Path


ROTAS = Path(__file__).resolve().parent
ARGS = {
    "atividade_1": ROTAS / "atividade_1" / "main.py",
    "atividade_2": ROTAS / "atividade_2" / "main.py",
}


def main() -> int:
    """Executa o main.py da atividade selecionada via linha de comando."""
    parser = argparse.ArgumentParser(
        prog="manage.py",
        description="Executa o main.py de cada atividade.",
    )
    parser.add_argument(
        "atividade",
        choices=sorted(ARGS.keys()),
        help="Nome da atividade para executar.",
    )

    args = parser.parse_args()
    main_path = ARGS[args.atividade]

    runpy.run_path(str(main_path), run_name="__main__")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
