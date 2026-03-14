# Servidor de Persistência

Este diretório contém o código do servidor backend do projeto, construído com **Node.js** e **TypeScript**, utilizando apenas os módulos nativos (`http`, `fs`, `path`, `url`).

O principal objetivo deste servidor é atuar como uma camada de persistência de dados simples e funcional para o jogo. Ele foi intencionalmente mantido minimalista para focar nos requisitos do projeto acadêmico, sem a necessidade de instalar e configurar um banco de dados complexo.

## Funcionalidades Principais

O servidor possui duas responsabilidades centrais:

1.  **API de Persistência:** Fornecer endpoints para que o cliente (o jogo no navegador) possa salvar e carregar o progresso do jogador.
2.  **Servidor de Arquivos Estáticos:** Servir os arquivos principais da aplicação (`index.html`, `style.css`, e os arquivos JavaScript compilados) para o navegador.

## Endpoints da API

A API consiste em duas rotas principais que manipulam os dados dos jogadores.

### `POST /salvar`
* **Descrição:** Salva ou atualiza o estado do jogo para um determinado jogador.
* **Corpo da Requisição (Body):** Espera um objeto JSON com a seguinte estrutura:
    ```json
    {
      "nome": "nomeDoJogador",
      "senha": "senhaDoJogador",
      "dados": { ...objeto dataGameMaster... }
    }
    ```
* **Funcionamento:** O servidor utiliza uma `TabelaHash` para encontrar o nome do arquivo de save associado ao `nome` e `senha`. Se um save já existe, ele é sobrescrito (Update). Se não existe, um novo arquivo de save é criado e registrado na tabela (Create implícito).

### `GET /carregar`
* **Descrição:** Carrega o estado do jogo para um determinado jogador.
* **Parâmetros da URL (Query Params):** Espera `nome` and `senha`.
    * **Exemplo:** `/carregar?nome=nomeDoJogador&senha=senhaDoJogador`
* **Funcionamento:** Utiliza a `TabelaHash` para encontrar o arquivo de save associado às credenciais. Se encontrado, retorna o conteúdo do arquivo JSON (Read). Se não, retorna um erro `404 Not Found`.

## Limitações e Escopo (Análise CRUD)

Como você bem notou, este servidor não implementa um sistema **CRUD** (Create, Read, Update, Delete) completo, focando apenas nas operações essenciais para a mecânica do jogo.

* ✅ **(C)reate - Criar:** A criação de um novo save de jogador é feita de forma **implícita** na primeira vez que o endpoint `/salvar` é chamado por um novo usuário. Não existe uma rota dedicada para "registrar usuário".
* ✅ **(R)ead - Ler:** Implementado completamente através da rota `GET /carregar`.
* ✅ **(U)pdate - Atualizar:** Implementado completamente através da rota `POST /salvar`, que sobrescreve o save anterior do jogador.
* ❌ **(D)elete - Deletar:** Esta funcionalidade **não foi implementada**. Não há uma rota ou mecanismo na API para deletar um jogo salvo ou um registro de jogador.

Essa abordagem simplificada é uma decisão de design para manter o escopo do projeto focado na aplicação das estruturas de dados no cliente e na lógica básica de persistência, sem adicionar a complexidade de um gerenciamento de usuários completo.