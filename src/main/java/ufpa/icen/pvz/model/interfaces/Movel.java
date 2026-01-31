package ufpa.icen.pvz.model.interfaces;

/**
 * Interface que define o contrato para entidades que podem se mover no tabuleiro.
 * <p>
 * Implementadores desta interface devem ser capazes de se deslocar e ter uma velocidade
 * constante de movimento.
 * </p>
 */
public interface Movel {
    /**
     * Obtém a velocidade de deslocamento da entidade.
     * 
     * @return A quantidade de pixels/unidades que a entidade move por tick.
     */
    double getVelocidade();
}
