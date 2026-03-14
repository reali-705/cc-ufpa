# Projeto No Man's Sky - Estruturas de Dados

Este é um projeto acadêmico desenvolvido para a disciplina de Projeto de Algoritmos 1, cujo objetivo principal é aplicar, em um contexto prático e lúdico, as estruturas de dados e algoritmos estudados em sala de aula. O resultado é um mini-jogo de exploração espacial inspirado em "No Man's Sky", desenvolvido em TypeScript e executado em um ambiente de navegador com um servidor Node.js para persistência de dados.

## 📜 Sobre a Inspiração: No Man's Sky

**No Man's Sky** é um renomado jogo de exploração e sobrevivência espacial desenvolvido pela Hello Games. Sua principal característica é um universo gerado proceduralmente, contendo bilhões de planetas únicos para descobrir. Os jogadores exploram, coletam recursos, constroem, negociam e lutam em uma vasta galáxia, com uma forte ênfase na descoberta e na jornada pessoal.

## ✨ Mecânicas e Funcionalidades do Projeto

Este projeto implementa uma versão simplificada de algumas das mecânicas centrais de No Man's Sky, focando na aplicação de estruturas de dados:

* **Geração Procedural de Mundos:** Criação de planetas, biomas e populações de inimigos de forma aleatória.
* **Exploração Circular:** Movimentação contínua entre biomas (Leste/Oeste).
* **Coleta de Recursos:** Mineração de itens específicos de cada bioma.
* **Gerenciamento de Inventário:** Sistema de inventário com capacidade limitada.
* **Sistema de Combate por Turnos:** Encontros aleatórios com inimigos, com ações de atacar, fugir e se recuperar.
* **Fila de Prioridade de Inimigos:** Os inimigos são organizados em um Heap para que o mais fraco sempre seja encontrado primeiro.
* **Sistema de Login e Persistência:** O progresso do jogador é salvo em arquivos JSON no servidor, gerenciado por uma Tabela Hash.

## 🏛️ Arquitetura e Estrutura de Módulos

O projeto é dividido em módulos com responsabilidades bem definidas, facilitando a manutenção e a compreensão do código. Cada diretório principal contém seu próprio `README.md` com documentação detalhada.

O coração do projeto reside no diretório `Typescript/components/`, onde as estruturas de dados foram implementadas do zero, **sendo este o foco principal da avaliação acadêmica.**

* **[`Typescript/`](./Typescript/)**: Contém todo o código-fonte da aplicação cliente (frontend). É o cérebro do jogo, gerenciando o estado, as interações e a renderização no navegador.

* **[`Typescript/components/`](./Typescript/components/)**: **(FOCO ACADÊMICO)** Uma biblioteca de estruturas de dados fundamentais e reutilizáveis (Tabela Hash, Heap, Pilha, etc.), todas construídas do zero para este projeto.

* **[`Typescript/classes/`](./Typescript/classes/)**: As classes que modelam os objetos de domínio do jogo (GameMaster, Jogador, Planeta), encapsulando as regras de negócio e o estado do jogo.

* **[`Typescript/contract/`](./Typescript/contract/)**: A espinha dorsal dos dados do projeto. Define, através de `interfaces` e `enums`, todos os "contratos" de dados, garantindo consistência e segurança de tipos.

* **[`Typescript/functions/`](./Typescript/functions/)**: Módulos com funções reutilizáveis que servem como camadas de serviço, como a comunicação com o servidor, manipulação da UI e algoritmos de ordenação.

* **[`Typescript/server/`](./Typescript/server/)**: O código do servidor backend em Node.js, responsável exclusivamente pela persistência de dados (salvar e carregar os jogos).

* **[`Typescript/_debug/`](./Typescript/_debug/)**: Contém uma implementação alternativa do servidor usando o framework Express.js, mantida como referência e para fins de comparação de tecnologias.

## 🚀 Começando

Siga estas instruções para compilar e executar o projeto em sua máquina local.

### Pré-requisitos

Você precisará ter o Node.js e o npm (Node Package Manager) instalados.

* **Node.js** (versão 18.x ou superior recomendada)
    * [Link para download do Node.js](https://nodejs.org/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/reali-705/NoManSky.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```sh
    cd NoManSky
    ```
3.  **Instale as dependências:**
    ```sh
    npm install
    ```
4.  **Compile o código TypeScript para JavaScript:**
    ```sh
    npm run b   # Para Windows
    npm run bl  # Para Linux
    ```
    *Este comando irá transpilar todos os arquivos da pasta `Typescript/` para a pasta `Javascript/`.*

5.  **Inicie o servidor local:**
    ```sh
    npm run start
    ```
    *O terminal deve exibir a mensagem "Servidor rodando em http://localhost:3000".*

6.  **Abra o jogo:** Abra seu navegador e acesse a URL `http://localhost:3000`.

## 📂 Estrutura de Arquivos

A estrutura de arquivos do projeto, incluindo a documentação, está organizada da seguinte forma:

```
/
├── Javascript/         # Arquivos JavaScript compilados (saída do tsc)
├── Jsons/              # Local onde os jogos salvos são armazenados
│   └── README.md
├── server/
│   ├── servidor.ts
│   └── README.md
├── Typescript/
│   ├── _debug/
│   │   ├── _referencia.ts
│   │   └── README.md
│   ├── classes/
│   │   └── README.md
│   ├── components/
│   │   └── README.md
│   ├── contract/
│   │   └── README.md
│   ├── functions/
│   │   └── README.md
│   ├── main.ts
│   └── README.md
├── index.html
├── package.json
├── README.md           # <-- Este arquivo
├── style.css
└── tsconfig.json
```

## ✒️ Autor

-   **Alessandro Reali Lopes Silva** - [alessandro.reali.3110@gmail.com](mailto:alessandro.reali.3110@gmail.com)