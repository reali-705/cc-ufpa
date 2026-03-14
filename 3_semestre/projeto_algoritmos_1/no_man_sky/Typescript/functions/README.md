# Funções de Utilidade e Ações da Interface

Este diretório contém módulos com funções independentes e exportáveis (`stateless functions`) que servem como ferramentas e camadas de serviço para o restante da aplicação. Elas são agrupadas por responsabilidade, como a comunicação com o servidor, a manipulação da interface e algoritmos genéricos.

## Descrição dos Arquivos

---

### [`acoes_html.ts`](acoes_html.ts)
Este arquivo atua como a **camada de tradução** ou "ponte" entre a interface do usuário (controlada pelo `main.ts`) e a lógica principal do jogo (orquestrada pelo `GameMaster`).

* **Principais Responsabilidades:**
    * **Ações do Jogador:** Contém as funções que são diretamente chamadas pelos `event listeners` dos botões (ex: `mover`, `atacar`, `fugir`, `recuperarEscudo`). Elas invocam os métodos correspondentes no `GameMaster`.
    * **Formatação de Saída:** Lidam com a criação e formatação das mensagens de texto que são exibidas nos "Diários de Bordo" da interface.
    * **Seleção de Dados para UI:** Contém as funções `getUIDados...` que extraem o estado atual do `GameMaster` (dados do jogador, planeta, inimigo) e o formatam de maneira pronta para ser exibido na tela, desacoplando a renderização da lógica principal.

---

### [`chamados.ts`](./chamados.ts)
Este é o **módulo de comunicação com a API** (`API client`). Ele centraliza toda a lógica de `fetch` e é o único arquivo no frontend que "conversa" com o servidor.

* **Principais Responsabilidades:**
    * `carregarJogo`: Envia uma requisição `GET` para a rota `/carregar` do servidor para obter os dados de um jogo salvo, passando as credenciais do jogador.
    * `salvarJogo`: Envia uma requisição `POST` para a rota `/salvar` do servidor, enviando o estado atual do jogo (o objeto `dataGameMaster`) no corpo da requisição para ser persistido.
    * **Tratamento de Respostas:** Gerencia as respostas HTTP, convertendo-as de JSON e tratando os erros de comunicação com o servidor.

---

### [`ordenacao.ts`](./ordenacao.ts)
Funciona como uma biblioteca de algoritmos de ordenação clássicos, implementados de forma genérica.

* **Principais Responsabilidades:**
    * **Prover Algoritmos:** Exporta implementações de `HeapSort`, `MergeSort`, `QuickSort`, `BubbleSort`, `SelectionSort` e `InsertionSort`.
    * **Flexibilidade:** Todas as funções são genéricas (`<T>`) e recebem uma função de comparação como parâmetro, podendo assim ordenar qualquer tipo de array de objetos com base em qualquer critério.

---

### [`utilidades.ts`](./utilidades.ts)
É uma coleção de pequenas funções auxiliares de propósito geral, usadas em várias partes do projeto.

* **Principais Responsabilidades:**
    * `sortearLista`: Recebe um array e retorna um de seus elementos de forma aleatória.
    * `sortearEnum`: Uma função robusta que recebe um `enum` do TypeScript e retorna um de seus membros aleatoriamente, lidando corretamente tanto com enums numéricos quanto com enums de string.