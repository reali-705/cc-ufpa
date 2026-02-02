package ufpa.icen.pvz.model.entidades;

import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.interfaces.Impactante;
import ufpa.icen.pvz.model.interfaces.Movel;

/**
 * Representa um projétil disparado por plantas.
 * <p>
 * Se move em linha reta e causa dano ao impactar um alvo.
 * </p>
 */
public class Projetil extends Entidade implements Movel, Impactante {
    /** Dano causado pelo projétil ao atingir um alvo. */
    private final int dano;

    /** Velocidade de deslocamento do projétil. */
    private final double velocidade;

    private EntidadeViva alvo;

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
        this.estado = EstadoEntidade.MOVENDO;
    }

    private void mover() {
        this.posicaoX += velocidade;
    }

    private void atingir() {
        alvo.receberDano(dano);
        setEstado(EstadoEntidade.INATIVA);
    }

    @Override
    public void atualizar() {
        switch (estado) {
            case MOVENDO:
                mover();
                break;
            case PRONTA:
                atingir();
                break;
            default:
                setEstado(EstadoEntidade.INATIVA);
        }
    }

    public void setAlvo(EntidadeViva alvo) {
        if (alvo == null || !alvo.estaViva()) {
            this.alvo = null;
            setEstado(EstadoEntidade.MOVENDO);
            return;
        }
        this.alvo = alvo;
        setEstado(EstadoEntidade.PRONTA);
    }

    public boolean estaAtiva(double limiteX) {
        return this.posicaoX <= limiteX && this.estado != EstadoEntidade.INATIVA;
    }
    
    public int getDano() { return dano; }
    public double getVelocidade() { return velocidade; }
    public EntidadeViva getAlvo() { return alvo; }
}
