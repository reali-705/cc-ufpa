package ufpa.icen.pvz.model;

public interface Impactante {
    /**
     * Método chamado quando a entidade impacta outra entidade.
     * 
     * @param outra Entidade que foi impactada
     */
    void atingir(EntidadeViva outra);

    /**
     * Obtém o dano causado pelo impacto.
     * 
     * @return valor do dano
     */
    int getDano();
}
