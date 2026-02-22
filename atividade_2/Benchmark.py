from atividade_2.kruskal import Kruskal
from atividade_2.Grafo import Grafo
from atividade_2.IOmodel import Entrada, Saida
from atividade_2.prim import Prim
import pandas as pd



class Benchmark:
    def __init__(self, tabela, entrada : Entrada, saida : Saida):
        self.tabela = tabela
        self.entrada = entrada
        self.saida = saida

    # Métodos Benchmark    
    def set_saida(self, saida: Saida):
        self.saida = saida
    def executar_bench(self, entrada: Entrada)->Saida:
        if entrada.algoritmo == "prim":
            resultado = Prim(entrada.Grafo).prim()
        elif entrada.algoritmo == "kruskal":
            resultado = Kruskal(entrada.Grafo).kruskal()
        else:
            raise ValueError("Algoritmo desconhecido")
        self.saida.arestas_analisadas = resultado[2]
        self.saida.vertices_visitados = resultado[3]
        self.saida.find_calls = resultado[4]
        self.saida.union_calls = resultado[5]
        self.saida.num_arestas_mst = resultado[6]
        self.saida.tempo_execucao_total = resultado[1]
    def setar_entrada(self,
                       algoritmo: str,
                         num_vertices: int=None,
                         densidade: float=None,
                         grafo: Grafo=None,
                         rand= True
                         
):
        if Grafo is None:
            if rand==True:
                grafo = Grafo([], [], densidade)
                grafo.gerar_grafo_aleatorio(num_vertices, densidade, 1, 100)
                input= Entrada(
                    algoritmo=algoritmo,
                    Grafo=grafo
                )
            else:
                raise ValueError("Grafo deve ser fornecido se rand for False")
        else:             
            input= Entrada(
                    algoritmo=algoritmo,
                    Grafo=grafo
                )
        self.entrada = input
        print("entrada setada", self.entrada)
    def setar_saida(self, saida: Saida):
        self.saida = saida
   