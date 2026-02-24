import time
import heapq
from collections import defaultdict
from typing import Tuple # Apenas Tuple com T maiúsculo, se necessário

class Prim:
    def __init__(self, grafo):
        self.grafo = self._criar_grafo(grafo.arestas if hasattr(grafo, 'arestas') else grafo)

    def agm(self, vertice_inicial=None, verbose=False):
        agm = defaultdict(list)
        heap_push, heap_pop, tempo_heap = 0, 0, 0.0
        vertice_inicial = vertice_inicial or next(iter(self.grafo))
        visitados = {vertice_inicial}
        heap = []

        for vizinho, peso in self.grafo[vertice_inicial]:
            t_ini = time.perf_counter()
            heapq.heappush(heap, (peso, vertice_inicial, vizinho))
            tempo_heap += time.perf_counter() - t_ini
            heap_push += 1

        aresta_analisada = 0
        while heap:
            peso, v1, v2 = heapq.heappop(heap)
            heap_pop += 1
            if v2 not in visitados:
                aresta_analisada += 1
                visitados.add(v2)
                agm[v1].append((v2, peso))
                agm[v2].append((v1, peso))
                for vizinho, p_viz in self.grafo[v2]:
                    if vizinho not in visitados:
                        t_ini = time.perf_counter()
                        heapq.heappush(heap, (p_viz, v2, vizinho))
                        tempo_heap += time.perf_counter() - t_ini
                        heap_push += 1
        return dict(agm), heap_push, heap_pop, len(visitados), aresta_analisada, tempo_heap

    def prim(self, arestas, verbose=False):
        self.grafo = self._criar_grafo(arestas)
        t_ini = time.perf_counter()
        agm_dict, h_push, h_pop, v_vis, a_ana, t_heap = self.agm(verbose=verbose)
        
        qtd_mst = sum(len(v) for v in agm_dict.values()) // 2
        t_total = time.perf_counter() - t_ini
        
        return (agm_dict, 0, h_push, h_pop, t_heap, qtd_mst, t_total, a_ana)

    def _criar_grafo(self, arestas):
        g = defaultdict(list)
        for v1, v2, p in arestas:
            g[v1].append((v2, p))
            g[v2].append((v1, p))
        return dict(g)