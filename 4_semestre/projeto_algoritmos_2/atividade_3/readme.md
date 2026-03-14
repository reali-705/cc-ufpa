# Implementação do Algoritmo Shift-And Aproximado

**Universidade Federal do Pará (UFPA)**  
**Instituto de Ciências Exatas e Naturais (ICEN)**

- **Matéria:** Projetos de Algoritmos 2
- **Discente:** Denis Lima do Rosario
- **Grupo:**

1. Alessandro Reali Lopes Silva
2. Felipe Lisboa Brasil
3. Gian Victor Gonçalves Figueiredo

---

## Sobre o projeto

Este projeto implementa o algoritmo **Shift-And Aproximado** para busca de padrões em texto,
permitindo encontrar ocorrências com até **k erros** (inserção, remoção ou substituição).

A atividade foi desenvolvida para fins didáticos na disciplina de **Projetos de Algoritmos 2**,
com foco em:

- representação de estados por **máscaras de bits**;
- busca aproximada de cadeias de caracteres;
- análise de execução com textos gerados automaticamente.

---

## Como o algoritmo funciona

O Shift-And tradicional realiza busca exata usando operações bit a bit.
Nesta versão aproximada, o algoritmo mantém múltiplos estados (de `0` até `k` erros),
atualizando cada estado a cada caractere do texto com quatro possibilidades:

- **casamento exato**;
- **substituição**;
- **inserção**;
- **remoção**.

Quando o bit de sucesso da chave é ativado no estado `k`, considera-se que houve
uma ocorrência válida do padrão com até `k` erros.

---

## Estrutura dos arquivos

- `main.py`
  - Ponto de entrada da aplicação.
  - Controla o fluxo de menus, geração de texto e execução das buscas.

- `shift_and_aproximado.py`
  - Implementação principal do algoritmo.
  - Funções:
    - `preprocessar_chave(chave)`: cria a máscara de bits da chave;
  - `buscar(texto, chave, k)`: retorna os índices de ocorrência com até `k` erros.

- `util.py`
  - Funções auxiliares para:
  - geração de texto aleatório;
    - geração de texto contendo padrão (exato e com variações);
    - menus interativos;
    - visualização de resultados e tempo de execução.

- `ProjAlgII.ipynb`
  - Notebook para experimentos e análises complementares.

---

## Requisitos

- Python 3.10+
- Dependências listadas em `requirements.txt`

Instalação das dependências (na raiz do projeto):

```bash
pip install -r requirements.txt
```

---

## Como executar

No terminal, a partir da raiz do repositório:

```bash
cd atividade_3
python main.py
```

Ao executar, o programa permite:

1. escolher o tamanho do texto;
2. selecionar o tipo de geração (aleatório, com padrão ou testes automáticos);
3. informar o padrão de busca;
4. definir o número máximo de erros `k` (de 0 a 2);
5. visualizar os índices encontrados e o tempo de execução.

---

## Saída esperada

O programa apresenta:

- os índices onde o padrão foi encontrado (com até `k` erros);
- um contexto textual ao redor de cada índice;
- o tempo de execução da busca.

---

## Observações

- A busca pode ser feita com ou sem diferenciação entre maiúsculas e minúsculas.
- O modo de testes aleatórios permite avaliar o comportamento do algoritmo em múltiplas execuções.
