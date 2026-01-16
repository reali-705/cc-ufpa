package ufpa.icen.pvz.model;

abstract public class Planta extends EntidadeViva {
    /**  */
    protected int custo;

    /** */
    protected int tempoPlantarNovamente;

    /**
     * Construtor da planta.
     * 
     * @param posicaoX posição horizontal (double para movimento contínuo)
     * @param posicaoY posição vertical (linha do tabuleiro)
     */
    
    public Planta(double posicaoX, int posicaoY, Config.StatusBasicoPlanta status) {
        super(posicaoX, posicaoY, status.vida());
        this.custo = status.custo();
        this.tempoPlantarNovamente = status.tempoRecarga();
    }

    public int getCusto() { return custo; }
    public int getTempoPlantarNovamente() { return tempoPlantarNovamente; }
}
