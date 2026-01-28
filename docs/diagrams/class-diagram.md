# Diagrama de Classes

## Classes

### Classe: `Jogo`
- **Atributos:**
  - `nome: String`
  - `nivelDificuldade: int`
- **Métodos:**
  - `iniciar()`
  - `pausar()`
  - `finalizar()`

### Classe: `Jogador`
- **Atributos:**
  - `nome: String`
  - `pontuacao: int`
- **Métodos:**
  - `jogar()`
  - `atualizarPontuacao(pontos: int)`

### Classe: `Inimigo`
- **Atributos:**
  - `tipo: String`
  - `vida: int`
- **Métodos:**
  - `atacar()`
  - `receberDano(dano: int)`

### Classe: `Arma`
- **Atributos:**
  - `tipo: String`
  - `dano: int`
- **Métodos:**
  - `usar()`

## Relacionamentos

- `Jogo` tem muitos `Jogador`
- `Jogador` pode ter muitas `Arma`
- `Jogo` tem muitos `Inimigo`
- `Inimigo` pode atacar `Jogador`

## Notas
Este diagrama representa a estrutura básica do sistema, incluindo as principais classes e seus relacionamentos.