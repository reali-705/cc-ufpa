package ufpa.icen.pvz.model;

/**
 * Representa os possíveis estados de uma entidade no jogo.
 * <p>
 * Cada estado indica a condição atual da entidade e pode afetar seu comportamento
 * e renderização na tela.
 * </p>
 */
public enum EstadoEntidade {
    /**
     * Entidade está ativa e viva, aguardando execução de ações.
     */
    VIVA,
    
    /**
     * Entidade está no processo de realizar um ataque.
     */
    ATACANDO,
    
    /**
     * Entidade está em movimento no tabuleiro.
     */
    MOVENDO,
    
    /**
     * Entidade foi eliminada e será removida do jogo.
     */
    MORTA
}
