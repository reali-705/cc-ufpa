import pandas as pd
from atividade_2.kruskal import Kruskal
from atividade_2.prim import Prim
from atividade_2.Grafo import Grafo
from atividade_2.IOmodel import Input, Output, Algoritmo


class Benchmark:
    def __init__(self, tabela=None):
        self.tabela = tabela if tabela is not None else pd.DataFrame()
        self.run_counter = 1

        if not self.tabela.empty and "idx" in self.tabela.columns:
            try:
                self.run_counter = int(self.tabela["idx"].max()) + 1
            except Exception:
                self.run_counter = 1

    def executar_bench(self, entrada: Input) -> Output:
        grafo_obj = entrada.grafo

        # Seu Grafo guarda (u,v) e (v,u), então "reais" = //2
        num_arestas_reais = len(grafo_obj.arestas) // 2
        densidade_validada = min(float(grafo_obj.densidade), 1.0)

        dados_comuns = {
            "idx": self.run_counter,
            "algoritmo": entrada.algoritmo,
            "num_vertices": len(grafo_obj.vertices),
            "num_arestas": num_arestas_reais,
            "densidade": densidade_validada,
        }

        if entrada.algoritmo == Algoritmo.PRIM:
            res = Prim(grafo_obj).prim(grafo_obj.arestas)

            # res: (agm_dict, 0, heap_push, heap_pop, tempo_heap, num_arestas_mst, tempo_total, arestas_analisadas)
            analisadas = min(res[7], num_arestas_reais)

            dados_saida = {
                **dados_comuns,
                "heap_push": res[2],
                "heap_pop": res[3],
                "tempo_execucao_heap_ops": res[4],
                "num_arestas_mst": res[5],
                "tempo_execucao_total": res[6],
                "arestas_analisadas": analisadas,
            }

        else:
            res = Kruskal().kruskal(grafo_obj.arestas)

            # Novo Kruskal deduplica internamente:
            # res: (a_ana, m_cnt, uni, fnd, p_min, t_exec, t_total, t_srt)
            # Então NÃO divide por 2.
            analisadas = min(res[0], num_arestas_reais)

            dados_saida = {
                **dados_comuns,
                "arestas_analisadas": analisadas,
                "num_arestas_mst": res[1],
                "union_calls": res[2],
                "find_calls": res[3],
                "tempo_sort": res[7],
                "tempo_execucao_total": res[6],
                # campos antigos removidos:
                # "tempo_execucao_union": ...
                # "tempo_execucao_find": ...
            }

        self.saida = Output(**dados_saida)

        self.run_counter += 1
        return self.saida

    def simular(self, tamanhos_vertices, densidades, num_rodadas=5):
        for v in tamanhos_vertices:
            for d in densidades:
                for _ in range(num_rodadas):

                    g = Grafo(None, None, d)

                    # d == 0 => gera uma árvore (cadeia) = caso "AGM óbvia"
                    if abs(d) < 1e-9:
                        g.gerar_grafo_melhor_caso_agm(
                            num_vertices=v,
                            densidade=0.0,
                            forma="cadeia",
                            peso_mst_min=1,
                            peso_mst_max=10,
                            peso_extra_min=1000,
                            peso_extra_max=2000,
                        )
                    else:
                        g.gerar_grafo_aleatorio(v, d, 1, 100)

                    for alg in [Algoritmo.PRIM, Algoritmo.KRUSKAL]:
                        ent = Input(algoritmo=alg, grafo=g, num_vertices=v, densidade=d)
                        self.executar_bench(ent)
                        self.incrementar_tabela()

    def incrementar_tabela(self):
        if hasattr(self, "saida") and self.saida:
            novo = pd.DataFrame([self.saida.model_dump()])
            self.tabela = pd.concat([self.tabela, novo], ignore_index=True)

    def salvar_resultados(self, nome):
        self.tabela.to_csv(nome, index=False)