# Resolução dos Desafios *Jesse and Cookies* e *No Prefix Set*

Este diretório contém as soluções para os desafios de algoritmos propostos na atividade 2, utilizando Python. Essa atividade é um trabalho em grupo, sendo os integrantes:

1. [Alessandro Reali Lopes Silva](https://github.com/reali-705)
2. [Felipe Lisboa Brasil](https://github.com/FelipeBrasill)

## Relatório do *Jesse and Cookies*

### Introdução

O problema Jesse and Cookies consiste em encontrar o número mínimo de operações necessárias para transformar um conjunto de biscoitos, representados por uma lista de valores inteiros de doçura, de modo que todos atinjam um nível de doçura mínimo $k$. A operação de mistura utiliza os dois biscoitos menos açucarados da lista para gerar um novo elemento seguindo a fórmula:

$$\text{nova\_doçura} = (1 \times \text{menor doçura}) + (2 \times \text{segunda menor doçura})$$

O algoritmo deve processar a lista iterativamente até que todos os elementos sejam maiores ou iguais a $k$, ou retornar $-1$ caso seja impossível atingir o objetivo com os elementos disponíveis.

### Implementação

Para a resolução eficiente deste desafio, foi utilizada a estrutura de dados Min-Heap (Fila de Prioridade). A escolha fundamenta-se na necessidade de acessar e remover constantemente os dois menores valores da coleção.

A lógica de implementação seguiu os seguintes passos:

- **Heapificação:** A lista inicial foi convertida em um Min-Heap em tempo $O(n)$.
- **Processamento:** Em cada iteração, os dois menores elementos foram extraídos utilizando a operação heappop, que possui complexidade $O(\log n)$.
- **Reinserção:** O novo valor calculado foi inserido de volta na estrutura através da operação heappush, também com complexidade $O(\log n)$.

O ciclo se repete enquanto o elemento no topo do Heap (o menor de todos) for inferior ao valor de referência $k$.

### Conclusão

A utilização do Min-Heap provou-se a estratégia mais adequada para este problema de otimização. Diferente de uma abordagem por ordenação simples, que exigiria $O(n \log n)$ a cada nova inserção para manter a lista organizada, o Heap mantém a propriedade de ordem parcial necessária com custo reduzido.
A complexidade assintótica final da solução é de $O(M \log n)$, onde $M$ representa a quantidade de operações de mistura realizadas até atingir o valor de referência e $n$ o número de elementos. Esta eficiência é crucial para que o algoritmo seja capaz de processar grandes volumes de dados dentro dos limites de tempo estabelecidos pela plataforma HackerRank.

---
# Resolução do Desafio *No Prefix Set*


## Introdução

O problema *No Prefix Set* consiste em verificar se um conjunto de palavras forma um **conjunto “bom”** (*Good Set*), no qual **nenhuma palavra é prefixo de outra**, ou um **conjunto “ruim”** (*Bad Set*), caso alguma palavra seja prefixo de outra ou igual a outra.  

A entrada consiste em uma lista de palavras fornecidas na ordem de teste. O algoritmo deve **identificar o primeiro erro** e imprimir:

Caso não haja conflito de prefixos, deve imprimir:
**GOOD SET**
Caso contrário:
**BAD SET**
<palavra atual do erro>

---

## Implementação

Para resolver o problema de forma eficiente, utilizamos a estrutura **Trie (Árvore de Prefixos)**. A escolha da Trie baseia-se na necessidade de verificar **prefixos em tempo linear em relação ao tamanho da palavra**.  

### Estrutura da Trie

- Cada **nó** da Trie representa um caractere.  
- Cada nó contém:
  - `filhos`: um dicionário que mapeia caracteres para os próximos nós.  
  - `e_final`: um booleano que indica se alguma palavra termina naquele nó.  

---

### Lógica de verificação

1. Inicializamos a Trie vazia (`raiz`).  
2. Para cada palavra na lista:  
   - Percorremos a Trie caractere a caractere.  
   - Se passamos por um nó com `e_final = True` → alguma palavra anterior é prefixo da atual → **BAD SET**.  
   - Se chegamos no final da palavra e o nó possui filhos → a palavra atual é prefixo de alguma palavra anterior → **BAD SET**.  
   - Caso contrário, inserimos a palavra na Trie marcando o nó final com `e_final = True`.  
3. Se todas as palavras forem inseridas sem conflitos → **GOOD SET**.  

---

### Complexidade assintótica

- Inserção ou verificação de uma palavra na Trie: **O(L)**, sendo L o comprimento da palavra.  
- Para n palavras: **O(n * L)**.  
- Comparado com uma abordagem de verificação de prefixo entre todas as palavras (**O(n² * L)**), a Trie oferece **ganho significativo de desempenho**, tornando a solução adequada para grandes volumes de dados.  

---

### Conclusão

A utilização da Trie permite verificar **prefixos de forma incremental e eficiente**, respeitando a ordem de entrada das palavras, como exige o enunciado.  

- A solução identifica corretamente **o primeiro caso de BAD SET**.  
- Permite processar **até centenas de milhares de palavras com tamanho limitado** em tempo aceitável para plataformas como HackerRank.  

A escolha da Trie se mostra superior a métodos baseados em loops de comparação direta, oferecendo **simplicidade, clareza e eficiência**.

