# No Man's Sky - Projeto de Algoritmos
Bem-vindo ao projeto No Man's Sky!

Este trabalho é a culminação de uma atividade da disciplina Projeto de Algoritmos, com o objetivo central de colocar em prática as estruturas de classes e as operações de algoritmos que aprendemos em aula. Inspirado no aclamado jogo de exploração espacial, desenvolvemos uma simulação que mergulha na gestão de um universo procedural, na exploração dinâmica de planetas e áreas, e no gerenciamento intuitivo de inventário.

## A Essência do Projeto
Esse projeto recria, em menor escala, a essência das mecânicas de No Man's Sky. O foco principal está na construção de um universo vasto e explorável, composto por sistemas solares, planetas diversos e áreas únicas. Você, como jogador, terá seu próprio personagem e uma nave para desbravar esses cenários, interagindo com o ambiente e seus recursos.

### Obs
Para utilizar uma estratégia de "chuncks", ou seja, carregar uma determinada quantidade de classes e apagar as que fugirem da limitação, foi utilizada a biblioteca `seedrandom`. Para usá-la em typescript é preciso instalá-la pelo terminal com:
```
npm install seedrandom
npm install --save-dev @types/seedrandom
```

## Estruturas de Dados e Algoritmos em Ação
Aqui, você encontrará um mergulho profundo no coração do nosso código. Detalhamos as estruturas de dados e os métodos de algoritmos essenciais que foram meticulosamente integrados ao projeto. Cada seção demonstra como esses conceitos, antes teóricos, ganham vida e aplicabilidade em cenários práticos de desenvolvimento de software.

## Vetor com números aleatórios
 Vetores/Arrays são coleções ordenadas de elementos, e a capacidade de gerar sequências numéricas aleatórias dentro deles é a chave para simular a imprevisibilidade do universo. Isso nos permite criar experiências de jogo dinâmicas, onde a distribuição de recursos ou a ocorrência de eventos não são estáticas, mas sim geradas de forma procedural.
 
### Utilização no Código Principal

### Recorte do Código
```
```

## Fila normal
Uma fila é uma estrutura de dados linear que segue a lógica "Primeiro a Entrar, Primeiro a Sair" (FIFO - First-In, First-Out). Imagine uma fila de espera: quem chega primeiro, é atendido primeiro.

### Utilização no Código Principal

### Recorte do Código
```
```

## Fila bidirecional
Uma fila bidirecional, ou deque (do inglês double-ended queue), oferece a flexibilidade de adicionar e remover elementos de ambas as extremidades: tanto do início quanto do fim.

### Utilização no Código Principal

### Recorte do Código
```
```

## Pilha com node
Uma pilha é uma estrutura de dados que opera sob o princípio "Último a Entrar, Primeiro a Sair" (LIFO - Last-In, First-Out). Na implementação "com Node", cada elemento da pilha é um nó que aponta para o próximo nó, criando uma sequência encadeada de elementos.

### Utilização no Código Principal

### Recorte do Código
```
```

## Pilha com array
Semelhante à pilha com Node, esta é uma estrutura LIFO, mas sua implementação utiliza um array subjacente para armazenar os elementos. As operações de empilhar (push) e desempilhar (pop) são realizadas diretamente nas extremidades do array, aproveitando a eficiência inerente dos arrays em linguagens como JavaScript/TypeScript.

### Utilização no Código Principal

### Recorte do Código
```
```

## Lista circular com node
Uma lista encadeada especial onde o último nó aponta de volta para o primeiro, formando um ciclo contínuo. Isso permite a travessia ininterrupta da lista em qualquer direção, sem um "fim" definido.

### Utilização no Código Principal

### Recorte do Código
```
```

## Lista ligada com node
Uma lista ligada (ou encadeada) é uma estrutura de dados fundamental onde cada elemento, ou "nó", contém os dados e um ponteiro (ou referência) para o próximo nó na sequência. Isso oferece grande flexibilidade para inserções e remoções eficientes em qualquer posição.

### Utilização no Código Principal

### Recorte do Código
```
```
## Lista ligada com set
Esta estrutura representa um aninhamento poderoso de duas das nossas implementações: a Lista Ligada (ListaVinculada) e o Conjunto (Conjunto). Ela permite criar uma sequência ordenada de coleções de elementos únicos. Imagine a flexibilidade de uma lista ligada, onde você pode facilmente adicionar, remover e navegar entre "caixas", mas cada uma dessas "caixas" é, na verdade, um Conjunto, garantindo que o conteúdo de cada caixa seja sempre exclusivo.

### Utilização no Código Principal

### Recorte do Código
```
```

## Método ForEach
O método `forEach` é uma ferramenta iterativa poderosa que executa uma função de callback uma única vez para cada elemento em uma coleção, como um array ou uma estrutura que implementa essa iteração. Ele é valorizado por sua clareza e por não modificar a coleção original.

### Utilização no Código Principal

### Recorte do Código
```
```

## Método Filter
O método `filter` é uma função de array que cria um novo array, contendo apenas os elementos da coleção original que passaram em um teste lógico definido por uma função de callback fornecida. É excelente para refinar dados.

### Utilização no Código Principal

### Recorte do Código
```
```

## Método Every
O método `every` é uma função de array que testa se todos os elementos em uma coleção passam em um teste lógico fornecido por uma função de callback. Ele retorna um valor booleano (true ou false), indicando se a condição foi satisfeita para todos os elementos.

### Utilização no Código Principal

### Recorte do Código
```
```

## Dicionário
A classe `Dicionario` é uma implementação personalizada inspirada na estrutura `Map` do JavaScript/TypeScript. Ela permite armazenar pares chave-valor de forma eficiente, aceitando qualquer tipo de objeto como chave (desde que seja possível convertê-lo para string de forma única). Entre suas principais funcionalidades estão a inserção, remoção, busca, iteração e listagem de chaves e valores. Além disso, oferece métodos utilitários como `forEach`, `toString` e suporte à iteração com `for...of`, tornando-a uma ferramenta versátil para gerenciar coleções dinâmicas de dados no projeto.

### Utilização no Código Principal

### Recorte do Código
```
```

## Tabela Hash

A classe `TabelaHash` é uma implementação personalizada de uma tabela hash, permitindo armazenar e acessar pares chave-valor de forma eficiente por meio de uma função de hash. Ela aceita funções customizadas para gerar o hash e para converter a chave em string, tornando-se flexível para diferentes tipos de dados. Entre suas principais funcionalidades estão inserir, buscar, remover, limpar e listar elementos, além de retornar uma representação textual da tabela. É ideal para cenários onde buscas rápidas por chave são essenciais.

### Utilização no Código Principal

### Recorte do Código
```
```
