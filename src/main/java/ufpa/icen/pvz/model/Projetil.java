package ufpa.icen.pvz.model;

public class Projetil extends Entidade implements Movivel, Impactante {
    /** Dano causado pelo projétil ao atingir um alvo. */
    private int dano;

    /**  */
    private double velocidade;

    public Projetil(double posicaoX, int posicaoY, int dano, double velocidade) {
        super(posicaoX, posicaoY);
        this.dano = dano;
        this.velocidade = velocidade;
    }

    @Override
    public void mover() {
        this.posicaoX += velocidade;
    }

    @Override
    public void atingir(EntidadeViva outra) {
        outra.receberDano(dano);
    }
    
    public int getDano() { return dano; }
    public double getVelocidade() { return velocidade; }
}
