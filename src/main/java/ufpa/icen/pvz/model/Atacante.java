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
     * Verifica se a entidade pode atacar no momento atual.
     * <p>
     * Leva em consideração o tempo desde o último ataque e o tempo de recarga.
     * </p>
     */
    boolean podeAtacar();
    
    int getTempoAtaque();
}
