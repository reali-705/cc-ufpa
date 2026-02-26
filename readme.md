# Análise de Algoritmos - Atividade 2: Algoritmos de Árvore Geradora Mínima

## 📋 Visão Geral

Este projeto implementa e analisa dois algoritmos fundamentais para encontrar a **Árvore Geradora Mínima (AGM)** de um grafo não-direcionado ponderado:
- **Algoritmo de Prim**: Utiliza uma estratégia gulosa baseada em heap
- **Algoritmo de Kruskal**: Utiliza ordenação de arestas e Union-Find com path compression

O projeto inclui ferramentas de benchmark para comparar a performance dos algoritmos sob diferentes cenários.

---

## 🏗️ Estrutura do Projeto

```
atividade_2/
├── Grafo.py                    # Classe que representa um grafo
├── prim.py                     # Implementação do algoritmo de Prim
├── kruskal.py                  # Implementação do algoritmo de Kruskal
├── Benchmark.py                # Sistema de benchmarking
├── IOmodel.py                  # Modelos de entrada/saída com Pydantic
├── main.py                     # Arquivo principal para execução
├── _Init_.py                   # Configurações iniciais
├── dashboard.ipynb             # Dashboard Jupyter com visualizações
├── resultados_benchmark.csv    # Resultados dos benchmarks
└── readme.md                   # Este arquivo
```

---

## 📦 Componentes Principais

### 1. **Grafo.py**
Define a classe `Grafo` que representa um grafo não-direcionado ponderado.

**Métodos principais:**
- `__init__()`: Inicializa o grafo com arestas, vértices e densidade
- `add_aresta(vertice1, vertice2, peso)`: Adiciona uma aresta ao grafo
- `gerar_grafo_aleatorio()`: Gera um grafo aleatório com número de vértices e densidade especificados
- `gerar_grafo_melhor_caso_agm()`: Gera grafos específicos para análise de casos extremos
- `_atualizar_densidade()`: Atualiza a densidade do grafo
- `grafo_esta_vazio()`: Verifica se o grafo está vazio

**Características:**
- Grafos representados internamente como pares não-direcionados (u,v) e (v,u)
- Suporta cálculo automático de densidade
- Permite gerar grafos com diferentes formas (cadeia, estrela, binária)

---

### 2. **Kruskal.py**
Implementa o **Algoritmo de Kruskal** para AGM.

**Método principal:**
- `agm(arestas, verbose=False)`: Executa o algoritmo de Kruskal

**Características:**
- **Union-Find com otimizações:**
  - Path compression iterativo (evita overhead de recursão)
  - Union by rank para melhor balanceamento
- **Deduplicação de arestas**: Remove pares (u,v) e (v,u) automaticamente
- **Retorna:**
  - Arestas analisadas
  - Arestas da MST
  - Chamadas de union e find
  - Tempo de execução
  - Tempo de ordenação

**Complexidade:**
- Tempo: O(E log E) para ordenação + O(E α(V)) para Union-Find
- Espaço: O(V + E)

---

### 3. **Prim.py**
Implementa o **Algoritmo de Prim** para AGM.

**Método principal:**
- `prim(arestas, verbose=False)`: Executa o algoritmo de Prim

**Características:**
- **Utiliza estrutura de dados Heap (min-heap)**
- **Operações monitoradas:**
  - Heap push: Inserção de arestas candidatas
  - Heap pop: Extração de menor aresta
  - Tempo de operações heap
- **Retorna:**
  - Dicionário da AGM
  - Número de push/pop do heap
  - Arestas analisadas
  - Tempo total de execução

**Complexidade:**
- Tempo: O(E log V) com heap binário
- Espaço: O(V + E)

---

### 4. **IOmodel.py**
Define os modelos de dados usando **Pydantic** para validação robusta.

**Classes:**
- `Algoritmo` (Enum): Define algoritmos suportados (PRIM, KRUSKAL)
- `Input` (BaseModel): Especifica entrada do experimento
  - `algoritmo`: Qual algoritmo executar
  - `grafo`: Objeto grafo (opcional)
  - `num_vertices`: Número de vértices (opcional)
  - `densidade`: Densidade do grafo (opcional)
