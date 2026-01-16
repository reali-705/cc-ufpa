package ufpa.icen.pvz.model;

/**
 * Interface que define o contrato para entidades que podem se mover no tabuleiro.
 * <p>
 * Implementadores desta interface devem ser capazes de se deslocar e ter uma velocidade
 * constante de movimento.
 * </p>
 */
public interface Movivel {
    /**
     * Move a entidade de acordo com sua velocidade.
     * <p>
     * Deve ser chamado a cada tick do jogo para atualizar a posição.
     * </p>
     */
    void mover();

    double getVelocidade();
}
