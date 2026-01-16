package ufpa.icen.pvz.model;

public interface Atirador {
    /**
     * Realiza um ataque.
     * 
     * @return projétil disparado, ou null se não atirou
     */
    Projetil atirar();
}
