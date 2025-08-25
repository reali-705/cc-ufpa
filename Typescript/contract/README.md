# Contratos de Dados, Enums e Dados do Jogo

Este diretório serve como a **única fonte de verdade** para as estruturas de dados do projeto. Ele define os "contratos" (`interfaces`), as constantes nomeadas (`enums`) e os dados estáticos do jogo (`gameData.ts`) que são utilizados por todas as outras camadas da aplicação, desde as classes de lógica até o servidor e a interface do usuário.

A principal função deste diretório é garantir a **consistência e a segurança de tipos (type safety)** em todo o projeto, aproveitando os recursos mais poderosos do TypeScript.

## Descrição dos Arquivos

---

### [`enums.ts`](./enums.ts)
Este arquivo centraliza todos os tipos enumerados (`enum`) do jogo. Enums são utilizados para criar um conjunto fixo de constantes nomeadas, o que previne o uso de "números mágicos" ou "strings mágicas" no código, tornando-o mais legível e menos propenso a erros.

* `Raridade`: Define os níveis de raridade para itens (Comum, Incomum, Raro, etc.).
* `Tamanho`: Define os tamanhos possíveis para planetas (Pequeno, Médio, Grande).
* `Elemento`: Define os tipos de recursos existentes no universo (Minerais, Gases, etc.).
* `TipoBioma`: Define os tipos de biomas que podem existir em um planeta (Floresta, Deserto, etc.).
* `TipoPlaneta`: Define as classificações de planetas (Terrestre, Gasoso, etc.).
* `TipoInimigo`: Define as categorias de inimigos (Sentinela, Fera, etc.).

---

### [`interfaces.ts`](./interfaces.ts)
Este arquivo define as "plantas" ou "contratos" para todos os objetos complexos do sistema usando `interfaces` do TypeScript. Uma interface garante que qualquer objeto que a implemente terá uma forma específica, com propriedades e tipos pré-definidos.

* `Item`: Define a estrutura de um recurso minerável.
* `dataBioma`: Define a estrutura de dados para um bioma, incluindo seu tipo e os itens que contém.
* `dataPersonagem`: Uma interface base que define os atributos comuns a todas as entidades vivas (vida, escudo, nome).
* `dataJogador`: Herda de `dataPersonagem` e adiciona atributos específicos do jogador (histórico, inventário, moedas).
* `dataInimigo`: Herda de `dataPersonagem` e adiciona atributos específicos de inimigos (dano, resistência).
* `dataPlaneta`: Define a estrutura de dados para um planeta, incluindo seus biomas e a lista de inimigos.
* `dataGameMaster`: Define a estrutura de dados para o objeto de save principal, contendo os dados do jogador e do planeta.

---

### [`gameData.ts`](./gameData.ts)
Este arquivo funciona como o "banco de dados estático" do jogo. Ele separa os **dados** da **lógica**, permitindo que o balanceamento do jogo (ex: quais recursos um bioma tem, os status base de um inimigo) seja alterado facilmente sem precisar modificar as classes.

* `ELEMENTOS`: Um objeto que mapeia cada `Elemento` a uma lista de `Items` específicos daquele tipo.
* `BIOMAS_ELEMENTOS`: Mapeia cada `TipoBioma` a uma lista de `Elementos` que podem ser encontrados nele.
* `PLANETAS_BIOMAS`: Mapeia cada `TipoPlaneta` a uma lista de `TipoBioma` que podem ocorrer naquele planeta.
* `INIMIGOS_DATA`: Mapeia cada `TipoInimigo` a um "template" com seus status base (vida máxima, dano, etc.), servindo como base para a geração procedural de inimigos.