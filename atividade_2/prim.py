import time
import heapq
from collections import defaultdict

class Prim:
    def __init__(self, grafo):
        self.grafo = self._criar_grafo(grafo.arestas if hasattr(grafo, 'arestas') else grafo)

    def agm(self, vertice_inicial=None, verbose=False):
        agm = defaultdict(list)
        heap_push, heap_pop, tempo_heap = 0, 0, 0.0

        if not self.grafo:
            return {}, 0, 0, 0, 0, 0.0

        vertice_inicial = vertice_inicial or next(iter(self.grafo))
        visitados = {vertice_inicial}
        heap = []

        total_vertices = len(self.grafo)
        aresta_analisada = 0

        # Inicializa heap com as arestas saindo do vértice inicial
        for vizinho, peso in self.grafo.get(vertice_inicial, []):
            t0 = time.perf_counter()
            heapq.heappush(heap, (peso, vertice_inicial, vizinho))
            tempo_heap += (time.perf_counter() - t0)
            heap_push += 1

        # Para assim que visitar todos os vértices (AGM completa => V-1 arestas)
        while heap and len(visitados) < total_vertices:
            peso, v1, v2 = heapq.heappop(heap)
            heap_pop += 1

            if v2 in visitados:
                continue

            # Aceita a aresta na AGM
            aresta_analisada += 1
            visitados.add(v2)
            agm[v1].append((v2, peso))
            agm[v2].append((v1, peso))

            # Adiciona novas arestas candidatas
            for vizinho, p_viz in self.grafo.get(v2, []):
                if vizinho not in visitados:
                    t0 = time.perf_counter()
                    heapq.heappush(heap, (p_viz, v2, vizinho))
                    tempo_heap += (time.perf_counter() - t0)
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
        """
        Evita duplicação quando a lista de arestas já vem duplicada (u,v) e (v,u),
        que é o caso do seu Grafo.

        Estratégia:
        - Se a entrada for a lista já duplicada, basta adicionar "uma direção" (v1->v2),
          porque o par reverso já aparece em outro item.
        - Além disso, deduplicamos por (v1, v2, p) para não repetir a mesma entrada.
        """
        g = defaultdict(list)
        seen = set()

        for v1, v2, p in arestas:
            key = (v1, v2, p)
            if key in seen:
                continue
            seen.add(key)

            # Adiciona só v1 -> v2.
            # Se a lista tiver (v2, v1, p), ela vai adicionar o reverso em outra iteração.
            g[v1].append((v2, p))

            # Garante que v2 exista como chave mesmo se não tiver saída ainda
            if v2 not in g:
                g[v2] = g[v2]

        return dict(g)