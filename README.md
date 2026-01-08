# Projeto: Plants vs. Zombies (Clone) - UFPA

Este projeto está sendo desenvolvido para a disciplina de Programação 2 (4º semestre) na Universidade Federal do Pará (UFPA), Faculdade de Computação.

O objetivo principal é aplicar de forma prática os pilares da Programação Orientada a Objetos (POO) e metodologias de desenvolvimento de software como **TDD** e **MVC**.

## 🚀 O Projeto

O jogo consiste em uma mecânica de defesa de torre onde o jogador posiciona plantas em uma grade para impedir o avanço de hordas de zumbis. A estética visual será inspirada no estilo 8-bits (Atari).

### Conceitos de POO Aplicados

1. **Abstração e Herança:** Uso de classes abstratas para representar Entidades (Plantas e Zumbis).
2. **Polimorfismo:** Tratamento genérico de ações de ataque e movimentação no tabuleiro.
3. **Encapsulamento:** Proteção da lógica interna das entidades e estados do jogo.
4. **Design Patterns:** Implementação do padrão Observer para comunicação entre as Linhas do tabuleiro e as Plantas.

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** Java (JDK 25 com Target para JDK 17).
- **Gerenciador de Dependências:** Maven.
- **Testes Unitários:** JUnit 5 (Foco em TDD).
- **Arquitetura:** MVC (Model-View-Controller).
- **Interface Gráfica:** Swing ou JavaFX (a definir).

## 📂 Estrutura de Diretórios

Adotamos o padrão recomendado pelo Maven para garantir organização e facilidade no uso de testes automatizados:

```Plaintext
pvz-java/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── ufpa/icen/pvz/
│   │           ├── model/        # Lógica, regras de negócio e entidades
│   │           ├── controller/   # Gerenciamento do fluxo e entrada de dados
│   │           └── view/         # Interface gráfica e recursos visuais
│   └── test/
│       └── java/
│           └── ufpa/icen/pvz/    # Testes unitários (TDD) para cada módulo
├── target/                       # Arquivos compilados (ignorados pelo Git)
├── res/                          # Sprites 8-bit e sons
├── pom.xml                       # Configurações do Maven e dependências
└── README.md                     # Documentação do projeto
```

## 👥 Equipe

- Desenvolvedor: [reali-705](https://github.com/reali-705)
- Desenvolvedor: [FelipeBrazil](https://github.com/FelipeBrazil)