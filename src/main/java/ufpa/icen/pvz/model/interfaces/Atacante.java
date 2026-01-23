package ufpa.icen.pvz.model.interfaces;

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
     * 
     * @return true se o ataque está disponível, false se estiver em tempo de recarga (cooldown).
     */
    boolean podeAtacar();
    
    /**
     * Obtém o tempo de recarga (cooldown) necessário entre dois ataques consecutivos.
     * 
     * @return O tempo de recarga em milissegundos.
     */
    int getTempoAtaque();
}
