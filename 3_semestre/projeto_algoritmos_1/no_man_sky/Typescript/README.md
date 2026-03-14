# Código-Fonte do Cliente (TypeScript)

Este diretório contém o código-fonte completo da aplicação cliente (frontend) do jogo, escrito inteiramente em TypeScript.

A principal responsabilidade do código nesta pasta é gerenciar toda a lógica do jogo que executa no navegador do usuário. Isso inclui:

* Gerenciamento do estado do jogo (posição do jogador, inimigos, inventário).
* Manipulação das interações do usuário (cliques em botões).
* Renderização dinâmica da interface (UI) e atualização das informações na tela.
* Comunicação com o servidor backend para persistência de dados.

## Arquitetura de Módulos

O código está organizado em uma arquitetura modular, onde cada subdiretório possui uma responsabilidade clara e bem definida.

### **[`main.ts`](./main.ts)**
Este é o **ponto de entrada (entry point)** da aplicação. Ele é responsável por:
* Inicializar a instância principal do `GameMaster`.
* Capturar as referências para todos os elementos do DOM.
* Registrar todos os `event listeners` para os botões da interface.
* Orquestrar o fluxo principal do jogo, chamando as funções de renderização e de ação.

### **[`classes/`](./classes/)**
Contém as classes que modelam os objetos de domínio do jogo, encapsulando o estado e o comportamento das principais entidades do universo do jogo. É o coração da lógica de negócios.

### **[`components/`](./components/)**
Uma biblioteca de estruturas de dados fundamentais e reutilizáveis (Tabela Hash, Heap, Pilha, etc.), todas construídas do zero. Serve como a base algorítmica para as classes de domínio.

### **[`contract/`](./contract/)**
A espinha dorsal dos dados do projeto. Define, através de `interfaces` e `enums`, todos os "contratos" de dados, garantindo consistência e segurança de tipos em toda a aplicação. Também contém os dados estáticos do jogo, como templates de itens e inimigos.

### **[`functions/`](./functions/)**
Módulos com funções "puras" e reutilizáveis que servem como camadas de serviço. Estão agrupadas por responsabilidade, como comunicação com a API (`chamados.ts`), manipulação da UI (`acoes_html.ts`) e algoritmos genéricos (`ordenacao.ts`).

### **[`debug/`](./debug/)**
Contém implementações alternativas e código utilizado para fins de teste e referência, como uma versão do servidor construída com o framework Express.js. Este código não faz parte da entrega final do projeto acadêmico.