# Programação em Lógica

> Esse projeto é parte do repositório centralizador de atividades acadêmicas da graduação em Ciência da Computação na UFPA.

Este repositório tem o objetivo de registrar a evolução e a implementação de bases de conhecimento e regras lógicas usando a linguagem Prolog.

## Universidade Federal do Pará (UFPA)

**Curso:** Ciência da Computação  
**Disciplina:** Programação em Lógica (EN05218)  
**Semestre:** 4º Semestre (2025.4)  
**Professor:** Josivan Rodrigues dos Reis  
**Aluno:** Alessandro Reali Lopes Silva  

---

## 🤖 Tecnologias Utilizadas

- **Linguagem:** [Prolog](https://www.swi-prolog.org/) (utilizando a implementação **SWI-Prolog**)

## 🗂️ Conteúdo

Atualmente, o repositório contém os seguintes arquivos e projetos:

### 1. [`familia.pl`](./familia.pl)

Primeiro contato com Prolog. Uma base de conhecimento que modela uma árvore genealógica, definindo fatos sobre indivíduos e implementando regras para inferir parentescos.

### 2. [`atividade1.pl`](./atividade1.pl)

Atividade em sala para criação de regras, abordando uma cadeia alimentar e a relação entre alunos e professores em disciplinas.

### 3. [`fibonacci.pl`](./fibonacci.pl)

Atividade de introdução à recursividade em Prolog, com uma implementação otimizada para calcular a sequência de Fibonacci.

### 4. [`mergesort.pl`](./mergesort.pl)

Implementação do algoritmo Merge Sort em Prolog, incluindo divisão da lista em metades, mesclagem ordenada e exemplos de consultas para testar os predicados `dividir/3`, `merge/3` e `mergesort/2`.

### 5. [`robo_domestico/`](./robo_domestico/readme.md)

Projeto de sistema especialista em Prolog para um cenário de robô doméstico, com separação entre base de dados, regras de inferência, menu interativo e fluxo principal de execução.

### 6. [`sistema_recomendacao_pc/`](./sistema_recomendacao_pc/README.md)

Sistema especialista para recomendação de hardware, aplicando regras de compatibilidade entre componentes, análise de orçamento e filtragem de configurações para diferentes perfis de uso.

---

## 🚀 Como Usar

1. Certifique-se de ter o [SWI-Prolog](https://www.swi-prolog.org/download/stable) instalado em sua máquina.
2. Clone este repositório para o seu computador.
3. Navegue até a pasta do projeto e inicie o interpretador SWI-Prolog:

    ```bash
    swipl
    ```

4. Dentro do interpretador, carregue (consulte) a base de conhecimento:

    ```prolog
    ?- consult('nome_do_arquivo.pl').
    true.
    ```

5. Pronto! Agora você pode fazer consultas à base de conhecimento.

---

> 🔙 [Voltar para o Repositório Central (CC-UFPA)](../../README.md)
