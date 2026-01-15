package ufpa.icen.pvz.model;

/**
 * Classe abstrata para entidades que possuem sistema de vida (HP).
 * <p>
 * Estende {@link Entidade} e adiciona conceitos de vida máxima, vida atual,
 * e morte. Serve como base para Plantas e Zumbis.
 * </p>
 */
public abstract class EntidadeViva extends Entidade {
    /** Pontos de vida atuais da entidade. */
    protected int vida;
    
    /** Limite máximo de pontos de vida. */
    protected int vidaMaxima;

    /**
     * Construtor para entidades com sistema de vida.
     * 
     * @param vidaMaxima pontos de vida máximos da entidade
     * @param posicaoX posição horizontal
     * @param posicaoY posição vertical
     */
    public EntidadeViva(int vidaMaxima, double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY);
        this.vidaMaxima = vidaMaxima;
        this.vida = vidaMaxima;
    }

    /**
     * Aplica dano à entidade, reduzindo sua vida.
     * <p>
     * Se a vida chegar a zero ou menos, o estado é automaticamente alterado para MORTA.
     * </p>
     * 
     * @param dano quantidade de dano a ser aplicado
     */
    public void receberDano(int dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vida = 0;
            this.estado = EstadoEntidade.MORTA;
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
        return this.vida > 0 && this.estado != EstadoEntidade.MORTA;
    }

    // ===== Getters e Setters =====

    /**
     * Obtém os pontos de vida atuais.
     * 
     * @return vida atual
     */
    public int getVida() {
        return vida;
    }
    
    /**
     * Obtém o limite máximo de pontos de vida.
     * 
     * @return vida máxima
     */
    public int getVidaMaxima() {
        return vidaMaxima;
    }
    
    /**
     * Define diretamente os pontos de vida.
     * <p>
     * Clampeia o valor entre 0 e vidaMaxima. Se atingir 0, marca como MORTA.
     * </p>
     * 
     * @param vida novo valor de vida
     */
    public void setVida(int vida) {
        this.vida = vida;
        if (this.vida > this.vidaMaxima) {
            this.vida = this.vidaMaxima;
        }
        if (this.vida <= 0) {
            this.vida = 0;
            this.estado = EstadoEntidade.MORTA;
        }
    }
}
