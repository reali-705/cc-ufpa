package ufpa.icen.pvz.model.entidades;

import ufpa.icen.pvz.model.enums.EstadoEntidade;

/**
 * Classe abstrata para entidades que possuem sistema de vida (HP).
 * <p>
 * Estende {@link Entidade} e adiciona conceitos de vida máxima, vida atual,
 * e morte. Serve como base para Plantas e Zumbis.
 * </p>
 */
public abstract class EntidadeViva extends Entidade {
    /** Limite máximo de pontos de vida. */
    protected final int vidaMaxima;
    
    /** Pontos de vida atuais da entidade. */
    protected int vida;

    protected int contador;

    /**
     * Construtor para entidades com sistema de vida.
     * 
     * @param posicaoX Posição horizontal inicial.
     * @param posicaoY Posição vertical (linha) inicial.
     * @param vidaMaxima Limite de pontos de vida da entidade.
     */
    public EntidadeViva(double posicaoX, int posicaoY, int vidaMaxima) {
        super(posicaoX, posicaoY);
        this.vidaMaxima = vidaMaxima;
        this.vida = vidaMaxima;
    }

    /**
     * Aplica dano à entidade, reduzindo sua vida.
     * <p>
     * Se a vida chegar a zero ou menos, o estado é automaticamente alterado para INATIVA.
     * </p>
     * 
     * @param dano quantidade de dano a ser aplicado
     */
    public void receberDano(int dano) {
        if (!this.estaViva()) {
            return;
        }
        this.vida -= Math.abs(dano);
        if (this.vida <= 0) {
            this.vida = 0;
            this.setEstado(EstadoEntidade.INATIVA);
        }
    }

    /**
     * Verifica se a entidade está viva.
     * <p>
     * Helper que encapsula a lógica de verificação de vida e estado.
     * </p>
     * 
     * @return true se a entidade está viva, false caso contrário
     */
    public boolean estaViva() {
        return this.vida > 0 && this.estado != EstadoEntidade.INATIVA;
    }

    // ===== Getters e Setters =====

    /**
     * Obtém os pontos de vida atuais.
     * 
     * @return vida atual
     */
    public int getVida() { return vida; }
    
    /**
     * Obtém o limite máximo de pontos de vida.
     * 
     * @return vida máxima
     */
    public int getVidaMaxima() { return vidaMaxima; }

    public int getContador() { return contador; }
}
