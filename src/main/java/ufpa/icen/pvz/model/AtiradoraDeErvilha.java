package ufpa.icen.pvz.model;

public class AtiradoraDeErvilha extends Planta implements Atirador, Atacante {
    /** Dano causado por cada projétil disparado. */
    private int dano;

    /** Velocidade dos projéteis disparados. */
    private double velocidadeProjetil;

    /** Tempo entre ataques da atiradora de ervilha. */
    private int tempoAtaque;

    /**  */
    private long ultimoAtaque = 0;

     /**
     * Construtor da Atiradora de Ervilha.
     * 
     * @param posicaoX posição horizontal (double para movimento contínuo)
     * @param posicaoY posição vertical (linha do tabuleiro)
     */

    public AtiradoraDeErvilha(double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY, Config.ATIRADORA_DE_ERVILHA);
        Config.StatusAtaquePlanta statusAtaque = Config.ATIRADORA_DE_ERVILHA_ATAQUE;
        this.dano = statusAtaque.dano();
        this.velocidadeProjetil = statusAtaque.velocidadeProjetil();
        this.tempoAtaque = statusAtaque.tempoAtaque();
    }

    public AtiradoraDeErvilha(
        double posicaoX, int posicaoY,
        Config.StatusBasicoPlanta statusBasico,
        Config.StatusAtaquePlanta statusAtaque
    ) {
        super(posicaoX, posicaoY, statusBasico);
        this.dano = statusAtaque.dano();
        this.tempoAtaque = statusAtaque.tempoAtaque();
        this.velocidadeProjetil = statusAtaque.velocidadeProjetil();
    }

    @Override
    public boolean podeAtacar() {
        if (!this.estaViva()) { return false; }
        return (System.currentTimeMillis() - ultimoAtaque) >= tempoAtaque;
    }

    @Override
    public Projetil atirar() {
        if (!podeAtacar()) { return null; }
        this.ultimoAtaque = System.currentTimeMillis();
        return new Projetil(this.posicaoX, this.posicaoY, this.dano, this.velocidadeProjetil);
    }

    public int getDano() { return dano; }
    public int getTempoAtaque() { return tempoAtaque; }
}
