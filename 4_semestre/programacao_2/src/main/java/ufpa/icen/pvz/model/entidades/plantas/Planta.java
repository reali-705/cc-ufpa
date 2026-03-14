package ufpa.icen.pvz.model.entidades.plantas;

import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.enums.TipoPlanta;

/**
 * Classe abstrata que serve de base para todas as plantas do jogo.
 * <p>
 * Além da vida (herdada de EntidadeViva), gerencia atributos relacionados
 * à economia do jogo, como custo em sóis e tempo de recarga para plantio.
 * </p>
 */
abstract public class Planta extends EntidadeViva {
    /** Custo em sóis para plantar. */
    protected final int custo;

    /** Tempo de recarga necessário antes de plantar novamente. */
    protected final int cooldownPlantio;

    /**
     * Construtor base para plantas.
     * 
     * @param posicaoX Posição horizontal no tabuleiro.
     * @param posicaoY Linha (Y) onde a planta será instanciada.
     * @param tipoPlanta Enum contendo as configurações base (vida, custo, recarga).
     */
    public Planta(double posicaoX, int posicaoY, TipoPlanta tipoPlanta) {
        super(posicaoX, posicaoY, tipoPlanta.getVida());
        this.custo = tipoPlanta.getCusto();
        this.cooldownPlantio = tipoPlanta.getCooldownPlantio();
    }

    /**
     * Obtém o custo em recursos (sóis) para plantar esta unidade.
     * @return Valor do custo.
     */
    public int getCusto() { return custo; }

    /**
     * Obtém o tempo necessário para poder plantar esta unidade novamente.
     * @return Tempo de recarga em milissegundos.
     */
    public int getCooldownPlantio() { return cooldownPlantio; }
}