- `Output` (BaseModel): Resultado do experimento
  - Métricas comuns: índice, algoritmo, num_vértices, num_arestas, densidade
  - Métricas específicas Kruskal: find_calls, union_calls, tempo_sort
  - Métricas específicas Prim: heap_push, heap_pop
  - Resultado: num_arestas_mst, tempo_execucao_total

**Validações:**
- Validação automática de tipos
- Verificação de consistência entre métricas
- Limites de densidade [0.0, 1.0]

---

### 5. **Benchmark.py**
Sistema de benchmarking para comparar algoritmos.

**Classe principal:**
- `Benchmark(tabela=None)`: Gerencia execução de múltiplos benchmarks

**Métodos:**
- `executar_bench(entrada: Input) -> Output`: Executa um experimento único
- `simular(tamanhos_vertices, densidades, num_rodadas=5)`: Executa múltiplos experimentos

**Funcionalidades:**
- Executa ambos algoritmos com mesmo grafo
- Coleta métricas detalhadas de performance
- Armazena resultados em DataFrame Pandas
- Exporta para CSV

---

### 6. **main.py**
Arquivo principal de execução do projeto.

**Exemplos de uso disponíveis:**
- Execução de benchmarks parametrizados
- Comparação lado-a-lado de algoritmos
- Geração de gráficos de performance

---

## 🛠️ Requisitos do Sistema

### Python
- **Versão:** Python 3.10 ou superior

### Dependências Externas
```
pandas>=1.3.0          # Manipulação de dados e DataFrames
pydantic>=2.0.0        # Validação de modelos de dados
jupyter>=1.0.0         # Para executar o dashboard
matplotlib>=3.3.0      # Visualizações (opcional, para gráficos)
numpy>=1.20.0          # Operações numéricas (opcional)
```

### Instalação de Dependências

```bash
# Clone o repositório
git clone https://github.com/reali-705/analise-algoritmos.git
cd analise-algoritmos

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### Arquivo requirements.txt
Se não existir, crie com:
```
pandas>=1.3.0
pydantic>=2.0.0
jupyter>=1.0.0
matplotlib>=3.3.0
numpy>=1.20.0
```

---

## 🚀 Como Executar o Código

### 1. Execução Básica de um Algoritmo

```python
from atividade_2.Grafo import Grafo
from atividade_2.prim import Prim
from atividade_2.kruskal import Kruskal

# Criar um grafo aleatório
grafo = Grafo()
grafo.gerar_grafo_aleatorio(
    num_vertices=10,
    densidade=0.5,
    peso_min=1,
    peso_max=100,
    seed=42
)

# Executar Prim
prim_result = Prim(grafo).prim(grafo.arestas)
print(f"Prim - AGM encontrada com {prim_result[5]} arestas")

# Executar Kruskal
kruskal_result = Kruskal().agm(grafo.arestas)
print(f"Kruskal - AGM encontrada com {kruskal_result[1]} arestas")
```

### 2. Execução via Terminal

```bash
# Posicione-se no diretório do projeto
cd atividade_2

# Execute o arquivo principal
python main.py
```

### 3. Execução de Benchmarks

```python
from atividade_2.Benchmark import Benchmark
from atividade_2.IOmodel import Input, Algoritmo
from atividade_2.Grafo import Grafo

benchmark = Benchmark()

# Executar benchmarks com múltiplos tamanhos
tamanhos = [10, 50, 100, 500]
densidades = [0.2, 0.5, 0.8]
benchmark.simular(tamanhos, densidades, num_rodadas=5)

# Exportar resultados
benchmark.tabela.to_csv('resultados.csv', index=False)
```

### 4. Visualizar Dashboard (Jupyter Notebook)

```bash
# Inicie o Jupyter
jupyter notebook

# Abra o arquivo dashboard.ipynb
# Execute as células para ver gráficos de performance
```

### 5. Usar a Interface Interativa

```python
from atividade_2.IOmodel import Input, Algoritmo, Output
from atividade_2.Benchmark import Benchmark
from atividade_2.Grafo import Grafo

