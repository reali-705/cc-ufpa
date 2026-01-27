package ufpa.icen.pvz.model.entidades;

import ufpa.icen.pvz.model.enums.EstadoEntidade;

/**
 * Classe abstrata base para todas as entidades renderizáveis do jogo.
 * <p>
 * Define atributos e comportamentos comuns a todas as entidades, como posição,
 * estado e atualização. Serve como base para Projetil, Planta e Zumbi.
 * </p>
 */
public abstract class Entidade {
    /** Posição horizontal da entidade (suporta valores contínuos para movimento fluido). */
    protected double posicaoX;
    
    /** Posição vertical (linha do tabuleiro, sempre valor inteiro). */
    protected int posicaoY;
    
    /** Estado atual da entidade. */
    protected EstadoEntidade estado;

    /**
     * Construtor base para todas as entidades.
     * 
     * @param posicaoX A posição horizontal no tabuleiro (0 a N).
     * @param posicaoY A linha do tabuleiro (0 a M).
     */
    public Entidade(double posicaoX, int posicaoY) {
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.estado = EstadoEntidade.VIVA;
    }

    // ===== Getters e Setters =====
    
    /**
     * Define o estado atual da entidade.
     * <p>
     * Usado para alterar o comportamento ou renderização (ex: matar a entidade).
     * </p>
     * 
     * @param estado O novo estado a ser atribuído.
     */
    public void setEstado(EstadoEntidade estado) {
        this.estado = estado;
    }

    /**
     * Obtém o estado atual da entidade.
     * 
     * @return O valor do enum {@link EstadoEntidade} representando o status.
     */
    public EstadoEntidade getEstado() { return estado; }

    /**
     * Obtém a posição horizontal da entidade.
     * 
     * @return A coordenada X (pode ser fracionária para movimentos suaves).
     */
    public double getPosicaoX() { return posicaoX; }
    
    /**
     * Obtém a posição vertical da entidade.
     * 
     * @return O índice inteiro da linha onde a entidade está.
     */
    public int getPosicaoY() { return posicaoY; }
}
