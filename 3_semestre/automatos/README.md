# Tradutor Genético: DNA para Proteínas com Teoria dos Autômatos

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![pytest](https://img.shields.io/badge/tested%20with-pytest-blue?style=for-the-badge&logo=pytest)

> Esse projeto é parte do repositório centralizador de atividades acadêmicas da graduação em Ciência da Computação na UFPA.

**Professor:** Josivaldo de Souza Araujo  
**Semestre:** 2025.2

## 📖 Sobre o Projeto

Este projeto, desenvolvido para a disciplina de **Linguagens Formais e Autômatos**, demonstra a aplicação prática de conceitos teóricos da ciência da computação para resolver um problema fundamental da bioinformática: a tradução de sequências de DNA em proteínas.

O sistema implementa um pipeline de dois estágios principais, modelando o processo biológico com diferentes classes de autômatos:

1. **Transcrição (DNA → RNA):** Utiliza um **Transdutor Finito (Máquina de Mealy)** para converter uma fita molde de DNA em sua fita de RNA mensageiro complementar.
2. **Tradução (RNA → Proteína):** Emprega um **Autômato de Pilha** para validar a sintaxe de um gene na fita de RNA e traduzi-lo em uma cadeia de aminoácidos.

## ✨ Funcionalidades Principais

- **Interface de Linha de Comando:** Uma aplicação `main.py` robusta que permite gerar e processar DNA de várias formas.
- **Geração de DNA:** Scripts para gerar cadeias de DNA aleatórias e pseudoaleatórias (com estrutura de gene na fita molde).
- **Orquestrador de Tarefas:** Um script `run.py` que centraliza a execução da aplicação principal, dos testes e de tarefas de manutenção.
- **Logging Estruturado:** Uso do módulo `logging` para fornecer uma saída clara e informativa sobre o processo de execução.
- **Suíte de Testes Automatizada:** Testes de unidade e de propriedade com `pytest` para garantir a corretude e a robustez de cada componente.

## 📂 Estrutura do Projeto

```bash
tradutor-genetico/
├── data/                 # Diretório para arquivos de entrada e saída
│   ├── input/
│   └── output/
│
├── src/                  # Código-fonte principal da aplicação
│   ├── __init__.py       # Funções "fábrica" que montam os autômatos
│   ├── automata/         # Implementações das classes de autômatos
│   │   ├── transdutor_finito.py
│   │   └── automato_pilha.py
│   ├── tabela_codons.py  # Mapeamento de códons para aminoácidos
│   └── utils.py          # Funções utilitárias (geração de DNA, I/O)
│
├── tests/                # Scripts de teste e demonstração
│   ├── test_*.py         # Suíte de testes automatizada com pytest
│   └── *.py              # Scripts de demonstração de alto nível
│
├── main.py               # Ponto de entrada da aplicação principal
├── run.py                # Orquestrador de tarefas do projeto
├── pytest.ini            # Arquivo de configuração para o pytest
└── README.md
```

## ⚙️ Arquitetura e Teoria Aplicada

### Módulo 1: Transcrição (Transdutor Finito / Máquina de Mealy)

- **Modelo:** `src/automata/transdutor_finito.py`
- **Fábrica:** `src/__init__.py` (função `criar_transcritor_dna_rna`)
- **Propósito:** Converter uma **fita molde de DNA** em RNA.
- **Teoria:** Este processo é uma **tradução regular**, pois cada símbolo de entrada (`A`, `T`, `C`, `G`) mapeia diretamente para um único símbolo de saída (`U`, `A`, `G`, `C`) sem a necessidade de memória complexa.

### Módulo 2: Tradução (Autômato de Pilha)

- **Modelo:** `src/automata/automato_pilha.py`
- **Fábrica:** `src/__init__.py` (função `criar_ribossomo`)
- **Propósito:** Validar e traduzir uma fita de RNA em proteínas.
- **Teoria:** A estrutura de um gene pertence a uma **Linguagem Livre de Contexto**.
  - **Linguagem Reconhecida (L):** Fitas de RNA que contêm uma ou mais sequências de genes válidas.
  - **Gramática Livre de Contexto (Implementada):**

    ```bash
    G = (V, Σ, R, S)
    V = {S, Gene, Corpo}               (Variáveis)
    Σ = {A, U, C, G}                   (Terminais)
    S -> Gene S | ε                    (Ponto de partida: um ou mais genes, ou vazio)
    Gene -> 'AUG' Corpo StopCodon      (Estrutura do gene)
    Corpo -> Codon Corpo | ε           (O corpo pode ter zero ou mais códons)
    Codon -> Base Base Base            (Um códon que não é de parada)
    StopCodon -> 'UAA' | 'UAG' | 'UGA'
    ```

- **Implementação:** O autômato de pilha (`Automato_Pilha`) utiliza sua pilha para "construir" a cadeia de aminoácidos. Ao ler um códon válido, ele empilha o nome do aminoácido correspondente. Se um gene é concluído com sucesso (encontra um `StopCodon`), o conteúdo da pilha é processado. Se a fita termina antes de um `StopCodon`, a gramática não é satisfeita e a proteína não é formada, refletindo a rigidez do modelo formal.

## 🚀 Como Executar o Projeto

O script `run.py` é o ponto de entrada unificado para todas as operações.

### Pré-requisitos

- Python 3.8 ou superior.
- (Opcional) Para executar a suíte de testes automatizada, é necessário o `pytest`:

  ```bash
  pip install pytest
  ```

### Comandos Disponíveis

Abra o terminal na raiz do projeto e utilize os seguintes comandos:

---

### 1. Executando a Aplicação Principal (`main.py`)

Use `python run.py main` seguido das opções desejadas.

**Opções:**

- `-p [N]`, `--pseudoaleatorio [N]`: Gera DNA pseudoaleatório com `N` códons totais (padrão: 1000).
- `-a [N]`, `--aleatorio [N]`: Gera DNA aleatório com `N` bases (padrão: 10000).
- `-l <ARQUIVO>`, `--ler-arquivo <ARQUIVO>`: Lê uma cadeia de DNA de um arquivo.

**Exemplos de Uso:**

- **Gerar DNA pseudoaleatório e ler um arquivo:**

  ```bash
  python run.py main -p 50 -l meu_dna.txt
  ```

- **Gerar DNA aleatório com 500 bases:**

  ```bash
  python run.py main -a 500
  ```

---

### 2. Executando os Testes

#### Suíte de Testes Automatizada (Recomendado)

Este comando executa todos os testes de unidade e de propriedade de forma rápida e silenciosa, validando a lógica central do projeto.

```bash
python run.py test
```

#### Scripts de Demonstração

Estes são os scripts de teste originais, úteis para uma demonstração visual e passo a passo.

- **Demonstração da Geração de DNA Aleatório:**

  ```bash
  python run.py demo_dna_a
  ```

- **Demonstração da Geração de DNA Pseudoaleatório:**

  ```bash
  python run.py demo_dna_p
  ```

- **Demonstração do Ribossomo (Autômato de Pilha):**

  ```bash
  python run.py demo_ribossomo
  ```

---

### 3. Limpeza do Projeto

Para remover arquivos gerados e cache.

- **Limpeza Padrão (apenas cache do Python):**

  ```bash
  python run.py clean
  ```

- **Limpeza Completa (cache + todos os arquivos `.txt` em `data/`):**

  ```bash
  python run.py clean --all
  ```

## 👥 Origem e Autoria do Projeto

Este projeto foi originalmente concebido e desenvolvido como um trabalho para a disciplina de **Linguagens Formais e Autômatos** na UFPA, com a colaboração da seguinte equipe:

- **Desenvolvimento do Código Original:**
  - [Alessandro Reali Lopes Silva](https://github.com/reali-705)
  - [Gian Victor Gonçalves Figueiredo](https://github.com/Gian-Figueiredo)
- **Elaboração do Artigo Científico:**
  - [Jhonata Bezerra Figueiredo](https://github.com/Jhonatabz)
  - [Felipe Lisboa Brasil](https://github.com/FelipeBrasill)

### 🍴 Novo Rumo (Fork)

> Este repositório é um **fork** do projeto acadêmico original e dá continuidade ao desenvolvimento de forma individual. O objetivo agora é expandir a base original para aprofundar os estudos, refatorar o código para maior eficiência e explorar novas ferramentas de programação.

---

> 🔙 [Voltar para o Repositório Central (CC-UFPA)](../../README.md)
