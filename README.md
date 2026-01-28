# Projeto: Plants vs. Zombies (Clone) - UFPA

Este projeto está sendo desenvolvido para a disciplina de Programação 2 (4º semestre) na Universidade Federal do Pará (UFPA), Faculdade de Computação.

O objetivo principal é aplicar de forma prática os pilares da Programação Orientada a Objetos (POO) e metodologias de desenvolvimento de software como **TDD** e **MVC**.

## 📑 Sumário

- [O Projeto](#o-projeto)
- [Tecnologias e Ferramentas](#tecnologias-e-ferramentas)
- [Documentação Técnica](#documentação-técnica)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Equipe](#equipe)

## O Projeto

O jogo consiste em uma mecânica de defesa de torre onde o jogador posiciona plantas em uma grade para impedir o avanço de hordas de zumbis. A estética visual será inspirada no estilo 8-bits (Atari).

### Conceitos de POO Aplicados

1. **Abstração e Herança:** Uso de classes abstratas (`Entidade`, `EntidadeViva`, `Planta`) para representar a hierarquia de entidades do jogo.
2. **Polimorfismo:** Tratamento genérico de ações através de interfaces (`Movivel`, `Atacante`, `Atirador`, `Impactante`).
3. **Encapsulamento:** Proteção da lógica interna das entidades, estados do jogo e configurações.
4. **Interfaces:** Segregação de comportamentos específicos (movimento, ataque, disparo) para composição flexível.
5. **Design Patterns:** 
   - **Template Method** nas classes abstratas (`Entidade`, `EntidadeViva`, `Planta`)
   - **Strategy** através das interfaces de comportamento
   - **Game Loop** no `GameController` com controle de FPS e UPS

## Tecnologias e Ferramentas

- **Linguagem:** Java (JDK 25 com Target para JDK 17).
- **Gerenciador de Dependências:** Maven.
- **Testes Unitários:** JUnit 5 (Foco em TDD).
- **Arquitetura:** MVC (Model-View-Controller).
- **Interface Gráfica:** Swing ou JavaFX (a definir).

## Documentação Técnica

### Diagramas

- **[Diagrama de Classes](docs/diagrams/class-diagram.md)** - Visualização completa da hierarquia de classes, interfaces, relacionamentos de herança e implementações. Inclui todas as entidades do jogo (plantas, zumbis, projéteis), controle e fase.

- **[Diagrama de Arquitetura](docs/diagrams/architecture.md)** - Visão de alto nível da arquitetura MVC, fluxo de dados entre camadas e organização dos componentes principais do sistema.

### Design

- **[Modelos UML](docs/design/uml-models.md)** - Documentação complementar com diagramas de sequência (fluxo de ações), diagramas de estado (ciclo de vida das entidades) e casos de uso do jogo.

## Estrutura de Diretórios

Adotamos o padrão recomendado pelo Maven para garantir organização e facilidade no uso de testes automatizados:

```Plaintext
pvz-java/
├── docs/                         # Documentação técnica do projeto
│   ├── diagrams/                 # Diagramas UML e de arquitetura
│   │   ├── class-diagram.md      # Diagrama de classes completo
│   │   └── architecture.md       # Diagrama de arquitetura
│   └── design/                   # Documentação de design
│       └── uml-models.md         # Modelos UML diversos
├── src/
│   ├── main/
│   │   └── java/
│   │       └── ufpa/icen/pvz/
│   │           ├── config/       # Configurações e constantes do jogo
│   │           ├── model/        # Lógica, regras de negócio e entidades
│   │           │   ├── entidades/    # Entidades do jogo
│   │           │   │   ├── inimigos/ # Zumbis
│   │           │   │   └── plantas/  # Plantas
│   │           │   ├── enums/        # Enumerações (estados)
│   │           │   ├── fase/         # Gerenciamento de níveis e grid
│   │           │   └── interfaces/   # Contratos de comportamento
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

## Equipe

- Desenvolvedor: [reali-705](https://github.com/reali-705)
- Desenvolvedor: [FelipeBrasill](https://github.com/FelipeBrasill)

---

[⬆️ Voltar ao topo](#projeto-plants-vs-zombies-clone---ufpa)
