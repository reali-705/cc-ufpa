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

    // Configurações de Tempo (milissegundos)
    public static final int TEMPO_CICLO = 1000;
    public static final int TEMPO_SPAWN_ZUMBIS = 5000;

    // Configurações de Zumbis
    public record StatusBasicoZumbi(int vida, int dano, int tempoAtaque, double velocidade) {}

    // Configurações de Zumbi Padrão
    public static final StatusBasicoZumbi ZUMBI_PADRAO = new StatusBasicoZumbi(100, 10, 1500, 0.5);
    // Configurações de Plantas
    public record StatusBasicoPlanta(int vida, int custo, int tempoRecarga) {}
    public record StatusAtaquePlanta(int dano, int tempoAtaque, double velocidadeProjetil) {}

    // Configurações da Atiradora de Ervilha
    public static final StatusBasicoPlanta ATIRADORA_DE_ERVILHA = new StatusBasicoPlanta(50, 50, 3000);
    public static final StatusAtaquePlanta ATIRADORA_DE_ERVILHA_ATAQUE = new StatusAtaquePlanta(20, 1000, 1.5);

    // Construtor privado para evitar instanciação
    private Config() {
        throw new UnsupportedOperationException("Classe de configuração não pode ser instanciada.");
    }
}
