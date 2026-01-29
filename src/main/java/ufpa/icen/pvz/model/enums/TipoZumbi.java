package ufpa.icen.pvz.model.enums;

import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;

public enum TipoZumbi {
    
    COMUM(100, 10, 1500, 0.5);

    public final int vida;
    public final int dano;
    public final int tempoAtaque;
    public final double velocidade;
    // opcional
    public final int escudo;

    private TipoZumbi(int vida, int dano, int tempoAtaque, double velocidade, int escudo) {
        this.vida = vida;
        this.dano = dano;
        this.tempoAtaque = tempoAtaque;
        this.velocidade = velocidade;
        this.escudo = escudo;
    }

    TipoZumbi(int vida, int dano, int tempoAtaque, double velocidade) {
        this(vida, dano, tempoAtaque, velocidade, 0);
    }
    
    public Zumbi criar(double posicaoX, int posicaoY) {
        return switch (this) {
            case COMUM -> new Zumbi(posicaoX, posicaoY, this);
        };
    }

    public int getVida() { return vida; }
    public int getDano() { return dano; }
    public int getTempoAtaque() { return tempoAtaque; }
    public double getVelocidade() { return velocidade; }
    public int getEscudo() { return escudo; }
}
