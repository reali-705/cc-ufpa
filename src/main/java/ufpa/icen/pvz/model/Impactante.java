package ufpa.icen.pvz.model;

/**
 * Interface para entidades que causam efeito (geralmente dano) ao colidir fisicamente com outras.
 * <p>
 * Define o comportamento de colisão para elementos como Projéteis (que somem ao bater)
 * ou Zumbis (que atacam ao encostar).
 * </p>
 */
public interface Impactante {
    /**
     * Aplica o efeito do impacto na entidade alvo.
     * <p>
     * A implementação deve definir como o dano ou efeito é transferido para a entidade colidida.
     * </p>
     * 
     * @param outra A entidade viva que sofreu o impacto.
     */
    void atingir(EntidadeViva outra);

    /**
     * Obtém a quantidade de dano base que este impacto causa.
     * 
     * @return Valor do dano em pontos de vida.
     */
    int getDano();
}
