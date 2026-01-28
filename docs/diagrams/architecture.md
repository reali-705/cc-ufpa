# Arquitetura do Sistema

Este documento descreve a arquitetura do sistema do projeto PVZ-Java. A arquitetura é composta por diversos componentes que interagem entre si para fornecer a funcionalidade desejada.

## Estrutura do Sistema

```plaintext
+-------------------+
|    Aplicação      |
|                   |
|  +-------------+  |
|  |  Controlador |  |
|  +-------------+  |
|         |         |
|         v         |
|  +-------------+  |
|  |   Serviço   |  |
|  +-------------+  |
|         |         |
|         v         |
|  +-------------+  |
|  |   Repositório|  |
|  +-------------+  |
|         |         |
|         v         |
|  +-------------+  |
|  |   Banco de  |  |
|  |   Dados     |  |
|  +-------------+  |
+-------------------+
```

## Componentes

1. **Aplicação**: O ponto de entrada do sistema, onde a lógica de controle é gerenciada.
2. **Controlador**: Responsável por receber as solicitações do usuário e interagir com os serviços.
3. **Serviço**: Contém a lógica de negócios e manipula os dados.
4. **Repositório**: Interage com a camada de persistência, realizando operações de CRUD.
5. **Banco de Dados**: Armazena os dados persistentes do sistema.

## Diagrama de Arquitetura

O diagrama acima ilustra a interação entre os diferentes componentes do sistema, mostrando como eles se comunicam e colaboram para fornecer a funcionalidade desejada.