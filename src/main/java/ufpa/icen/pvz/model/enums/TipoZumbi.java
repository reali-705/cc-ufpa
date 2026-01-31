package ufpa.icen.pvz.model.enums;

import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;

public enum TipoZumbi {
    
    COMUM(100, 10, 10, 0.5);

    public final int vida;
    public final int dano;
    public final int cooldownAtaque;
    public final double velocidade;
    // opcional
    public final int escudo;

    private TipoZumbi(int vida, int dano, int cooldownAtaque, double velocidade, int escudo) {
        this.vida = vida;
        this.dano = dano;
        this.cooldownAtaque = cooldownAtaque;
        this.velocidade = velocidade;
        this.escudo = escudo;
    }

    TipoZumbi(int vida, int dano, int cooldownAtaque, double velocidade) {
        this(vida, dano, cooldownAtaque, velocidade, 0);
    }
    
    public Zumbi criar(double posicaoX, int posicaoY) {
        return switch (this) {
            case COMUM -> new Zumbi(posicaoX, posicaoY, this);
        };
    }

    public int getVida() { return vida; }
    public int getDano() { return dano; }
    public int getCooldownAtaque() { return cooldownAtaque; }
    public double getVelocidade() { return velocidade; }
    public int getEscudo() { return escudo; }
}
