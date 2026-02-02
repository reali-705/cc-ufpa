package ufpa.icen.pvz.config;

public enum CenarioConfig {
    GRID_LARGURA(960),
    GRID_ALTURA(640),
    PAINEL_LARGURA(180);

    private final int valor;

    CenarioConfig(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}