# Criar entrada
grafo = Grafo()
grafo.gerar_grafo_aleatorio(num_vertices=50, densidade=0.6, peso_min=1, peso_max=100)

entrada = Input(
    algoritmo=Algoritmo.PRIM,
    grafo=grafo
)

# Executar
benchmark = Benchmark()
resultado = benchmark.executar_bench(entrada)

# Acessar resultados
print(f"Tempo total: {resultado.tempo_execucao_total:.4f}s")
print(f"Arestas analisadas: {resultado.arestas_analisadas}")
print(f"Arestas na MST: {resultado.num_arestas_mst}")
```

---

## 📊 Análise de Performance

### Cenários de Teste

O projeto testa os algoritmos em diferentes cenários:

1. **Grafos Densos** (densidade ≈ 0.8): Prim tende a ser melhor
2. **Grafos Esparsos** (densidade ≈ 0.2): Kruskal tende a ser melhor
3. **Grafos Médios** (densidade ≈ 0.5): Performance similar

### Métricas Coletadas

**Kruskal:**
- Tempo de ordenação (sort)
- Número de chamadas find e union
- Arestas analisadas antes de encontrar AGM

**Prim:**
- Operações de heap (push/pop)
- Tempo total de operações heap
- Arestas analisadas

---

## 📈 Resultados e Visualizações

Os resultados são armazenados em `resultados_benchmark.csv` com as seguintes colunas:

```csv
idx,algoritmo,num_vertices,num_arestas,densidade,arestas_analisadas,
num_arestas_mst,tempo_execucao_total,find_calls,union_calls,tempo_sort,
heap_push,heap_pop,tempo_execucao_heap_ops
```

O `dashboard.ipynb` fornece:
- Gráficos comparativos de performance
- Análise de escalabilidade
- Visualizações por densidade
- Tabelas resumidas

---

## 🔍 Exemplos de Uso Avançado

### Gerar Grafo em Melhor Caso para AGM

```python
grafo = Grafo()
grafo.gerar_grafo_melhor_caso_agm(
    num_vertices=100,
    densidade=0.3,
    peso_mst_min=1,
    peso_mst_max=10,
    peso_extra_min=1000,
    peso_extra_max=2000,
    forma="cadeia"  # ou "estrela" ou "binaria"
)
```

### Análise Detalhada de um Algoritmo

```python
from atividade_2.prim import Prim

prim = Prim(grafo)
resultado = prim.prim(grafo.arestas, verbose=True)

# Desempacotar resultado
agm_dict, _, heap_push, heap_pop, tempo_heap, num_arestas_mst, tempo_total, arestas_analisadas = resultado

print(f"Heap pushes: {heap_push}")
print(f"Heap pops: {heap_pop}")
print(f"Arestas na MST: {num_arestas_mst}")
print(f"Tempo total: {tempo_total:.6f}s")
```

---

## 🐛 Troubleshooting

### Erro: "ModuleNotFoundError"
**Solução:** Certifique-se de estar no diretório correto e que o ambiente virtual está ativado.

```bash
# Verifique a estrutura
ls -la atividade_2/

# Reinstale as dependências
pip install -r requirements.txt
```

### Erro: "No module named 'pydantic'"
**Solução:** Instale as dependências:
```bash
pip install pydantic pandas jupyter
```

### Grafos Muito Grandes Causam Lentidão
**Solução:** Reduza o número de vértices ou densidade:
```python
grafo.gerar_grafo_aleatorio(
    num_vertices=100,      # Reduza de 1000
    densidade=0.3,         # Reduza de 0.8
    peso_min=1,
    peso_max=100
)
```

---

## 📝 Notas Importantes

1. **Representação de Grafos**: Arestas são armazenadas como pares (u,v) e (v,u) para facilitar iteração
2. **Deduplicação em Kruskal**: O algoritmo deduplica automaticamente
3. **Complexidade**: Ambos algoritmos têm complexidade O(E log V) ou similar
4. **Reprodutibilidade**: Use `seed` ao gerar grafos aleatórios para resultados reproduzíveis

---

## 👨‍💻 Autor

Felipe Brasil (reali-705)

---

## 📄 Licença

Este projeto é fornecido para fins educacionais.