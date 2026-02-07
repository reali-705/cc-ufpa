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
