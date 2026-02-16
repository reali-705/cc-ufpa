"""
Implementação de Heap Sort para ordenação de listas.

Heap Sort é um algoritmo de ordenação baseado em heap (árvore binária completa).
Utiliza a estrutura de max-heap para ordenar em ordem crescente.

Complexidade:
- Tempo: O(n log n) em todos os casos (melhor, médio e pior)
- Espaço: O(1) - ordenação in-place

Vantagens:
- Complexidade garantida O(n log n)
- Ordenação in-place (não precisa memória adicional)
- Não é sensível à entrada (sempre O(n log n))

Desvantagens:
- Não é estável (elementos iguais podem mudar de posição)
- Constantes maiores que Quick Sort
- Cache-unfriendly (acesso não sequencial à memória)
"""

import time

from algoritmos.resultado import Resultado

class HeapSort:
    """Implementa Heap Sort com abordagens iterativa e recursiva."""
    
    def ordem_iterativa(self, lista: list[int]) -> Resultado:
        """
        Heap Sort usando heapify iterativo (bottom-up).
        
        Algoritmo:
        1. Constrói max-heap (maior elemento na raiz)
        2. Extrai raiz e reconstrói heap até ordenar
        
        Complexidade: O(n log n) tempo, O(1) espaço.
        """
        if not lista:
            return Resultado(
                metodo='heap_sort_iterativa',
                comparacoes=0,
                trocas=0,
                tempo_ms=0.0,
                lista_base=[],
                lista_ordenada=[],
            )
        lista_copia = lista.copy()
        comparacoes = 0
        trocas = 0
        n = len(lista_copia)

        ultimo_no_nao_folha = n // 2 - 1

        tempo_inicial = time.perf_counter()

        # criação do heap
        for i in range(ultimo_no_nao_folha, -1, -1):
            comparacoes_iterativas, trocas_iterativas = self._heapify_iterativo(lista_copia, n, i)
            comparacoes += comparacoes_iterativas
            trocas += trocas_iterativas

        # Extrai elementos do heap e ordena
        for i in range(n - 1, 0, -1):
            # Troca raiz com último elemento
            lista_copia[0], lista_copia[i] = lista_copia[i], lista_copia[0]
            trocas += 1
            
            # Reconstrói heap
            comparacoes_iterativas, trocas_iterativas = self._heapify_iterativo(lista_copia, i, 0)
            comparacoes += comparacoes_iterativas
            trocas += trocas_iterativas

        tempo_final = time.perf_counter()

        return Resultado(
            metodo='heap_sort_iterativa',
            comparacoes=comparacoes,
            trocas=trocas,
            tempo_ms=(tempo_final - tempo_inicial) * 1000,
            lista_base=lista,
            lista_ordenada=lista_copia,
        )

    def ordem_recursiva(self, lista: list[int]) -> Resultado:
        """
        Heap Sort usando heapify recursivo (top-down).
        
        Algoritmo:
        1. Constrói max-heap recursivamente
        2. Extrai raiz e reconstrói heap até ordenar
        
        Complexidade: O(n log n) tempo, O(log n) espaço (pilha).
        """
        if not lista:
            return Resultado(
                metodo='heap_sort_recursiva',
                comparacoes=0,
                trocas=0,
                tempo_ms=0.0,
                lista_base=[],
                lista_ordenada=[],
            )
        
        lista_copia = lista.copy()
        comparacoes = 0
        trocas = 0
        n = len(lista_copia)

        ultimo_no_nao_folha = n // 2 - 1

        tempo_inicial = time.perf_counter()

        # Constrói o heap
        for i in range(ultimo_no_nao_folha, -1, -1):
            comparacoes_recursivas, trocas_recursivas = self._heapify_recursivo(lista_copia, n, i)
            comparacoes += comparacoes_recursivas
            trocas += trocas_recursivas
        
        # Extrai elementos do heap e ordena
        for i in range(n - 1, 0, -1):
            # Troca raiz com último elemento
            lista_copia[0], lista_copia[i] = lista_copia[i], lista_copia[0]
            trocas += 1

            # Reconstrói heap
            comparacoes_recursivas, trocas_recursivas = self._heapify_recursivo(lista_copia, i, 0)
            comparacoes += comparacoes_recursivas
            trocas += trocas_recursivas

        tempo_final = time.perf_counter()

        return Resultado(
            metodo='heap_sort_recursiva',
            comparacoes=comparacoes,
            trocas=trocas,
            tempo_ms=(tempo_final - tempo_inicial) * 1000,
            lista_base=lista,
            lista_ordenada=lista_copia,
        )
    
    def _heapify_iterativo(self, lista: list[int], tamanho_heap: int, indice_raiz: int) -> tuple[int, int]:
        """
        Ajusta heap iterativamente garantindo propriedade de max-heap.
        
        Propriedade max-heap: pai >= filhos
        Percorre de cima pra baixo até encontrar posição correta.
        
        Returns:
            (comparacoes, trocas)
        """
        comparacoes = 0
        trocas = 0

        while True:
            maior_valor = indice_raiz
            filho_esquerda = 2 * indice_raiz + 1
            filho_direita = 2 * indice_raiz + 2

            if filho_esquerda < tamanho_heap:
                comparacoes += 1
                if lista[filho_esquerda] > lista[maior_valor]:
                    maior_valor = filho_esquerda

            if filho_direita < tamanho_heap:
                comparacoes += 1
                if lista[filho_direita] > lista[maior_valor]:
                    maior_valor = filho_direita

            # Se raiz não é o maior, troca
            if maior_valor != indice_raiz:
                trocas += 1
                lista[indice_raiz], lista[maior_valor] = lista[maior_valor], lista[indice_raiz]
                indice_raiz = maior_valor
            else:
                break
        
        return comparacoes, trocas
    
    def _heapify_recursivo(self, lista: list[int], tamanho_heap: int, indice_raiz: int) -> tuple[int, int]:
        """
        Ajusta heap recursivamente (bottom-up) garantindo propriedade de max-heap.
        
        Retorna (comparacoes, trocas).
        """
        comparacoes = 0
        trocas = 0

        maior_valor = indice_raiz
        filho_esquerda = 2 * indice_raiz + 1
        filho_direita = 2 * indice_raiz + 2

        if filho_esquerda < tamanho_heap:
            comparacoes += 1
            if lista[filho_esquerda] > lista[maior_valor]:
                maior_valor = filho_esquerda

        if filho_direita < tamanho_heap:
            comparacoes += 1
            if lista[filho_direita] > lista[maior_valor]:
                maior_valor = filho_direita

        # Se raiz não é o maior, troca e continua recursivamente
        if maior_valor != indice_raiz:
            trocas += 1
            lista[indice_raiz], lista[maior_valor] = lista[maior_valor], lista[indice_raiz]

            comp, troc = self._heapify_recursivo(lista, tamanho_heap, maior_valor)
            comparacoes += comp
            trocas += troc

        return comparacoes, trocas