from __future__ import annotations
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, model_validator, ConfigDict
from atividade_2.Grafo import Grafo


class Algoritmo(str, Enum):
    """Enum com os algoritmos suportados."""
    PRIM = "prim"
    KRUSKAL = "kruskal"


class Input(BaseModel):
    """Modelagem do Experimento."""
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        validate_assignment=True
    )

    algoritmo: Algoritmo = Field(..., description="Algoritmo a ser testado: 'prim' ou 'kruskal'")
    grafo: Optional[Grafo] = Field(default=None, description="Grafo específico a ser usado")
    num_vertices: Optional[int] = Field(default=None, description="Número de vértices do grafo")
    densidade: Optional[float] = Field(default=None, description="Densidade do grafo")


class Output(BaseModel):
    """Resultado/instrumentação de um único experimento."""
    

    model_config = ConfigDict(validate_assignment=True)

    idx: int = Field(default=1, ge=1)
    algoritmo: Algoritmo = Field(default=Algoritmo.PRIM)

    num_vertices: int = Field(default=0, ge=0)
    num_arestas: int = Field(default=0, ge=0)
    densidade: float = Field(default=0.0, ge=0.0, le=1.0)

    arestas_analisadas: int = Field(default=0, ge=0)

    # ---------- KRUSKAL ----------
    find_calls: Optional[int] = Field(default=0, ge=0)
    union_calls: Optional[int] = Field(default=0, ge=0)
    tempo_execucao_find: Optional[float] = Field(default=0.0, ge=0.0)
    tempo_execucao_union: Optional[float] = Field(default=0.0, ge=0.0)
    tempo_sort: Optional[float] = Field(default=0.0, ge=0.0)

    # ---------- PRIM ----------
    heap_push: Optional[int] = Field(default=0, ge=0)
    heap_pop: Optional[int] = Field(default=0, ge=0)
    tempo_execucao_heap_ops: Optional[float] = Field(default=0.0, ge=0.0)

    # ---------- RESULTADO ----------
    num_arestas_mst: int = Field(default=0, ge=0)
    tempo_execucao_total: float = Field(default=0.0, ge=0.0)

    @model_validator(mode="after")
    def check_consistencia(self) -> Output:
        # Se ainda não temos vértices (objeto em inicialização), pula a validação pesada
        if self.num_vertices < 2:
            return self

        max_edges = self.num_vertices * (self.num_vertices - 1) // 2

        # Validação da estrutura do grafo
        if self.num_arestas > max_edges:
            raise ValueError(f"num_arestas ({self.num_arestas}) excede máximo ({max_edges})")

        if self.num_arestas_mst > max_edges: # Ajustado para ser lógico
            raise ValueError("num_arestas_mst inconsistente")

        if self.arestas_analisadas > self.num_arestas:
            raise ValueError(f"arestas_analisadas ({self.arestas_analisadas}) > num_arestas ({self.num_arestas})")

        # Validação específica por algoritmo
        if self.algoritmo == Algoritmo.KRUSKAL:
            if self.find_calls is None:
                raise ValueError("Kruskal exige métrica find_calls")

        if self.algoritmo == Algoritmo.PRIM:
            if self.heap_push is None:
                raise ValueError("Prim exige métrica heap_push")

        return self