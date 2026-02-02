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
     * Obtém o tempo de recarga (cooldown) necessário entre dois ataques consecutivos.
     * 
     * @return O tempo de recarga em milissegundos.
     */
    int getCooldownAtaque();

    int getDano();
}
