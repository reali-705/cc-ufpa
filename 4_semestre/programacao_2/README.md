# Plantas vs. Zumbis (Clone)

> Esse projeto é parte do repositório centralizador de atividades acadêmicas da graduação em Ciência da Computação na UFPA.

Este projeto acadêmico é desenvolvido na Universidade Federal do Pará (UFPA) com foco nos pilares da **Programação Orientada a Objetos (POO)**, além de práticas de desenvolvimento como **TDD** e **MVC**.

## 🎓 Contexto Acadêmico

- **Instituição:** Universidade Federal do Pará (UFPA)
- **Instituto:** Instituto de Ciências Exatas e Naturais (ICEN)
- **Disciplina:** Programação 2
- **Semestre:** 4º semestre (2025.4)
- **Professor:** Carlos Gustavo Resque dos Santos
- **Equipe:**
  - **Alessandro Reali Lopes Silva** – [reali-705](https://github.com/reali-705)
  - **Felipe Lisboa Brasil** – [FelipeBrasill](https://github.com/FelipeBrasill)


---

## Objetivos de Aprendizagem

Este projeto prioriza a aplicação prática de três pilares fundamentais da engenharia de software:

### Programação Orientada a Objetos (POO)

Compreender e aplicar os quatro pilares (abstração, herança, polimorfismo, encapsulamento) através da modelagem de entidades do jogo. A POO permite criar uma hierarquia clara de classes, reutilizar código e manter a lógica bem organizada e extensível para novos tipos de plantas e zumbis.

### Model-View-Controller (MVC)

Separação de responsabilidades em três camadas: **Model** (entidades, lógica de jogo), **View** (interface gráfica) e **Controller** (gerenciamento do fluxo). Esse padrão garante que mudanças visuais não afetem a lógica de negócio e facilita testes unitários.

### Test-Driven Development (TDD)

Desenvolver testes *antes* da implementação, garantindo que o código atenda aos requisitos desde o início. TDD reduz bugs e documenta o comportamento esperado das classes através dos testes em JUnit 5.

## O Projeto

O projeto é um clone didático de *Plants vs. Zombies* com foco em **POO**. O jogador posiciona plantas em uma grade (linhas e colunas) para impedir o avanço de zumbis. A lógica do jogo é organizada em entidades, estados e comportamentos bem definidos, priorizando clareza de modelagem e reutilização. A estética visual é inspirada no estilo 8-bits (Atari).

### Conceitos de POO Aplicados (no contexto do projeto)

Nesta implementação, os pilares de POO aparecem diretamente na modelagem das entidades do jogo e nos contratos de comportamento.

- **Abstração:** as entidades centrais do jogo são representadas por classes base (`Entidade`, `EntidadeViva`) e por interfaces que definem comportamentos essenciais (`Movivel`, `Atacante`, `Atirador`, `Impactante`).
- **Herança:** especialização progressiva de entidades (`Entidade` → `EntidadeViva` → `Planta`/`Zumbi`) mantém uma estrutura comum e reduz duplicação de lógica.
- **Polimorfismo:** o loop do jogo pode trabalhar com interfaces, permitindo tratar diferentes entidades de forma uniforme (por exemplo, qualquer classe que implemente `Movivel` pode ser movimentada).
- **Encapsulamento:** atributos críticos (vida, estado, posições) permanecem protegidos e são alterados por métodos controlados (ex.: `receberDano()` em `EntidadeViva`).
- **Padrões de design:**
  - ***Template Method*** nas classes abstratas (`Entidade`, `EntidadeViva`, `Planta`)
  - ***Strategy*** através das interfaces de comportamento
  - ***Game Loop*** no `GameController` com controle de FPS e UPS

## Estado Atual

O projeto está em desenvolvimento iterativo. Acompanhe o progresso nos links abaixo:

- **[Milestones](https://github.com/reali-705/pvz-java/milestones)** – Objetivos maiores e cronograma
- **[Issues Abertas](https://github.com/reali-705/pvz-java/issues)** – Tarefas em andamento e planejadas
- **[Pull Requests](https://github.com/reali-705/pvz-java/pulls)** – Alterações submetidas para revisão

## 🛠️ Ferramentas e Tecnologias

- **Linguagem:** Java 17 (compilado com JDK 25, target JDK 17)
- **Gerenciamento de Dependências:** Maven (`pom.xml`)
- **Interface Gráfica:** Java Swing / AWT (JDK stdlib)
- **Testes:** JUnit 5 (Jupiter) — foco em TDD
- **Build:** Maven Surefire Plugin
- **Arquitetura:** MVC (Model-View-Controller)
- **Controle de Versão:** Git

## Documentação Técnica e Estrutura

Adotamos o padrão recomendado pelo Maven para garantir organização e facilidade na documentação e testes automatizados:

### Documentação

- **[Diagrama de Classes](docs/diagrams/class-diagram.md)** – Hierarquia de classes, interfaces, relacionamentos de herança e implementações. Inclui todas as entidades do jogo.
- **[Diagrama de Arquitetura](docs/diagrams/architecture.md)** – Visão MVC, fluxo de dados entre camadas e organização dos componentes.
- **[Modelos UML](docs/design/uml-models.md)** – Diagramas de sequência, estado e casos de uso.

### Mapa de Pacotes

```Plaintext
pvz-java/
├── docs/                              # 📖 Documentação Técnica
│   ├── diagrams/
│   │   ├── class-diagram.md           # Diagrama de classes (hierarquia, interfaces, relacionamentos)
│   │   └── architecture.md            # Diagrama de arquitetura (MVC, fluxo de dados)
│   └── design/
│       └── uml-models.md              # Modelos UML (sequência, estado, casos de uso)
│
├── src/
│   ├── main/java/ufpa/icen/pvz/
│   │   ├── config/                    # 🔧 Configurações e Constantes do Jogo
│   │   │   ├── Config.java            # Valores padrão (vida, dano, custos, tempos)
│   │   │   └── GameEstados.java       # Enum: estados da aplicação (MENU, JOGANDO, etc)
│   │   │
│   │   ├── model/                     # 🎮 Lógica e Entidades (Coração do Jogo)
│   │   │   ├── entidades/
│   │   │   │   ├── Entidade.java      # Base abstrata: posição, estado
│   │   │   │   ├── EntidadeViva.java  # Abstrata: sistema de vida, dano
│   │   │   │   ├── Projetil.java      # Projéteis com movimento e impacto
│   │   │   │   ├── inimigos/
│   │   │   │   │   └── Zumbi.java     # Inimigos: movimento, ataque
│   │   │   │   └── plantas/
│   │   │   │       ├── Planta.java    # Base abstrata: custo, recarga
│   │   │   │       └── AtiradoraDeErvilha.java # Planta ofensiva com disparo
│   │   │   │
│   │   │   ├── enums/
│   │   │   │   └── EstadoEntidade.java # Estados das entidades (VIVA, ATACANDO, MOVENDO, MORTA)
│   │   │   │
│   │   │   ├── interfaces/            # 📋 Contratos de Comportamento (Polimorfismo)
│   │   │   │   ├── Movivel.java       # Contrato: mover()
│   │   │   │   ├── Atacante.java      # Contrato: podeAtacar()
│   │   │   │   ├── Atirador.java      # Contrato: atirar()
│   │   │   │   └── Impactante.java    # Contrato: atingir()
│   │   │   │
│   │   │   └── fase/                  # 🎯 Gerenciamento de Níveis e Tabuleiro
│   │   │       ├── Grid.java          # Tabuleiro do jogo
│   │   │       ├── Linha.java         # Representação de fileira/linha
│   │   │       └── Nivel.java         # Lógica: dificuldade, spawn, recursos do jogador
│   │   │
│   │   ├── controller/                # 🕹️ Controle do Jogo (Game Loop)
│   │   │   └── GameController.java    # Coordena atualização/renderização, FPS/UPS fixo
│   │   │
│   │   └── view/                      # 🎨 Interface Gráfica
│   │       └── GameView.java          # Renderização visual (Swing/JavaFX)
│   │
│   └── test/java/ufpa/icen/pvz/       # ✅ Testes Unitários (TDD)
│       ├── model/                     # Testes de entidades, projéteis, zumbis
│       ├── controller/                # Testes do controller e lógica do jogo
│       └── view/                      # Testes da interface
│
├── target/                            # 📦 Arquivos Compilados (ignorado pelo Git)
├── res/                               # 🎨 Recursos Visuais e Sonoros
├── pom.xml                            # Maven: dependências e configuração de build
└── README.md                          # Documentação principal do projeto
```

---

[⬆️ Voltar ao topo](#plantas-vs-zumbis-clone)

---

> 🔙 [Voltar para o Repositório Central (CC-UFPA)](https://github.com/reali-705/cc-ufpa)
