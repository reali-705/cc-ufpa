package ufpa.icen.pvz.model;

public class Zumbi extends EntidadeViva implements Movivel, Atacante {
    int dano;
    double velocidade;
    int cooldownAttack;
    
    public Zumbi(int vida, int dano, double velocidade, double posicaoX, int posicaoY) {
        super(vida, posicaoX, posicaoY);
        this.velocidade = velocidade;
        this.dano = dano;
        this.cooldownAttack = 1000; // Exemplo de cooldown em milissegundos
    }
    
    @Override
    public void mover() {
        this.posicaoX -= this.velocidade;
    }
    
    @Override
    public void atacar() {
        // Implementação do ataque do zumbi
    }

    @Override
    public boolean podeAtacar() {
        return this.estado == EstadoEntidade.VIVA;
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
