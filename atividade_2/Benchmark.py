from atividade_2.kruskal import Kruskal
from atividade_2.Grafo import Grafo
from atividade_2.IOmodel import Input, Output
from atividade_2.prim import Prim
import pandas as pd



class Benchmark:
    def __init__(self, tabela, entrada : Input, saida : Output):
        self.tabela = tabela
        self.entrada = entrada
        self.saida = saida


    def executar_bench(self, entrada: Input)->Output:
        if entrada.algoritmo == "prim":
            resultado = Prim(entrada.Grafo).prim()
        elif entrada.algoritmo == "kruskal":
            resultado = Kruskal(entrada.Grafo).kruskal()
        else:
            raise ValueError("Algoritmo desconhecido")
        if resultado is None:
            raise ValueError("Resultado do algoritmo é None")
        if entrada.algoritmo == "prim":
            #DAdos Grafo
            self.saida.algoritmo = entrada.algoritmo
            self.saida.num_vertices = len(entrada.Grafo.vertices)
            self.saida.num_arestas = len(entrada.Grafo.arestas)
            self.saida.densidade = entrada.Grafo.densidade
            #Dados Prim
            self.saida.arestas_analisadas = resultado[2]
            self.saida.vertices_visitados = resultado[3]
            self.saida.heap_push = resultado[4]
            self.saida.heap_pop = resultado[5]
            self.saida.tempo_execucao_heap_ops = resultado[6]
            self.saida.num_arestas_mst = resultado[7]
            self.saida.tempo_execucao_total = resultado[1]
        elif entrada.algoritmo == "kruskal":
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
                input= Input(
                    algoritmo=algoritmo,
                    Grafo=grafo
                )
            else:
                raise ValueError("Grafo deve ser fornecido se rand for False")
        else:             
            input= Input(
                    algoritmo=algoritmo,
                    Grafo=grafo
                )
        self.entrada = input
        print("entrada setada", self.entrada)
    def setar_saida(self, saida: Output):
        self.saida = saida

# recursos CSV
def salvar_resultados(self, nome_arquivo: str):
    df = pd.DataFrame([self.saida.dict()])
    df.to_csv(nome_arquivo, index=False)
def carregar_resultados(self, nome_arquivo: str):
    df = pd.read_csv(nome_arquivo)
    self.saida = Output(**df.iloc[0].to_dict())   
def exibir_resultados(self):
    print("Resultados do Benchmark:")
    print(self.saida.json(indent=4))
def incrementar_tabela(self):
    df = pd.DataFrame([self.saida.dict()])
    self.tabela = pd.concat([self.tabela, df], ignore_index=True)