# 📚 Matemática Computacional

Este repositório contém os trabalhos e atividades práticas desenvolvidos para a disciplina de Matemática Computacional, com foco em **algoritmos de otimização**, **álgebra linear**, **cálculo** e **redes neurais**.

**Instituição:** Universidade Federal do Pará (UFPA).  
**Curso:** Bacharelado em Ciência da Computação.  
**Disciplina:** Matemática Computacional.  
**Professor(a):** Claudomiro da Souza Sales Junior.  
**Aluno:** Alessandro Reali Lopes Silva.

## 📑 Sumário

- [🎯 Objetivo](#-objetivo)
- [📂 Atividades Desenvolvidas](#-atividades-desenvolvidas)
- [🛠️ Ferramentas e Tecnologias](#-ferramentas-e-tecnologias)
- [🚀 Como Executar](#-como-executar)
- [📋 Estrutura do Repositório](#-estrutura-do-repositório)
- [💡 Exemplos de Uso](#-exemplos-de-uso)
- [📝 Notas Importantes](#-notas-importantes)

## 🎯 Objetivo

O objetivo principal é aplicar conceitos teóricos em contextos computacionais práticos, com foco especial em:

- ✅ **Algoritmos de Otimização:** Gradiente Descendente, SGD e Mini-Batch
- ✅ **Redes Neurais:** Implementação de arquiteturas simples com Backpropagation
- ✅ **Análise de Hiperparâmetros:** Comparação de taxas de aprendizado e métricas de convergência
- ✅ **Visualização de Dados:** Exploração dinâmica de convergência e evolução de parâmetros
- ✅ **Ciência de Dados e Machine Learning:** Aplicação prática de conceitos matemáticos

## 📂 Atividades Desenvolvidas

Os projetos estão organizados em pastas nomeadas de acordo com a atividade correspondente:

- **[Atividade 0](./atividades/atividade0.ipynb)**: Transformações Lineares
  - Demonstração de transformações lineares (Rotação e Cisalhamento)
  - Utilização de Jupyter, Git e Matplotlib

- **[Atividade 1](./atividades/atividade1.ipynb)**: **Composição Matricial e Determinantes**
  - Composição de transformações: Rotação horária de 90° + Cisalhamento em x
  - Determinantes e análise de conservação de área através de transformações
  - Matriz composta: equivalência entre aplicação sequencial e produto matricial
  - Não-comutatividade: $A \cdot B \neq B \cdot A$
  - Produto escalar e ortogonalidade de vetores
  
- **[Atividade 2](./atividades/atividade2.ipynb)**: **Gradiente Descendente e Redes Neurais**
  - Gradiente Descendente com um e dois parâmetros
  - Variantes: BGD, SGD e Mini-Batch
  - Redes Neurais com Backpropagation e rastreamento de evolução de parâmetros

- **[Avaliação Alternativa](./atividades/avaliacao_alternativa.ipynb)**: **Métodos Numéricos e Conversões**
  - **Questão 1 — Método da Bisseção:** Varredura de intervalos, detecção de raízes via mudança de sinal, verificação do comportamento da derivada
  - **Questão 2 — Conversão Binária Fracionária:** Conversão didática de sequência binária → binário fracionário (0.xxxx) → decimal
  - **Questão 3 — Conversão Binária Completa:** Conversão de números binários com parte inteira e fracionária para decimal com somatório das parcelas

## 🛠️ Ferramentas e Tecnologias

As principais ferramentas e bibliotecas utilizadas neste projeto são:

- **Linguagem:** Python 3.8+
- **Ambiente:** Jupyter Notebook
- **Bibliotecas Principais:**
  - `numpy`: Computação numérica e álgebra linear
  - `matplotlib`: Visualização de dados e gráficos
  - `pandas`: Manipulação e análise de dados (quando necessário)
- **Controle de Versão:** Git

## 🚀 Como Executar

### Pré-requisitos

- Python 3.8 ou superior instalado
- pip (gerenciador de pacotes Python)
- Git instalado

### Passo a Passo

**1. Clone o repositório:**

  ```bash
  git clone https://github.com/reali-705/matematica_computacional.git
  cd matematica_computacional
  ```

**2. Crie um ambiente virtual:**

  Isso isolará as dependências do projeto e evitará conflitos com outras instalações.

  ```bash
  python -m venv venv
  ```

**3. Ative o ambiente virtual:**

  **No Windows (PowerShell):**

  ```bash
  .\venv\Scripts\Activate.ps1
  ```

  **No Windows (CMD):**

  ```bash
  .\venv\Scripts\activate.bat
  ```

  **No Linux/macOS:**

  ```bash
  source venv/bin/activate
  ```

**4. Instale as dependências:**

  ```bash
  pip install -r requirements.txt
  ```

  Isso instalará automaticamente todas as bibliotecas necessárias (NumPy, Matplotlib, Jupyter, etc.).

**5. Inicie o Jupyter Notebook:**

  O navegador abrirá automaticamente com a interface do Jupyter. Navegue até a pasta `atividades/` e abra o notebook desejado (ex: `atividade2.ipynb`).

## 📋 Estrutura do Repositório

```txt
matematica_computacional/
├── readme.md                        # Este arquivo
├── requirements.txt                 # Dependências do projeto
├── atividades/                      # Pasta com todas as atividades
│   ├── atividade0.ipynb             # Transformações Lineares
│   ├── atividade1.ipynb             # Composição Matricial e Determinantes
│   ├── atividade2.ipynb             # Gradiente Descendente e Redes Neurais
│   ├── avaliacao_alternativa.ipynb  # Métodos Numéricos e Conversões
│   └── utils.py                     # Funções utilitárias compartilhadas
└── .gitignore                       # Arquivos ignorados pelo Git
```

## 💡 Exemplos de Uso

### Executar Atividade 2 (Recomendado para Iniciantes)

1. Com Jupyter aberto, acesse: `atividades/atividade2.ipynb`
2. Leia as instruções em cada seção
3. Execute as células sequencialmente (Shift + Enter)
4. Observe os gráficos e tabelas de resultados

### Modificar Parâmetros

Cada atividade possui uma seção "VARIÁVEIS CONFIGURÁVEIS" no início. Você pode modificar:

- **Taxa de aprendizado:** Controla a velocidade de convergência
- **Número máximo de iterações:** Limite de passos do algoritmo
- **Critério de parada (precisão):** Quando parar de otimizar

Exemplo (Atividade 2, Parte A):

```python
TAXAS_APRENDIZADO_TESTE = [0.01, 0.1]  # Testar duas taxas diferentes
INTERCEPTO_INICIAL_TESTE = 0.0
MAX_ITERACOES_TESTE = 1000
PRECISAO_TESTE = 0.0001
```

## 📝 Notas Importantes

- Todos os notebooks usam dados de exemplo pequenos para fins educacionais
- As visualizações usam limites dinâmicos para melhor clareza
- Os logs de treinamento mostram as primeiras/últimas iterações (com reticências no meio)
- O código é totalmente documentado com docstrings e comentários
