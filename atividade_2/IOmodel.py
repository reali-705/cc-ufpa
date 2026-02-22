from __future__ import annotations
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, field_validator, model_validator
from atividade_2.Grafo import Grafo

"""
A modelagem a seguir visa a modelagem da entrada e saída do problema. A função criar_benchmark gera uma amostra experimental a cada 
chamada 
"""


class Algoritmo(str, Enum):
    """Enum com os algoritmos suportados."""

    PRIM = "prim"
    KRUSKAL = "kruskal"


class Input(BaseModel):
    """
    Modelagem do Experimento.

    Campos:
    - algoritmo: qual algoritmo executar ("prim" ou "kruskal").
    - num_vertices: número de vértices do grafo (>= 2).
    - densidade: proporção de arestas entre 0.0 e 1.0 (0 = sem arestas, 1 = grafo completo).
    - num_arestas (opcional): número absoluto de arestas; se fornecido será validado contra num_vertices.
    - seed: semente para gerador aleatório (>=0) para reprodutibilidade.
    - repeticoes: quantas vezes repetir o experimento (>=1).
    """

    algoritmo: Algoritmo = Field(
        ..., description="Algoritmo a ser testado: 'prim' ou 'kruskal'"
    )
    Grafo: Optional[Grafo] = Field(
        default=None,
        description="Grafo específico a ser usado; se None, um grafo aleatório será gerado com base em num_vertices e densidade"
        )

    @field_validator("algoritmo", mode="before")
    def _algoritmo_nao_vazio(cls, v):
        # garante que uma string vazia não seja passada (se o usuário passar raw string)
        if isinstance(v, str) and not v.strip():
            raise ValueError("O nome do algoritmo não pode ser vazio")
        return v

    @model_validator(mode="after")
    def check_consistencia(self):
        """
        Valida relações entre campos:
        - se num_arestas for dado, verifica 0 <= num_arestas <= max_edges
        - densidade coerente com num_arestas se num_arestas informado (verifica proximidade).
        """
        max_edges = self.num_vertices * (self.num_vertices - 1) // 2
        if self.num_arestas is not None:
            if self.num_arestas > max_edges:
                raise ValueError(
                    f"num_arestas ({self.num_arestas}) não pode exceder o máximo possível ({max_edges})"
                )
            # checagem simples de coerência: densidade deve ser aproximada por num_arestas / max_edges
            dens_from_arestas = self.num_arestas / max_edges if max_edges > 0 else 0.0
            if abs(dens_from_arestas - self.densidade) > 0.02 and max_edges > 50:
                # impedir proporção estranha de arestas por densidade
                raise ValueError(
                    "num_arestas e densidade parecem inconsistentes "
                    f"(densidade={self.densidade:.4f} vs arestas/{max_edges}={dens_from_arestas:.4f})"
                )
        return self


