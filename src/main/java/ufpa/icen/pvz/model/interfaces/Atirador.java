package ufpa.icen.pvz.model.interfaces;

import ufpa.icen.pvz.model.entidades.Projetil;

/**
 * Interface para entidades que atacam à distância lançando projéteis.
 */
public interface Atirador {
    /**
     * Dispara um novo projétil.
     * <p>
     * Cria e retorna uma instância de {@link Projetil} configurada com a posição e dano da entidade atiradora.
     * </p>
     * 
     * @return O projétil disparado, ou null se não for possível atirar no momento (ex: cooldown).
     */
    Projetil atirar();
}
