# Diretório de Persistência (Jsons)

Este diretório funciona como o "banco de dados" da aplicação. Todos os arquivos relacionados ao progresso dos jogadores são armazenados aqui em formato [JSON (JavaScript Object Notation)](https://www.json.org/json-pt.html).

Os arquivos nesta pasta são criados, lidos e atualizados exclusivamente pelo servidor (`/server/servidor.ts`) e não devem ser editados manualmente, pois isso pode corromper um jogo salvo.

## Estrutura dos Arquivos

Existem dois tipos principais de arquivos gerados neste diretório:

### 1. O Arquivo de Registro (`_registro.json`)

Este arquivo é o índice principal de todos os jogos salvos. Ele é a representação em disco da `TabelaHash` que o servidor mantém em memória para gerenciar os jogadores.

* **Propósito:** Mapear as credenciais de um jogador (usuário e senha) ao nome do arquivo específico que contém seu progresso.
* **Formato:** É um array de arrays, onde cada array interno representa um par `[chave, valor]` da Tabela Hash.
    * A **chave** é uma string no formato `nome_do_jogador:senha`.
    * O **valor** é o nome do arquivo `.json` que armazena os dados daquele jogador.

* **Exemplo:**
    ```json
    [
      [
        "Reali:705",
        "reali.json"
      ],
      [
        "outroJogador:senha123",
        "1678886400000-outrojogador.json"
      ]
    ]
    ```

### 2. Arquivos de Save Individuais (ex: `reali.json`)

Cada um desses arquivos armazena o estado completo de um único jogo para um único jogador.

* **Propósito:** Conter todos os dados necessários para reconstruir a sessão de jogo de um usuário quando ele usa a função "Carregar Jogo".
* **Formato:** O conteúdo do arquivo é um objeto JSON que corresponde à interface `dataGameMaster` definida em `Typescript/contract/interfaces.ts`.

* **Exemplo da Estrutura:**
    ```json
    {
      "jogador": {
        "nome": "Reali",
        "vida": 100,
        "vidaMaxima": 100,
        "escudo": 50,
        "escudoMaximo": 50,
        "historico": [
          "Planeta: Terrestre (0) - Bioma: Floresta (0)"
        ],
        "inventario": {
          "capacidadeMaxima": 100,
          "capacidadeAtual": 5,
          "slots": [
            [
              {
                "id": "1",
                "nome": "Minério de Ferro",
                "tamanho": 1,
                "raridade": 0
              },
              5
            ]
          ]
        },
        "moedas": 125
      },
      "planeta": "{\"id\":\"Planeta: Terrestre (0)\",\"tipo\":\"Terrestre\",\"biomas\":[...],\"inimigos\":[...]...}"
    }
    ```
    *Note que a propriedade `planeta` é, ela mesma, um JSON serializado como uma string, contendo todos os dados do planeta, seus biomas e os inimigos restantes.*