# Classes de Domínio do Jogo

Este diretório contém as classes principais que representam os "objetos de domínio" do jogo — ou seja, os atores, ambientes e sistemas que compõem o mundo do No Man's Sky. Essas classes encapsulam o estado e o comportamento (as "regras do jogo"), interagindo com as estruturas de dados fundamentais do diretório `components/` para executar a lógica do game.

## Arquitetura de Herança

Uma característica central da arquitetura deste diretório é o uso de herança para modelar as entidades do jogo. A classe `Personagem` serve como uma base para qualquer ser vivo no jogo, com `Jogador` e `Inimigo` especializando esse comportamento com suas próprias características e habilidades.

```
Personagem
├── Jogador
└── Inimigo
```

## Descrição das Classes

Abaixo está a lista de todas as classes neste diretório.

---

### **[`bioma.ts`](./bioma.ts) (`Bioma`)**
Representa uma área geográfica específica dentro de um `Planeta`, com um ecossistema próprio.

* **Principais Responsabilidades:**
    * Manter um conjunto de recursos minerais únicos.
    * Ser gerado proceduralmente com base no tipo de planeta.
* **Estruturas de Dados Utilizadas:**
    * `Conjunto`: Para garantir que os recursos disponíveis no bioma não sejam duplicados.

---

### **[`gameMaster.ts`](./gameMaster.ts) (`GameMaster`)**
É a classe orquestradora central, o "maestro" que gerencia o estado geral do jogo e conecta todas as outras partes.

* **Principais Responsabilidades:**
    * Manter a instância principal do `Jogador` e do `Planeta` atual.
    * Controlar o estado do jogo (ex: `explorando`, `combate`).
    * Processar as ações do usuário (mover, atacar, fugir) e delegá-las às classes apropriadas.
    * Iniciar encontros de combate.
* **Estruturas de Dados Utilizadas:**
    * `Dicionario`: Para mapear os IDs dos biomas aos seus nós na lista encadeada, permitindo acesso O(1) à posição atual do jogador.

---

### **[`inimigo.ts`](./inimigo.ts) (`Inimigo`)**
Representa uma entidade hostil que o jogador pode encontrar e batalhar. Herda de `Personagem`.

* **Principais Responsabilidades:**
    * Possuir atributos de combate únicos como `dano` e `resistencia`.
    * Calcular seu próprio `poder`, um índice usado para a fila de prioridade.
    * Ser gerado proceduralmente a partir de templates definidos em `gameData.ts`.
    * Possuir um método `atacar()` para o combate.
* **Estruturas de Dados Utilizadas:** Nenhuma diretamente, mas foi projetado para ser armazenado em um `Heap`.

---

### **[`inventario.ts`](./inventario.ts) (`Inventario`)**
Representa o inventário do jogador, com capacidade limitada.

* **Principais Responsabilidades:**
    * Armazenar os itens coletados e suas quantidades.
    * Validar se um item pode ser adicionado com base na capacidade restante e no tamanho do item.
* **Estruturas de Dados Utilizadas:**
    * `Dicionario`: Para mapear cada `Item` à sua `quantidade`, garantindo acesso rápido e fácil atualização.

---

### **[`jogador.ts`](./jogador.ts) (`Jogador`)**
Representa o personagem controlado pelo usuário. Herda de `Personagem`.

* **Principais Responsabilidades:**
    * Manter o estado do personagem (vida, escudo, moedas).
    * Gerenciar seu `Inventario` e `historico` de movimento.
    * Possuir ações únicas como `minerar`, `recuperarEscudo` e `calcularDano`.
* **Estruturas de Dados Utilizadas:**
    * `Pilha`: Para armazenar o histórico de biomas visitados.
    * `Inventario`: A classe que gerencia os itens.

---

### **[`personagem.ts`](./personagem.ts) (`Personagem`)**
É a classe base que define os atributos e comportamentos comuns a todas as entidades vivas do jogo.

* **Principais Responsabilidades:**
    * Definir propriedades compartilhadas: `nome`, `vida`, `vidaMaxima`, `escudo` e `escudoMaximo`.
    * Fornecer métodos comuns que podem ser herdados ou sobrescritos, como `receberDano()` e `estaVivo()`.
* **Estruturas de Dados Utilizadas:** Nenhuma.

---

### **[`planeta.ts`](./planeta.ts) (`Planeta`)**
Representa o mundo explorável onde a sessão de jogo acontece.

* **Principais Responsabilidades:**
    * Ser gerado proceduralmente com um tipo e um conjunto de `Biomas`.
    * Manter a população de `Inimigos` do mundo.
    * Fornecer a coleção de todos os recursos disponíveis em sua superfície.
* **Estruturas de Dados Utilizadas:**
    * `ListaVinculadaCircular`: Para armazenar os biomas de forma a permitir a exploração contínua.
    * `Heap`: Para gerenciar os inimigos como uma fila de prioridade.