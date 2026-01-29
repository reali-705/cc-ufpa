package ufpa.icen.pvz.model.enums;

import ufpa.icen.pvz.model.entidades.plantas.AtiradoraDeErvilha;
import ufpa.icen.pvz.model.entidades.plantas.Planta;


public enum TipoPlanta {
    /** 
     * Seguir os modelos para adicionar mais tipos de plantas
     * 
     * Padrão (sem ataque ou geração)
     * NOME_PLANTA(custo, vida, tempoRecarga, null, null)
     *
     * Atiradora (sem geração)
     * NOME_PLANTA(custo, vida, tempoRecarga, null, null)
     *
     * Produtora (sem ataque)
     * NOME_PLANTA(custo, vida, tempoRecarga, null, new StatusGeracao(solGerado, tempoGeracao))
     */

    ATIRADORA_DE_ERVILHA(
        50, 50, 3000,
        new StatusAtaque(20, 1500, 2.0)
    );

    // --- Registros ---
    public record StatusAtaque(int dano, int tempoAtaque, double velocidadeProjetil) {}
    public record StatusGeracao(int solGerado, int tempoGeracao) {}

    // Atributos comuns a todas as plantas
    private final int custo;
    private final int vida;
    private final int tempoRecarga;
    // opcionais
    private final StatusAtaque statusAtaque;
    private final StatusGeracao statusGeracao;

    // --- Construtor Completo ---
    private TipoPlanta(int custo, int vida, int tempoRecarga, StatusAtaque statusAtaque, StatusGeracao statusGeracao) {
        this.custo = custo;
        this.vida = vida;
        this.tempoRecarga = tempoRecarga;
        this.statusAtaque = statusAtaque;
        this.statusGeracao = statusGeracao;
    }
    
    // --- Construtores Específicos ---
    // Planta Padrão
    TipoPlanta(int custo, int vida, int tempoRecarga) {
        this(custo, vida, tempoRecarga, null, null);
    }
    // Planta Atiradora
    TipoPlanta(int custo, int vida, int tempoRecarga, StatusAtaque statusAtaque) {
        this(custo, vida, tempoRecarga, statusAtaque, null);
    }
    // Planta Produtora
    TipoPlanta(int custo, int vida, int tempoRecarga, StatusGeracao statusGeracao) {
        this(custo, vida, tempoRecarga, null, statusGeracao);
    }

    // --- Fábrica de Plantas ---
    public Planta criar(double posicaoX, int linha) {
        return switch (this) {
            case ATIRADORA_DE_ERVILHA -> new AtiradoraDeErvilha(posicaoX, linha);
            // Adicionar novos casos aqui para outras plantas
            default -> throw new IllegalArgumentException("Tipo de planta não suportado: " + this);
        };
    };

    // --- Getters ---
    public int getCusto() { return custo; }
    public int getVida() { return vida; }
    public int getTempoRecarga() { return tempoRecarga; }
    public StatusAtaque getStatusAtaque() { return statusAtaque; }
    public StatusGeracao getStatusGeracao() { return statusGeracao; }
}
