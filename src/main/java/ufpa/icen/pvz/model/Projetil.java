package ufpa.icen.pvz.model;

public class Projetil extends Entidade implements Movivel {
    private int dano;
    private double velocidade;

    public Projetil(int dano, double velocidade, double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY);
        this.dano = dano;
        this.velocidade = velocidade;
    }

    @Override
    public void mover() {
        this.posicaoX += velocidade;
    }

    @Override
    public void atualizar() {
        mover();
    }
    
    public int getDano() {
        return dano;
    }

    public double getVelocidade() {
        return velocidade;
    }
}
