package ufpa.icen.pvz.model.interfaces;

import ufpa.icen.pvz.model.entidades.EntidadeViva;

/**
 * Interface para entidades que causam efeito (geralmente dano) ao colidir fisicamente com outras.
 * <p>
 * Define o comportamento de colisão para elementos como Projéteis (que somem ao bater)
 * ou Zumbis (que atacam ao encostar).
 * </p>
 */
public interface Impactante {
    void setAlvo(EntidadeViva alvo);

    EntidadeViva getAlvo();
}
