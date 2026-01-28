package ufpa.icen.pvz.config;

/**
 * Classe de configuração do jogo Plants vs Zombies.
 * <p>
 * Contém constantes reutilizáveis que definem parâmetros do jogo como dimensões do tabuleiro,
 * custos de recursos, tempos de ciclo e atributos das entidades.
 * </p>
 * <p>
 * Esta classe não deve ser instanciada. Use as constantes públicas estáticas diretamente.
 * </p>
 */
public class Config {
    // Configurações do Tabuleiro
    /** Largura total do tabuleiro (número de colunas). */
    public static final int LARGURA_TABULEIRO = 9;
    
    /** Altura total do tabuleiro (número de linhas). */
    public static final int ALTURA_TABULEIRO = 5;
    
    // Configurações de Recursos
    /** Quantidade inicial de sóis disponíveis para o jogador. */
    public static final int RECURSOS_INICIAIS = 50;
    
    /** Quantidade de sóis gerados periodicamente. */
    public static final int RECURSOS_POR_CICLO = 5;

    // Configurações de Tempo (milissegundos)
    /** Duração de cada ciclo de jogo em milissegundos. */
    public static final int TEMPO_CICLO = 1000;
    
    /** Intervalo de tempo entre o surgimento de zumbis. */
    public static final int TEMPO_SPAWN_ZUMBIS = 5000;

    /**
     * Calcula o tempo de spawn dos zumbis baseado na dificuldade.
     * @param dificuldade Nível de dificuldade atual (1, 2, 3...)
     * @return Tempo em ms entre spawns.
     */
    public static long calcularTempoSpawn(int dificuldade) {
        // Reduz 500ms para cada nivel de dificuldade, com mínimo de 1 segundo
        return Math.max(1000, TEMPO_SPAWN_ZUMBIS - ((dificuldade - 1) * 500));
    }

    // Configurações de Zumbis
    /** Estrutura de dados para atributos de Zumbis. */
    public record StatusBasicoZumbi(int vida, int dano, int tempoAtaque, double velocidade) {}

    // Configurações de Zumbi Padrão
    /** Definições padrão para o Zumbi comum. */
    public static final StatusBasicoZumbi ZUMBI_PADRAO = new StatusBasicoZumbi(100, 10, 1500, 0.5);
    
    // Configurações de Plantas
    /** Estrutura de dados para atributos básicos de Plantas. */
    public record StatusBasicoPlanta(int vida, int custo, int tempoRecarga) {}
    
    /** Estrutura de dados para atributos de ataque de Plantas. */
    public record StatusAtaquePlanta(int dano, int tempoAtaque, double velocidadeProjetil) {}

    // Configurações da Atiradora de Ervilha
    /** Status base da Atiradora de Ervilha. */
    public static final StatusBasicoPlanta ATIRADORA_DE_ERVILHA = new StatusBasicoPlanta(50, 50, 3000);
    
    /** Status de ataque da Atiradora de Ervilha. */
    public static final StatusAtaquePlanta ATIRADORA_DE_ERVILHA_ATAQUE = new StatusAtaquePlanta(20, 1000, 1.5);

    // Construtor privado para evitar instanciação
    private Config() {
        throw new UnsupportedOperationException("Classe de configuração não pode ser instanciada.");
    }
}
