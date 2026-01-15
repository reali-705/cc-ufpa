package ufpa.icen.pvz.model;

/**
 * Interface que define o contrato para entidades que podem realizar ataques.
 * <p>
 * Implementadores desta interface devem ser capazes de atacar outras entidades,
 * causando dano e respeitando um intervalo de tempo entre ataques.
 * </p>
 */
public interface Atacante {
    /**
     * Realiza um ataque.
     * <p>
     * A implementação deve verificar {@link #podeAtacar()} antes de executar.
     * </p>
     */
    void atacar();
    
    /**
     * Obtém o dano causado por cada ataque desta entidade.
     * <p>
     * O dano é fixo e será aplicado quando um ataque acerta o alvo.
     * </p>
     * 
     * @return valor de dano em pontos de vida
     */
    int getDano();
    
    /**
     * Verifica se a entidade pode atacar no momento.
     * <p>
     * Retorna false se o ataque ainda está em cooldown ou se a entidade não está
     * em condições de atacar (ex: morta, imobilizada).
     * </p>
     * 
     * @return true se pode atacar agora, false caso contrário
     */
    boolean podeAtacar();
}
