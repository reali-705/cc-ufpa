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
) -> tuple[list[tuple[str, str, int]], float, int, int, int, int, int]:
    """_summary_

    Args:
        grafo (list[tuple[str, str, int]]): _description_

    Returns:
        tuple[list[tuple[str, str, int]], float, int, int, int, int, int]: _description_
    """
    # variaveis necessarias para analise ou resultado
    start_time = time.perf_counter()
    solucao = []
    vertices = set()
    analisadas, union_count, find_count, mst_arestas = 0, 0, 0, 0

    # faz um conjunto com todas os vertices unicas depois cria varios subconjuntos para cada vertice
    for u, v, w in grafo:
        vertices.update([u, v])
    grupo = [{v} for v in vertices]
    sorted_vertices = quicksort(grafo)
    print("arestas organizadas", sorted_vertices)
    # itera da menor aresta a maior aresta
    print("\n")
    for u, v, p in sorted_vertices:
        analisadas += 1
        for g in grupo:
            if u in g:
                grupo_u = g
            if v in g:
                grupo_v = g
        find_count += 2
        if grupo_u != grupo_v:
            solucao.append([u, v, p])

            # faz a união do conjunto depois remove o item solto
            grupo_u.update(grupo_v)
            grupo.remove(grupo_v)
            print("estado do conjunto na iteração :", analisadas, "\n", grupo)
            union_count += 1
            mst_arestas += 1

        # ele vai continuar analisando todas as arestas sem isso, remova se isso for relevante para a analise
        if len(grupo) == 1:
            break

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    peso_minimo = sum(map(lambda x: x[2], solucao))
    if len(solucao) == len(vertices) - 1:
        return (
            solucao,
            elapsed_time,
            analisadas,
            union_count,
            find_count,
            mst_arestas,
            peso_minimo,
        )
    else:
        print("a solução não é uma agm")


print(
    kruskal(
        [
            ["A", "B", 7],
            ["A", "D", 5],
            ["B", "C", 8],
            ["B", "D", 9],
            ["B", "E", 7],
            ["C", "E", 555],
            ["D", "E", 0],
            ["D", "F", 6],
            ["E", "F", 8],
            ["E", "G", 9],
            ["F", "G", 111],
        ]
    )
)
