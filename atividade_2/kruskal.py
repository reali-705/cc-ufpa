import time


def quicksort(array: list[list]) -> list[list]:
    # adaptado para trabalhar com listas de listas
    if len(array) <= 1:
        return array
    else:
        pivot_list = array[-1]
        pivot_weight = pivot_list[2]
        left = [x for x in array[:-1] if x[2] < pivot_weight]
        equal = [x for x in array if x[2] == pivot_weight]
        right = [x for x in array[:-1] if x[2] > pivot_weight]

        return quicksort(left) + equal + quicksort(right)


def kruskal(
    grafo: list[tuple[str, str, int]],
) -> tuple[list[tuple[str, str, int]], int, int, int, float, int, float]:
    """_summary_

    Args:
        grafo (list[tuple[str, str, int]]): _description_

    Returns:
        tuple[list[tuple[str, str, int]], int, int, int, float, int, float]: _description_
    """
    # variaveis necessarias para analise ou resultado
    start_time = time.perf_counter()
    solucao: list[tuple[str, str, int]] = []
    vertices = set()
    arestas_analisadas, union_count, find_count, mst_arestas = 0, 0, 0, 0
    tempo_execucao_set_ops = 0.0

    # faz um conjunto com todas os vertices unicas depois cria varios subconjuntos para cada vertice
    for u, v, w in grafo:
        tempo_inicial_set_ops = time.perf_counter()
        vertices.update([u, v])
        tempo_final_set_ops = time.perf_counter()
        tempo_execucao_set_ops += tempo_final_set_ops - tempo_inicial_set_ops

    grupo = [{v} for v in vertices]
    sorted_arestas = quicksort(grafo)
    print("arestas organizadas", sorted_arestas)
    # itera da menor aresta a maior aresta
    print("\n")
    for u, v, p in sorted_arestas:
        arestas_analisadas += 1
        for g in grupo:
            if u in g:
                grupo_u = g
            if v in g:
                grupo_v = g
        find_count += 2
        if grupo_u != grupo_v:
            solucao.append((u, v, p))

            # faz a união do conjunto depois remove o item solto
            tempo_inicial_set_ops = time.perf_counter()
            grupo_u.update(grupo_v)
            grupo.remove(grupo_v)
            tempo_final_set_ops = time.perf_counter()
            tempo_execucao_set_ops += tempo_final_set_ops - tempo_inicial_set_ops

            print("estado do conjunto na iteração :", arestas_analisadas, "\n", grupo)
            union_count += 1
            mst_arestas += 1

        # ele vai continuar analisando todas as arestas sem isso, remova se isso for relevante para a analise
        if len(grupo) == 1:
            break

    end_time = time.perf_counter()
    tempo_execucao_total = end_time - start_time
    if len(solucao) == len(vertices) - 1:
        return (
            solucao,
            arestas_analisadas,
            find_count,
            union_count,
            tempo_execucao_set_ops,
            mst_arestas,
            tempo_execucao_total,
        )
    else:
        print("a solução não é uma agm")


print(
    kruskal(
        [
            ("A", "B", 7),
            ("A", "D", 5),
            ("B", "C", 8),
            ("B", "D", 9),
            ("B", "E", 7),
            ("C", "E", 555),
            ("D", "E", 0),
            ("D", "F", 6),
            ("E", "F", 8),
            ("E", "G", 9),
            ("F", "G", 111),
        ]
    )
)
