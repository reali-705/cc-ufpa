import time
from typing import List, Tuple

class Kruskal:
    def _find(self, parent, x):
        if parent[x] != x:
            parent[x] = self._find(parent, parent[x])
        return parent[x]

    def agm(self, arestas, verbose=False):
        start_time = time.perf_counter()
        t_ini_sort = time.perf_counter()
        sorted_arestas = sorted(arestas, key=lambda x: x[2])
        t_sort = time.perf_counter() - t_ini_sort

        vertices = set()
        for u, v, _ in sorted_arestas:
            vertices.add(u); vertices.add(v)
        
        parent = {v: v for v in vertices}
        rank = {v: 0 for v in vertices}
        solucao, a_analisadas, unions, finds, mst_count = [], 0, 0, 0, 0

        for u, v, peso in sorted_arestas:
            a_analisadas += 1
            finds += 2
            ru, rv = self._find(parent, u), self._find(parent, v)
            if ru != rv:
                solucao.append((u, v, peso))
                if rank[ru] < rank[rv]: parent[ru] = rv
                elif rank[rv] < rank[ru]: parent[rv] = ru
                else: parent[rv] = ru; rank[ru] += 1
                unions += 1; mst_count += 1
                if mst_count == len(vertices) - 1: break

        t_total = time.perf_counter() - start_time
        peso_min = sum(p for (_, _, p) in solucao)
        return solucao, t_total, a_analisadas, unions, finds, mst_count, peso_min, t_sort

    def kruskal(self, arestas, verbose=False):
        t_ini = time.perf_counter()
        sol, t_exec, a_ana, uni, fnd, m_cnt, p_min, t_srt = self.agm(arestas, verbose)
        t_total = time.perf_counter() - t_ini
        
        # Retorno sincronizado (8 posições)
        return (a_ana, m_cnt, uni, fnd, p_min, t_exec, t_total, t_srt)