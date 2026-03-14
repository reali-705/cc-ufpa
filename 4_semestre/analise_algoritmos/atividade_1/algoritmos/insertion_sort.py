"""
Módulo de Insertion Sort com análise de complexidade.

Implementa duas variações do algoritmo Insertion Sort:
- Linear: busca sequencial para encontrar posição de inserção
- Binária: busca binária para encontrar posição de inserção

O módulo contabiliza comparações, trocas e tempo de execução
para análise comparativa de performance.
"""

import time

from algoritmos.resultado import Resultado

class InsertionSort:
    """
    Classe que implementa duas variações de Insertion Sort.
    
    O Insertion Sort é um algoritmo que ordena elementos de forma similar
    a como ordenamos cartas na mão: constrói a lista ordenada um elemento
    por vez, inserindo cada novo elemento na posição correta.
    """
        
    def ordenacao_linear(self, lista: list[int]) -> Resultado:
        """
        Ordena lista usando Insertion Sort com busca LINEAR.
        
        Algoritmo:
        1. Itera sobre cada elemento (i = 1 até n-1)
        2. Compara elemento com anteriores usando busca linear
        3. Desloca elementos maiores uma posição à direita
        4. Insere elemento na posição correta
        
        Complexidade de Comparações:
        - Melhor caso: O(n) - lista já ordenada
        - Pior caso: O(n²) - lista invertida
        - Caso médio: O(n²)
        
        Complexidade de Trocas:
        - Melhor caso: O(1) - lista já ordenada
        - Pior caso: O(n²) - lista invertida
        - Caso médio: O(n²)
        
        Args:
            lista: Lista de inteiros a ser ordenada
            
        Returns:
            Resultado: Objeto com lista ordenada, comparações, trocas e tempo
        """
        if not lista:
            return Resultado(
                metodo='ordenacao_linear',
                comparacoes=0,
                trocas=0,
                tempo_ms=0.0,
                lista_base=[],
                lista_ordenada=[],
            )
        lista_copia = lista.copy()
        comparacoes = 0
        trocas = 0
        tempo_inicial = time.perf_counter()
        
        for i in range(1, len(lista_copia)):
            chave = lista_copia[i]  # Elemento a ser inserido na posição correta
            j = i - 1  # Índice para comparação com elementos anteriores
            
            # Busca linear: compara chave com elementos anteriores
            while j >= 0:
                comparacoes += 1  # Conta comparação
                if lista_copia[j] > chave:
                    trocas += 1  # Desloca elemento maior uma posição à direita
                    lista_copia[j + 1] = lista_copia[j]
                    j -= 1
                else:
                    break  # Elemento anterior é menor, parar busca
            
            trocas += 1  # Conta a inserção da chave
            lista_copia[j + 1] = chave  # Insere chave na posição correta
        tempo_final = time.perf_counter()
        return Resultado(
            metodo='ordenacao_linear',
            comparacoes=comparacoes,
            trocas=trocas,
            tempo_ms=(tempo_final - tempo_inicial) * 1000,
            lista_base=lista,
            lista_ordenada=lista_copia,
        )
    
    def ordenacao_binaria(self, lista: list[int]) -> Resultado:
        """
        Ordena lista usando Insertion Sort com busca BINÁRIA.
        
        Algoritmo:
        1. Itera sobre cada elemento (i = 1 até n-1)
        2. Usa busca binária para encontrar a posição correta (mais eficiente)
        3. Desloca elementos maiores uma posição à direita
        4. Insere elemento na posição correta encontrada
        
        Vantagem: Reduz número de comparações sem reduzir trocas.
        Útil quando comparações são operações custosas.
        
        Complexidade de Comparações:
        - Todas as variantes: O(n log n) - busca binária é mais eficiente
        
        Complexidade de Trocas:
        - Melhor caso: O(n) - lista já ordenada
        - Pior caso: O(n²) - lista invertida
        - Caso médio: O(n²)
        
        Args:
            lista: Lista de inteiros a ser ordenada
            
        Returns:
            Resultado: Objeto com lista ordenada, comparações, trocas e tempo
        """
        if not lista:
            return Resultado(
                metodo='ordenacao_binaria',
                comparacoes=0,
                trocas=0,
                tempo_ms=0.0,
                lista_base=[],
                lista_ordenada=[],
            )
        lista_copia = lista.copy()
        comparacoes = 0
        trocas = 0
        tempo_inicial = time.perf_counter()
        
        for i in range(1, len(lista_copia)):
            chave = lista_copia[i]  # Elemento a ser inserido na posição correta
            esquerda, direita = 0, i - 1  # Intervalo de busca binária
            
            # Busca binária: encontra posição correta em O(log n)
            while esquerda <= direita:
                meio = (esquerda + direita) // 2
                comparacoes += 1  # Conta comparação na busca binária
                if lista_copia[meio] < chave:
                    esquerda = meio + 1  # Chave está na metade direita
                else:
                    direita = meio - 1  # Chave está na metade esquerda
            
            # Desloca elementos para a direita e insere chave na posição 'esquerda'
            for j in range(i, esquerda, -1):
                trocas += 1  # Conta cada deslocamento como uma troca
                lista_copia[j] = lista_copia[j - 1]
            
            trocas += 1  # Conta a inserção da chave
            lista_copia[esquerda] = chave  # Insere chave na posição correta
        tempo_final = time.perf_counter()
        return Resultado(
            metodo='ordenacao_binaria',
            comparacoes=comparacoes,
            trocas=trocas,
            tempo_ms=(tempo_final - tempo_inicial) * 1000,
            lista_base=lista,
            lista_ordenada=lista_copia,
        )
