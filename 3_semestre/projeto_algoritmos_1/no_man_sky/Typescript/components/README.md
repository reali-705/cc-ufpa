# Componentes de Estruturas de Dados

Este diretório contém as implementações fundamentais e reutilizáveis das estruturas de dados que formam a base lógica para o projeto. Todas as classes aqui foram construídas do zero em TypeScript, sem o uso de bibliotecas externas, para demonstrar os conceitos teóricos de armazenamento e manipulação de dados.

## Estruturas Implementadas

Abaixo está a lista de todos os componentes disponíveis nesta pasta, com uma breve descrição de sua funcionalidade e onde são aplicados no jogo.

---

### **[`array.ts`](./array.ts) (`Vetor<T>`)**
Implementa a classe `Vetor`, um array dinâmico (lista) customizado.
* **Principais Características:** Gerencia sua própria capacidade, redimensionando-se automaticamente conforme novos itens são adicionados. Fornece métodos clássicos de array como `inserir`, `remover`, `ver`, e também funções de ordem superior como `map`, `filter` e `forEach`.
* **Uso no Projeto:** Utilizado, principalmente, como um recurso alternativo para a estrutura nativa `Array`, mas também como base para a classe `PilhaVetor`.

---

### **[`circularLinkedList.ts`](./circularLinkedList.ts) (`ListaVinculadaCircular<T>`)**
Implementa uma Lista Duplamente Encadeada e Circular.
* **Principais Características:** O último nó da lista aponta para o primeiro, e o primeiro aponta para o último, criando um ciclo contínuo. Permite a travessia infinita em ambas as direções (`next` e `prev`).
* **Uso no Projeto:** Essencial para a classe `Planeta`, onde armazena os `Biomas` e permite a mecânica de exploração circular (Leste/Oeste).

---

### **[`hashTable.ts`](./hashTable.ts) (`TabelaHashEncadeamentoSeparado<X, T>`)**
Implementa uma Tabela Hash (Dicionário) usando a estratégia de tratamento de colisões por "encadeamento separado".
* **Principais Características:** Mapeia chaves a valores. Em caso de colisão de hash, os elementos são armazenados em uma `ListaVinculada` no mesmo "bucket", garantindo que não haja perda de dados.
* **Uso no Projeto:** Peça central do sistema de login e persistência no `servidor.ts`. Mapeia as credenciais do jogador (`nome:senha`) a um nome de arquivo de save.

---

### **[`heap.ts`](./heap.ts) (`Heap<T>`)**
Implementa a estrutura de dados Heap, configurada como um Min-Heap.
* **Principais Características:** Estrutura de árvore (implementada com um array) que mantém o elemento de menor valor (de acordo com uma função de comparação) sempre na raiz. Possui métodos eficientes (`inserir`, `remover`) que mantêm a propriedade do heap automaticamente.
* **Uso no Projeto:** Utilizada na classe `Planeta` como uma **Fila de Prioridade** para os `Inimigos`. Garante que o jogador sempre encontre o inimigo com o menor "poder" disponível.

---

### **[`linkedList.ts`](./linkedList.ts) (`ListaVinculada<T>`)**
Implementa uma Lista Duplamente Encadeada padrão.
* **Principais Características:** Cada nó (`Node`) armazena um dado e referências para o elemento anterior (`prev`) e o próximo (`next`).
* **Uso no Projeto:** Serve como base para a `TabelaHashEncadeamentoSeparado`, onde cada "bucket" é uma instância desta lista.

---

### **[`maps.ts`](./maps.ts) (`Dicionario<X, T>`)**
Implementa uma classe de Dicionário (ou Mapa) genérica sobre um objeto JavaScript.
* **Principais Características:** Mapeia chaves a valores e permite o uso de objetos como chaves através de uma função de conversão para string.
* **Uso no Projeto:** Utilizado na classe `Inventario` para mapear um `Item` à sua `quantidade` e no `GameMaster` para mapear o ID de um `Bioma` ao seu nó na lista circular, permitindo acesso rápido.

---

### **[`node.ts`](./node.ts) (`Node<T>`)**
Implementa a classe `Node`, o bloco de construção para todas as estruturas de dados encadeadas.
* **Principais Características:** Contém uma propriedade `data` para armazenar o valor e duas referências, `next` e `prev`, para outros nós.
* **Uso no Projeto:** É a peça fundamental para `ListaVinculada`, `ListaVinculadaCircular`, `Pilha` e `FilaDupla`.

---

### **[`queue.ts`](./queue.ts) (`Fila<T>`)**
Implementa uma Fila clássica, seguindo o princípio FIFO (First-In, First-Out).
* **Principais Características:** As inserções (`inserir`) ocorrem no final (tail) e as remoções (`remover`) ocorrem no início (head).
* **Uso no Projeto:** Disponível como um componente de uso geral.

---

### **[`set.ts`](./set.ts) (`Conjunto<T>`)**
Implementa a estrutura de dados de Conjunto, que armazena apenas valores únicos.
* **Principais Características:** Utiliza um `Map` internamente para garantir unicidade e performance. Oferece operações clássicas de conjuntos como `union`, `intersection` e `difference`.
* **Uso no Projeto:** Usado na classe `Bioma` para garantir que a lista de `recursos` não contenha itens duplicados.

---

### **[`stacks.ts`](./staks.ts) (`Pilha<T>`)**
Implementa uma Pilha clássica, baseada em `Node`, seguindo o princípio LIFO (Last-In, First-Out).
* **Principais Características:** As inserções (`inserir`) e remoções (`remover`) ocorrem no mesmo extremo (topo).
* **Uso no Projeto:** Empregado na classe `Jogador` para armazenar o `historico` de movimentação.

---

### **[`stacksArray.ts`](./staksArray.ts) (`PilhaVetor<T>`)**
Implementa uma versão alternativa da Pilha, utilizando a classe `Vetor` como base.
* **Principais Características:** Demonstra uma abordagem diferente para a mesma estrutura de dados, com diferentes trade-offs de performance.
* **Uso no Projeto:** Disponível como uma implementação alternativa para fins acadêmicos.