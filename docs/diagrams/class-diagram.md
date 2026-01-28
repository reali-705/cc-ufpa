# Diagrama de Classes - Plants vs Zombies

## Visão Geral

Este documento apresenta o diagrama de classes completo do jogo Plants vs Zombies em Java.

## Diagrama Principal

```mermaid
classDiagram
    %% ===== Interfaces =====
    class Movivel {
        <<interface>>
        +mover() void
        +getVelocidade() double
    }
    
    class Atacante {
        <<interface>>
        +podeAtacar() boolean
        +getTempoAtaque() int
    }
    
    class Atirador {
        <<interface>>
        +atirar() Projetil
    }
    
    class Impactante {
        <<interface>>
        +atingir(EntidadeViva) void
        +getDano() int
    }

    %% ===== Enumerações =====
    class EstadoEntidade {
        <<enumeration>>
        VIVA
        ATACANDO
        MOVENDO
        MORTA
    }
    
    class GameEstados {
        <<enumeration>>
        MENU
        JOGANDO
        PAUSADO
        GAME_OVER
    }

    %% ===== Hierarquia de Entidades =====
    class Entidade {
        <<abstract>>
        #double posicaoX
        #int posicaoY
        #EstadoEntidade estado
        +Entidade(posicaoX, posicaoY)
        +setEstado(EstadoEntidade) void
        +getEstado() EstadoEntidade
        +getPosicaoX() double
        +getPosicaoY() int
    }
    
    class EntidadeViva {
        <<abstract>>
        #int vidaMaxima
        #int vida
        +EntidadeViva(posicaoX, posicaoY, vidaMaxima)
        +receberDano(int) void
        +curar(int) void
        +estaViva() boolean
        +getVida() int
        +getVidaMaxima() int
    }

    %% ===== Projétil =====
    class Projetil {
        -int dano
        -double velocidade
        +Projetil(posicaoX, posicaoY, dano, velocidade)
        +mover() void
        +atingir(EntidadeViva) void
        +getDano() int
        +getVelocidade() double
    }

    %% ===== Plantas =====
    class Planta {
        <<abstract>>
        #int custo
        #int tempoPlantarNovamente
        +Planta(posicaoX, posicaoY, StatusBasicoPlanta)
        +getCusto() int
        +getTempoPlantarNovamente() int
    }
    
    class AtiradoraDeErvilha {
        -int dano
        -double velocidadeProjetil
        -int tempoAtaque
        -long ultimoAtaque
        +AtiradoraDeErvilha(posicaoX, posicaoY)
        +AtiradoraDeErvilha(posicaoX, posicaoY, StatusBasicoPlanta, StatusAtaquePlanta)
        +podeAtacar() boolean
        +atirar() Projetil
    }

    %% ===== Inimigos =====
    class Zumbi {
        -double velocidade
        -int dano
        -int tempoAtaque
        -long ultimoAtaque
        +Zumbi(posicaoX, posicaoY)
        +Zumbi(posicaoX, posicaoY, StatusBasicoZumbi)
        +mover() void
        +podeAtacar() boolean
        +atingir(EntidadeViva) void
        +getVelocidade() double
    }

    %% ===== Fase =====
    class Grid {
    }
    
    class Linha {
        -int numero
        -String nome
        +getNumero() int
        +setNumero(int) void
        +getNome() String
        +setNome(String) void
    }
    
    class Nivel {
        -int dificuldade
        -int recursosJogador
        -long tempoUltimoSpawn
        -Grid grid
        +Nivel(int)
        +atualizar() void
        -spawnarZumbi() void
        +isJogoAcabou() boolean
    }

    %% ===== Controle e View =====
    class GameController {
        -Thread gameThread
        -boolean rodando
        -GameEstados estadoAtual
        -Nivel nivelAtual
        +GameController()
        +iniciarJogo() void
        +run() void
        -atualizarJogo() void
        -renderizarJogo() void
        -pausarJogo() void
        -limparRecursos() void
    }
    
    class GameView {
    }
    
    class Config {
        +LARGURA_TABULEIRO : int
        +ALTURA_TABULEIRO : int
        +RECURSOS_INICIAIS : int
        +RECURSOS_POR_CICLO : int
        +TEMPO_CICLO : int
        +TEMPO_SPAWN_ZUMBIS : int
        +ZUMBI_PADRAO : StatusBasicoZumbi
    }

    %% ===== Relacionamentos de Herança =====
    Entidade <|-- EntidadeViva
    Entidade <|-- Projetil
    EntidadeViva <|-- Planta
    EntidadeViva <|-- Zumbi
    Planta <|-- AtiradoraDeErvilha

    %% ===== Implementações de Interface =====
    Projetil ..|> Movivel
    Projetil ..|> Impactante
    Zumbi ..|> Movivel
    Zumbi ..|> Atacante
    Zumbi ..|> Impactante
    AtiradoraDeErvilha ..|> Atirador
    AtiradoraDeErvilha ..|> Atacante

    %% ===== Associações =====
    Entidade --> EstadoEntidade
    GameController --> GameEstados
    GameController --> Nivel
    Nivel --> Grid
    AtiradoraDeErvilha ..> Projetil : creates
```

## Descrição das Classes

### Hierarquia de Entidades

- **Entidade**: Classe abstrata base para todas as entidades renderizáveis do jogo (posição e estado)
- **EntidadeViva**: Estende Entidade, adiciona sistema de vida (HP) para plantas e zumbis
- **Projetil**: Entidade que se move em linha reta e causa dano ao impactar alvos

### Plantas

- **Planta**: Classe abstrata base para todas as plantas (gerencia custo e tempo de recarga)
- **AtiradoraDeErvilha**: Planta ofensiva que dispara projéteis contra zumbis

### Inimigos

- **Zumbi**: Inimigo que se move em direção à casa e ataca plantas no caminho

### Fase

- **Grid**: Representa o tabuleiro do jogo
- **Linha**: Representa uma linha/fileira do tabuleiro
- **Nivel**: Gerencia a dificuldade, recursos do jogador e spawn de zumbis

### Controle e Visualização

- **GameController**: Controla o loop principal do jogo (atualização e renderização)
- **GameView**: Responsável pela visualização do jogo
- **Config**: Armazena constantes e configurações do jogo

### Enumerações

- **EstadoEntidade**: Estados possíveis de uma entidade (VIVA, ATACANDO, MOVENDO, MORTA)
- **GameEstados**: Estados do jogo (MENU, JOGANDO, PAUSADO, GAME_OVER)

### Interfaces

- **Movivel**: Define contrato para entidades que podem se mover
- **Atacante**: Define contrato para entidades que podem atacar
- **Atirador**: Define contrato para entidades que disparam projéteis
- **Impactante**: Define contrato para entidades que causam dano ao colidir

## Padrões de Design Utilizados

- **Template Method**: Classes abstratas (Entidade, EntidadeViva, Planta) definem estrutura base
- **Strategy**: Interfaces (Movivel, Atacante, Atirador, Impactante) definem comportamentos intercambiáveis
- **Game Loop**: GameController implementa o padrão de loop de jogo com FPS e UPS fixos
