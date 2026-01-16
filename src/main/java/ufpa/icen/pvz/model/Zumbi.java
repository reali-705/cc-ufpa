package ufpa.icen.pvz.model;

public class Zumbi extends EntidadeViva implements Movivel, Atacante, Impactante {
    /** Velocidade de movimento do zumbi. */
    private double velocidade;

    /** Dano causado pelo zumbi ao atacar. */
    private int dano;

    /** Tempo entre ataques do zumbi. */
    private int tempoAtaque;

    /**  */
    private long ultimoAtaque = 0;
    
    public Zumbi(double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY, Config.ZUMBI_PADRAO.vida());
        this.velocidade = Config.ZUMBI_PADRAO.velocidade();
        this.dano = Config.ZUMBI_PADRAO.dano();
        this.tempoAtaque = Config.ZUMBI_PADRAO.tempoAtaque();
    }

    public Zumbi(double posicaoX, int posicaoY, Config.StatusBasicoZumbi status) {
        super(posicaoX, posicaoY, status.vida());
        this.velocidade = status.velocidade();
        this.dano = status.dano();
        this.tempoAtaque = status.tempoAtaque();
    }
    
    @Override
    public void mover() {
        this.posicaoX -= this.velocidade;
    }
    
    @Override
    public boolean podeAtacar() {
        if (!this.estaViva()) { return false; }
        return (System.currentTimeMillis() - ultimoAtaque) >= tempoAtaque;
    }

    @Override
    public void atingir(EntidadeViva outra) {
        if (!podeAtacar()) { return; }
        outra.receberDano(dano);
        this.ultimoAtaque = System.currentTimeMillis();
    }

    public double getVelocidade() { return velocidade; }
    public int getDano() { return dano; }
    public int getTempoAtaque() { return tempoAtaque; }
}