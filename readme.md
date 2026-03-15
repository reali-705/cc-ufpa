# 🎓 Ciência da Computação - UFPA

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Repositório centralizador de atividades, projetos e estudos realizados durante a graduação na **Universidade Federal do Pará**.

> **Nota de Engenharia:** Este monorepo utiliza `git subtree` para consolidar projetos acadêmicos, preservando o histórico original de commits como registro de evolução técnica e maturidade de código.

> **Aviso de Integridade:** Este repositório foi criado para fins de registro histórico, portfólio e consulta acadêmica. O conteúdo aqui presente é de minha autoria. O plágio viola as políticas das instituições de ensino e o uso indevido deste material em avaliações é de responsabilidade do usuário.

---

## 🏗️ Organização Acadêmica

### 📅 1º Semestre

> Sem projetos específicos, mas com foco em matemática, introdução à computação e fundamentos de programação.

---

### 📅 2º Semestre

> Sem projetos específicos, mas com foco em matemática, introdução à computação e fundamentos de programação.

---

### 📅 3º Semestre: Projetos

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

#### [Autômatos](./3_semestre/automatos/)

![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white)
![Regex](https://img.shields.io/badge/Regex-42b983?style=flat-square)
![Bioinformatics](https://img.shields.io/badge/Bioinformatics-informational?style=flat-square)

Pipeline bioinformático com **Teoria dos Autômatos**: **Transdutor Finito** (transcrição DNA → RNA) + **Autômato de Pilha** (tradução RNA → proteína via gramática livre de contexto). Inclui suíte de testes `pytest` e orquestrador de tarefas `run.py`.

#### [Projeto de Algoritmos 1](./3_semestre/projeto_algoritmos_1/)

![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![PlantUML](https://img.shields.io/badge/PlantUML-4A4A4A?style=flat-square)

Dois mini-jogos em **TypeScript**: **Angry Birds Replica** (POO, herança, UML, algoritmos de ordenação para ranking) e **No Man's Sky** (implementação do zero de Tabela Hash, Heap/Fila de Prioridade e Pilhas com backend **Node.js/Express**).

### 📈 3º Semestre: *Evolution Log*

> Foco: Transição para Tipagem Forte, Testes Unitários e Modularização.

Neste semestre, a complexidade dos projetos exigiu o abandono de práticas amadoras em favor de um rigor técnico mais próximo do mercado. Os principais marcos evolutivos foram:

#### Rigor Matemático com Pytest

A implementação do Tradutor Genético em Python revelou o desafio de traduzir gramáticas teóricas em código funcional. A necessidade de tratar casos de borda específicos levou à adoção autônoma do pytest, garantindo que a lógica de autômatos permanecesse robusta e livre de falhas invisíveis.

#### O "Poder" da Tipagem (TypeScript)

O contato com o TypeScript nos projetos de Algoritmos 1 foi o divisor de águas. A obrigatoriedade de definir contratos (interfaces/tipos) para entradas e saídas eliminou bugs silenciosos e me fez adotar práticas semelhantes em Python (Pylance/Typing), elevando a qualidade do estilo de código e facilitando a manutenção.

#### Arquitetura Cliente-Servidor

A implementação do backend em Node.js para o No Man's Sky foi o primeiro contato real com a separação de responsabilidades (Frontend vs. Backend). Mesmo diante da desorganização inicial e prazos acadêmicos agressivos, o desafio de estabelecer a comunicação entre sistemas independentes consolidou o interesse por sistemas distribuídos.

#### Mentalidade de Engenharia

O aprendizado autônomo de POO (Programação Orientada a Objetos) e boas práticas de modularização permitiu que projetos em rápido crescimento não se tornassem monolitos impossíveis de gerenciar. O foco mudou de "apenas fazer funcionar" para "criar sistemas escaláveis e prontos para o trabalho em equipe".

---

### 📅 4º Semestre: Projetos

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Prolog](https://img.shields.io/badge/Prolog-742858?style=for-the-badge&logo=prolog&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)

#### [Análise de Algoritmos](./4_semestre/analise_algoritmos/)

![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557c?style=flat-square)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=flat-square&logo=powerbi&logoColor=black)

Análise empírica de algoritmos em **Python**: **Atividade 1** (Insertion Sort, Heap Sort, AVL Sort — análise de complexidade comparativa) e **Atividade 2** (algoritmos de **Prim** e **Kruskal** para Árvore Geradora Mínima, com benchmarking, modelos `Pydantic` e dashboard Jupyter).

#### [Matemática Computacional](./4_semestre/matematica_computacional/)

![SciPy](https://img.shields.io/badge/SciPy-8CAAE6?style=flat-square&logo=scipy&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-ffffff?style=flat-square&logo=matplotlib&logoColor=black)
![Seaborn](https://img.shields.io/badge/Seaborn-444876?style=flat-square)
![Statsmodels](https://img.shields.io/badge/Statsmodels-3178C6?style=flat-square)

Notebooks em **Python/Jupyter**: transformações lineares, composição matricial, gradiente descendente (BGD/SGD/Mini-Batch), redes neurais com backpropagation, métodos numéricos (Bisseção, Newton, Secante, fatoração LU, Gauss-Jacobi/Seidel) e estatística aplicada (regressão linear, p-value, intervalos de confiança, bootstrapping).

#### [Programação 2](./4_semestre/programacao_2/)

![JUnit5](https://img.shields.io/badge/JUnit5-25A162?style=flat-square&logo=junit5&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)
![Swing](https://img.shields.io/badge/Java_Swing-orange?style=flat-square)

Clone didático de *Plants vs Zombies* em **Java**: POO completo (abstração, herança, polimorfismo, encapsulamento), padrões Template Method, Strategy e Game Loop, **TDD** com JUnit 5 e arquitetura MVC com interface **Swing/AWT**.

#### [Programação Lógica](./4_semestre/programacao_logica/)

![SWI-Prolog](https://img.shields.io/badge/SWI--Prolog-742858?style=flat-square&logo=prolog&logoColor=white)
![Logic_Programming](https://img.shields.io/badge/Paradigm-Logical-blue?style=flat-square)

Paradigma lógico em **SWI-Prolog**: predicados, recursividade, Merge Sort; dois sistemas especialistas — **robô doméstico** (regras de inferência sobre tarefas domésticas) e **recomendação de hardware** (filtragem por compatibilidade, orçamento e perfil de uso).

#### [Projeto de Algoritmos 2](./4_semestre/projeto_algoritmos_2/)

![Graphviz](https://img.shields.io/badge/Graphviz-10253F?style=flat-square&logo=graphviz&logoColor=white)
![Faker](https://img.shields.io/badge/Faker-FF69B4?style=flat-square)
![Algorithms](https://img.shields.io/badge/Focus-Heaps_%26_Graphs-success?style=flat-square)

Três atividades em **Python**: **Atividade 1** (BST, AVL, Rubro-Negra com inserção/remoção/percursos), **Atividade 2** (Jesse and Cookies com heap, No Prefix Set com trie) e **Atividade 3** (**Shift-And Aproximado** para busca com `k` erros, com visualização `graphviz` em Jupyter).

### 📈 4º Semestre: *Evolution Log*

> Foco: Análise de Eficiência, Contratos de Dados e Robustez com POO.

Neste período, o foco migrou da funcionalidade para a sustentabilidade e performance. O aprendizado foi marcado por experimentos de benchmark e o desafio de coordenar fluxos de dados complexos:

#### Desmitificação da IA e Matemática Pura

A implementação de Redes Neurais e Gradiente Descendente em Matemática Computacional revelou a natureza estatística e probabilística da IA. Embora o rigor matemático tenha se mostrado um desafio exaustivo, a experiência serviu para aterrar conceitos abstratos em lógica computacional palpável.

#### Custo de Performance e Benchmarking

Em Análise de Algoritmos, a prática de medir Prim vs. Kruskal evidenciou que a eficiência teórica ($O$) enfrenta variáveis do mundo real, como o overhead de bibliotecas e a implementação base em C do Python. Perceber que a "melhor solução" é dependente do cenário (densidade do grafo/prazos de entrega) foi um marco de maturidade técnica.

#### Contratos e Colaboração (Pydantic)

A tentativa de implementar contratos de dados com Pydantic em equipe, embora turbulenta, consolidou a visão de que a engenharia de software é um esforço humano. A luta contra o "código Frankenstein" reforçou a importância de interfaces claras para que o trabalho coletivo seja fluido e escalável.

#### Escalabilidade com POO e TDD (Java)

O desenvolvimento do motor de jogo estilo PvZ provou que o investimento inicial em classes abstratas e interfaces se paga rapidamente. A mentalidade de TDD (Test-Driven Development), mesmo que parcial, criou um fluxo de desenvolvimento onde bugs eram tratados antes mesmo de existirem, tornando a verbosidade do Java um custo marginal diante da facilidade de manutenção.

#### Paradigma Lógico e Visão de Futuro

O contato com o Prolog e a lógica consultiva abriu novas perspectivas sobre sistemas especialistas e robótica. A transição da lógica imperativa para a declarativa permitiu enxergar problemas como bases de conhecimento, vislumbrando aplicações em automação e decisão inteligente.

---

### 📅 5º Semestre

> Em progresso...

---

### 📅 6º Semestre

> Não iniciado...

---

### 📅 7º Semestre

> Não iniciado...

---

### 📅 8º Semestre

> Não iniciado...

---

## 🛠️ Ferramentas e Linguagens Utilizadas

### Linguagens

| Linguagem | Projetos |
| --- | --- |
| **Python 3.x** | automatos, analise_algoritmos, matematica_computacional, projeto_algoritmos_2 |
| **TypeScript** | projeto_algoritmos_1 |
| **JavaScript / HTML5 / CSS3** | projeto_algoritmos_1 (angry_birds) |
| **Java 17** | programacao_2 |
| **Prolog (SWI-Prolog)** | programacao_logica |

### Bibliotecas

| Biblioteca | Linguagem | Projetos |
| --- | --- | --- |
| `pytest` | Python | automatos |
| `pandas`, `numpy` | Python | analise_algoritmos, matematica_computacional |
| `pydantic` | Python | analise_algoritmos |
| `matplotlib` | Python | analise_algoritmos, matematica_computacional |
| `scipy`, `seaborn`, `statsmodels`, `scikit-learn` | Python | matematica_computacional |
| `faker`, `graphviz`, `IPython` | Python | projeto_algoritmos_2 |
| `express`, `seedrandom` | TypeScript/JS | projeto_algoritmos_1 |
| `JUnit 5` | Java | programacao_2 |

### Ferramentas

| Ferramenta | Uso |
| --- | --- |
| **Jupyter Notebook** | matematica_computacional, analise_algoritmos, projeto_algoritmos_2 |
| **Maven** | Build e dependências Java — programacao_2 |
| **npm / tsc** | Build TypeScript — projeto_algoritmos_1 |
| **SWI-Prolog (`swipl`)** | Interpretador — programacao_logica |
| **Power BI** | Visualização de dados (`.pbip`) — analise_algoritmos |
| **PlantUML** | Diagramas UML — projeto_algoritmos_1 |
| **pip / venv** | Gerenciamento de ambientes Python |
| **Git** | Controle de versão (todos os projetos) |

---

## 📋 Estrutura do Repositório

```bash
.
├── 3_semestre
│       ├── automatos
│       └── projeto_algoritmos_1
├── 4_semestre
│       ├── analise_algoritmos
│       ├── matematica_computacional
│       ├── programacao_2
│       ├── programacao_logica
│       └── projeto_algoritmos_2
└── .gitignore
```

## 🛠️ Configurações do Repositório

- **Gitignore:** Centralizado na raiz para gerenciar múltiplas linguagens (Java, Python, C, Node.js) e evitar o rastreio de binários ou `node_modules`.
- **Status dos Projetos:** Projetos marcados como "Concluídos" representam entregas acadêmicas. Versões refatoradas para portfólio (Clean Architecture/TDD) são mantidas em repositórios independentes.
- **Documentação:** Cada projeto possui um README específico detalhando o contexto, tecnologias utilizadas e instruções de execução.

---

## 🚀 Como Executar os Projetos

Cada diretório possui suas dependências específicas. Em geral:

- **Python:** Recomenda-se o uso de `venv`. Documentação de dependências em `requirements.txt`.
- **Java:** Projetos estruturados para execução via VS Code ou terminal (javac).
- **Node/TS:** Utilize `npm install` e `npm run build` conforme descrito nos sub-readmes.

### Execução Rápida por Stack

```bash
# Python
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Java (Maven)
mvn clean test

# Node.js / TypeScript
npm install
npm run build
```

---
