package ufpa.icen.pvz.model;

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
     * @param posicaoX posição horizontal (double para movimento contínuo)
     * @param posicaoY posição vertical (linha do tabuleiro)
     */
    public Entidade(double posicaoX, int posicaoY) {
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.estado = EstadoEntidade.VIVA;
    }

    /**
     * Atualiza o estado e comportamento da entidade a cada tick do jogo.
     * <p>
     * Deve ser implementado pelas subclasses com lógica específica (movimento, ataque, etc).
     * </p>
     */
    public abstract void atualizar();

    // ===== Getters e Setters =====

    /**
     * Obtém o estado atual da entidade.
     * 
     * @return o estado da entidade
     */
    public EstadoEntidade getEstado() {
        return estado;
    }
    
    /**
     * Define o estado da entidade.
     * 
     * @param estado novo estado
     */
    public void setEstado(EstadoEntidade estado) {
        this.estado = estado;
    }

    /**
     * Obtém a posição horizontal da entidade.
     * 
     * @return posição X (valor contínuo)
     */
    public double getPosicaoX() {
        return posicaoX;
    }
    
    /**
     * Obtém a posição vertical da entidade.
     * 
     * @return posição Y (linha do tabuleiro)
     */
    public int getPosicaoY() {
        return posicaoY;
    }
}
