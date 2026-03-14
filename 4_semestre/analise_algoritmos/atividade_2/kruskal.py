import time

class Kruskal:
    def _find(self, parent, x):
        """Find iterativo com path compression (menos overhead que recursão)."""
        root = x
        while parent[root] != root:
            root = parent[root]
        # compressão de caminho
        while parent[x] != x:
            px = parent[x]
            parent[x] = root
            x = px
        return root

    def _dedup_arestas_undirected(self, arestas):
        """
        Remove duplicatas (u,v) e (v,u) em grafo não-direcionado.
        Mantém a menor aresta por par (u,v) se houver repetidas.
        """
        best = {}
        for u, v, w in arestas:
            if u == v:
                continue
            a, b = (u, v) if u < v else (v, u)
            key = (a, b)
            if key not in best or w < best[key]:
                best[key] = w
        return [(a, b, w) for (a, b), w in best.items()]

    def agm(self, arestas, verbose=False):
        start_time = time.perf_counter()

        # 1) Deduplicar para não ordenar/iterar (u,v) e (v,u)
        arestas_reais = self._dedup_arestas_undirected(arestas)

        # 2) Sort (continua sendo o gargalo típico)
        t_ini_sort = time.perf_counter()
        sorted_arestas = sorted(arestas_reais, key=lambda x: x[2])
        t_sort = time.perf_counter() - t_ini_sort

        # 3) Vértices (em cima das arestas reais)
        vertices = set()
        for u, v, _ in sorted_arestas:
            vertices.add(u)
            vertices.add(v)

        # Caso degenerado
        if not vertices:
            t_total = time.perf_counter() - start_time
            return [], t_total, 0, 0, 0, 0, 0, t_sort

        parent = {v: v for v in vertices}
        rank = {v: 0 for v in vertices}

        solucao = []
        a_analisadas = 0
        unions = 0
        finds = 0
        mst_count = 0
        alvo = len(vertices) - 1

        # Otimização: referências locais (menos overhead)
        find = self._find
        parent_get = parent.__getitem__
        rank_get = rank.__getitem__

        for u, v, peso in sorted_arestas:
            a_analisadas += 1

            # Mesmo modelo de contagem: 2 finds por aresta analisada
            finds += 2

            ru = find(parent, u)
            rv = find(parent, v)

            if ru == rv:
                continue

            solucao.append((u, v, peso))

            # Union by rank (mantido)
            rru = rank_get(ru)
            rrv = rank_get(rv)
            if rru < rrv:
                parent[ru] = rv
            elif rrv < rru:
                parent[rv] = ru
            else:
                parent[rv] = ru
                rank[ru] = rru + 1

            unions += 1
            mst_count += 1

            if mst_count == alvo:
                break

        t_total = time.perf_counter() - start_time
        peso_min = sum(p for (_, _, p) in solucao)
        return solucao, t_total, a_analisadas, unions, finds, mst_count, peso_min, t_sort

    def kruskal(self, arestas, verbose=False):
        t_ini = time.perf_counter()
        sol, t_exec, a_ana, uni, fnd, m_cnt, p_min, t_srt = self.agm(arestas, verbose)
        t_total = time.perf_counter() - t_ini

        return (a_ana, m_cnt, uni, fnd, p_min, t_exec, t_total, t_srt)