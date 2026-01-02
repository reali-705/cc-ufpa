"""
Docstring para algoritmos.resultado
"""

from dataclasses import dataclass

@dataclass
class Resultado:
    metodo: str
    comparacoes: int
    trocas: int
    tempo_ms: float
    lista_base: list[int]
    lista_ordenada: list[int]
    def __str__(self) -> str:
        return f"""
                Método: {self.metodo}
                Comparações: {self.comparacoes}
                Trocas: {self.trocas}
                Tempo (ms): {self.tempo_ms:.4f}
                Lista Base: {self.lista_base}
                Lista Ordenada: {self.lista_ordenada}
                """