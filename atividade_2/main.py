import os
import pandas as pd
import numpy as np
from atividade_2.Benchmark import Benchmark

"""
DOCUMENTAÇÃO DO BENCHMARK DE ALGORITMOS MST
==========================================
Bem vindo :)
Este script automatiza a coleta de métricas de desempenho para os algoritmos 
de Prim e Kruskal (Árvore Geradora Mínima).

COMO USAR:
----------
1. Parâmetros da Simulação:
   - tamanhos_vertices: Lista com as quantidades de nós (V) para testar.
   - densidades: Lista de floats (0 a 1) representando a conectividade do grafo.
   - num_rodadas: Quantas vezes repetir o teste para cada combinação (gera médias).

2. Persistência de Dados:
   - O benchmark detecta automaticamente o arquivo 'resultados_benchmark.csv'.
   - Se o arquivo existir, os novos testes são anexados ao final (incremento).
   - Se não existir, um novo arquivo é criado.

MÉTRICAS COLETADAS:
------------------
- Tempo de execução total e por sub-rotina (Heap vs Sort).
- Quantidade de arestas analisadas vs arestas na MST.
- Chamadas de funções estruturais (Union-Find).
"""

def rodar_experimentos():
    nome_arquivo = "resultados_benchmark.csv"
    
    # Inicialização Inteligente:
    # Verifica a existência de histórico para manter a continuidade do Benchmark
    if os.path.exists(nome_arquivo):
        print(f"[*] Histórico detectado. Carregando dados de: {nome_arquivo}")
        tabela_existente = pd.read_csv(nome_arquivo)
        bench = Benchmark(tabela=tabela_existente)
    else:
        print("[*] Iniciando nova base de dados para o Benchmark...")
        bench = Benchmark()

    # Configuração do Experimento:
    # Aqui você define o cenário de teste para comparar a complexidade assintótica
    configs = {
        "tamanhos_vertices": np.arange(10, 201, 10),  # Aumente para testar escalabilidade
        "densidades": np.arange(0.03, 1.1, 0.1),         # Grafos esparsos vs densos
        "num_rodadas": 1                                       # Amostragem estatística
    }

    print(f"[*] Iniciando simulação de {len(configs['tamanhos_vertices']) * len(configs['densidades']) * configs['num_rodadas'] * 2} testes...")
    
    try:
        bench.simular(
            tamanhos_vertices=configs["tamanhos_vertices"], 
            densidades=configs["densidades"], 
            num_rodadas=configs["num_rodadas"]
        )
        
        # Salvamento dos dados:
        bench.salvar_resultados(f"atividade_2/{nome_arquivo}")
        
        print("\n" + "="*40)
        print("SIMULAÇÃO FINALIZADA COM SUCESSO")
        print(f"Total de registros na base: {len(bench.tabela)}")
        print(f"Arquivo atualizado: {nome_arquivo}")
        print("="*40)

    except Exception as e:
        print(f"\n[ERRO] A simulação foi interrompida: {e}")

if __name__ == "__main__":
    rodar_experimentos()