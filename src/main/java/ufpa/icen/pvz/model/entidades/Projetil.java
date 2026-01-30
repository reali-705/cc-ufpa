package ufpa.icen.pvz.model.entidades;

import ufpa.icen.pvz.model.interfaces.Impactante;
import ufpa.icen.pvz.model.interfaces.Movivel;

/**
 * Representa um projétil disparado por plantas.
 * <p>
 * Se move em linha reta e causa dano ao impactar um alvo.
 * </p>
 */
public class Projetil extends Entidade implements Movivel, Impactante {
    /** Dano causado pelo projétil ao atingir um alvo. */
    private int dano;

    /** Velocidade de deslocamento do projétil. */
    private double velocidade;

    /**
     * Cria um novo projétil com dano e velocidade definidos.
     * 
     * @param posicaoX Posição inicial horizontal onde o projétil surge.
     * @param posicaoY A linha (Y) do tabuleiro por onde o projétil viajará.
     * @param dano Quantidade de pontos de vida a remover do alvo.
     * @param velocidade Taxa de deslocamento horizontal por atualização.
     */
    public Projetil(double posicaoX, int posicaoY, int dano, double velocidade) {
        super(posicaoX, posicaoY);
        this.dano = dano;
        this.velocidade = velocidade;
    }

    /**
     * Atualiza a posição do projétil movendo-o para a direita.
     * <p>
     * Incrementa a coordenada X com base no valor da velocidade.
     * </p>
     */
    @Override
    public void mover() {
        this.posicaoX += velocidade;
    }

    /**
     * Aplica o efeito do impacto na entidade alvo.
     * <p>
     * Transfere o dano configurado para a entidade atingida (geralmente um Zumbi).
     * Nota: A remoção do projétil do jogo deve ser gerenciada pelo controlador após o impacto.
     * </p>
     * 
     * @param outra A entidade viva que foi atingida pelo projétil.
     */
    @Override
    public void atingir(EntidadeViva outra) {
        if (Math.abs(outra.getPosicaoX() - this.posicaoX) > 1.0) { return; } // Segurança: só atinge se estiver próximo
        outra.receberDano(dano);
    }
    
    public int getDano() { return dano; }
    public double getVelocidade() { return velocidade; }
}
