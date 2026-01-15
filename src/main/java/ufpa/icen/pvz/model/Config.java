package ufpa.icen.pvz.model;

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
    public static final int LARGURA_TABULEIRO = 9;
    public static final int ALTURA_TABULEIRO = 5;
    
    // Configurações de Recursos
    public static final int RECURSOS_INICIAIS = 50;
    public static final int RECURSOS_POR_CICLO = 25;
    public static final int CUSTO_ATIRADOR = 50;

    // Configurações de Tempo (milissegundos)
    public static final int TEMPO_CICLO = 1000;
    public static final int TEMPO_DISPARO = 1000;
    public static final int TEMPO_SPAWN_ZUMBIS = 3000;

    // Configurações de Entidades
    public static final int VIDA_ZUMBI = 100;
    public static final int DANO_ZUMBI = 10;
    public static final double VELOCIDADE_ZUMBI = 0.5;
    public static final int VIDA_ATIRADOR = 50;
    public static final int DANO_ATIRADOR = 20;
    public static final double VELOCIDADE_PROJETIL = 1.5;

    // Construtor privado para evitar instanciação
    private Config() {
        throw new UnsupportedOperationException("Classe de configuração não pode ser instanciada.");
    }
}