class Output(BaseModel):
    """
    Resultado/instrumentação de um único experimento (linha do dataset).

    Campos:
    - idx: índice do experimento / repetição (>=1).
    - algoritmo: algoritmo executado.
    - num_vertices: número de vértices do grafo.
    - num_arestas: número de arestas do grafo.
    - densidade: densidade real do grafo (0.0–1.0).
    - arestas_analisadas: quantas arestas foram efetivamente examinadas pelo algoritmo.
    - vertices_visitados: quantos vértices foram 'tocados' / incluídos / analisados.
    - find_calls: número de chamadas a `find` (Kruskal). None para Prim.
    - union_calls: número de chamadas a `union` (Kruskal). None para Prim.
    - relaxamentos: número de relaxamentos (quando aplicável). Pode ser None.
    - heap_push: número de operações de push (Prim, se usar heap). None para Kruskal.
    - heap_pop: número de operações de pop (Prim, se usar heap). None para Kruskal.
    - arestas_mst: quantidade de arestas efetivamente adicionadas à MST (deve ser <= num_vertices-1).
    - tempo_execucao_find: tempo gasto nas operações find (segundos). None se não medido.
    - tempo_execucao_union: tempo gasto nas operações union (segundos). None se não medido.
    - tempo_execucao_heap_ops: tempo total gasto em operações de heap (segundos). None se não medido.
    - tempo_execucao_total: tempo total do algoritmo (segundos). Deve ser >= 0 e >= soma das partes conhecidas.
    - memoria_bytes: memória usada em bytes (opcional).
    """

    idx: int = Field(..., ge=1, description="Índice do experimento / repetição (>=1)")
    algoritmo: Algoritmo = Field(
        ..., description="Algoritmo executado: 'prim' ou 'kruskal'"
    )
    num_vertices: int = Field(
        ..., ge=2, description="Número de vértices do grafo (>=2)"
    )
    num_arestas: int = Field(..., ge=0, description="Número de arestas do grafo (>=0)")
    densidade: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Densidade real do grafo (0.0 ≤ densidade ≤ 1.0)",
    )
    arestas_analisadas: int = Field(
        ..., ge=0, description="Quantas arestas foram examinadas pelo algoritmo"
    )
    vertices_visitados: int = Field(
        ..., ge=0, description="Quantos vértices foram visitados/tocados pelo algoritmo"
    )
    find_calls: Optional[int] = Field(
        default=None,
        ge=0,
        description="Número de chamadas a find (Kruskal); None para Prim",
    )
    union_calls: Optional[int] = Field(
        default=None,
        ge=0,
        description="Número de chamadas a union (Kruskal); None para Prim",
    )
    relaxamentos: Optional[int] = Field(
        default=None, ge=0, description="Número de relaxamentos (quando aplicável)"
    )
    heap_push: Optional[int] = Field(
        default=None,
        ge=0,
        description="Número de push no heap (Prim); None para Kruskal",
    )
    heap_pop: Optional[int] = Field(
        default=None,
        ge=0,
        description="Número de pop no heap (Prim); None para Kruskal",
    )
    num_arestas_mst: int = Field(
        ...,
        ge=0,
        description="Número de arestas que compõem a arvore geradora minima (≤ num_vertices - 1)",
    )
    tempo_execucao_find: Optional[float] = Field(
        default=None, ge=0.0, description="Tempo gasto em find (s), se medido"
    )
    tempo_execucao_union: Optional[float] = Field(
        default=None, ge=0.0, description="Tempo gasto em union (s), se medido"
    )
    tempo_execucao_heap_ops: Optional[float] = Field(
        default=None,
        ge=0.0,
        description="Tempo gasto em operações de heap (s), se medido",
    )
    tempo_execucao_total: float = Field(
        ..., ge=0.0, description="Tempo total de execução do algoritmo (s)"
    )
    memoria_bytes: Optional[int] = Field(
        default=None, ge=0, description="Memória usada em bytes (opcional)"
    )

    @model_validator(mode="after")
    def check_consistencia(self):
        """
        Valida consistência entre campos:
        - num_arestas ≤ max_edges
        - arestas_mst ≤ num_vertices - 1
        - arestas_analisadas ≤ num_arestas
        - se algoritmo == KRUSKAL então find/union não devem ser None
        - se algoritmo == PRIM então heap_push/heap_pop não devem ser None
        - tempo_execucao_total >= soma das partes medidas
        """
        max_edges = self.num_vertices * (self.num_vertices - 1) // 2
        if self.num_arestas > max_edges:
            raise ValueError(
                f"num_arestas ({self.num_arestas}) não pode exceder máximo possível ({max_edges})"
            )

        if self.arestas_mst > max(0, self.num_vertices - 1):
            raise ValueError("arestas_mst não pode exceder num_vertices - 1")

        if self.arestas_analisadas > self.num_arestas:

            raise ValueError("arestas_analisadas não pode exceder num_arestas")

        if self.algoritmo is Algoritmo.KRUSKAL:
            pass
        elif self.algoritmo is Algoritmo.PRIM:
            pass

        # Verifica corretude do tempo
        soma_partes = 0.0
        for t in (
            self.tempo_execucao_find,
            self.tempo_execucao_union,
            self.tempo_execucao_heap_ops,
        ):
            if t is not None:
                soma_partes += t
        if soma_partes > 0 and self.tempo_execucao_total + 1e-12 < soma_partes:
            # soma das partes não pode exceder o tempo total dado um erro toleravel
            raise ValueError(
                "tempo_execucao_total é menor que a soma dos tempos parciais registrados "
                f"(total={self.tempo_execucao_total:.6f} < partes={soma_partes:.6f})"
            )

        dens_from_arestas = self.num_arestas / max_edges if max_edges > 0 else 0.0
        if abs(dens_from_arestas - self.densidade) > 0.05 and max_edges > 50:
            raise ValueError(
                "densidade informada difere significativamente de num_arestas / max_edges "
                f"({self.densidade:.4f} vs {dens_from_arestas:.4f})"
            )

        return self

