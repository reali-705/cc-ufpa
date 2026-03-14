# Servidor de Testes com Express.js

Este diretório contém uma implementação alternativa do servidor de persistência do projeto, utilizando o framework **Express.js**.

## Propósito

Este servidor foi desenvolvido durante a fase inicial do projeto como uma prova de conceito e um primeiro contato com a lógica de backend. Ele é **totalmente funcional**, mas **não é a versão utilizada na entrega final do projeto acadêmico**.

A versão principal, localizada em `/server/servidor.ts`, foi construída utilizando apenas os módulos nativos do Node.js (`http`, `fs`, etc.) para cumprir o requisito da disciplina de não utilizar frameworks externos.

Este arquivo foi mantido no projeto como uma referência e para fins de comparação entre as duas abordagens.

## Comparativo com o Servidor Principal

A existência das duas versões permite uma análise clara das vantagens de usar um framework como o Express em comparação com a abordagem nativa.

| Característica | Servidor Principal (Nativo) | Servidor de Testes (Express) |
| :--- | :--- | :--- |
| **Dependências** | Nenhuma | Requer `express` |
| **Código** | Mais verboso e de baixo nível | Mais limpo, conciso e legível |
| **Roteamento** | Manual, com `if/else` no caminho da URL | Simplificado, com `app.get()`, `app.post()` |
| **Middleware** | Inexistente (precisaria ser criado) | Suporte nativo (ex: `express.json()` para o corpo) |
| **Escopo** | Focado em cumprir requisitos acadêmicos | Padrão da indústria, mais escalável |

## Como Executar

Este servidor não está conectado aos scripts do `package.json`. Para executá-lo, seria necessário:

1.  **Instalar a dependência do Express:**
    ```sh
    npm install express @types/express
    ```
2.  **Compilar o arquivo TypeScript:**
    ```sh
    npm run b   # Windows
    npm run bl  # Linux
    ```
3.  **Executar o arquivo compilado diretamente:**
    ```sh
    npm run test
    ```