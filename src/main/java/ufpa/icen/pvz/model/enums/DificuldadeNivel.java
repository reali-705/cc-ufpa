package ufpa.icen.pvz.model.enums;

public enum DificuldadeNivel {
    TUTORIAL(
        new ConfigFase(1, 5.0),
        new ConfigRecursos(50, 10, 10),
        new ConfigZumbis(2, 20, 6)
    ),
    FACIL(
        new ConfigFase(3, 7.0),
        new ConfigRecursos(75, 10, 15),
        new ConfigZumbis(3, 15, 12)
    ),
    MEDIO(
        new ConfigFase(5, 10.0),
        new ConfigRecursos(100, 15, 20),
        new ConfigZumbis(5, 15, 25)
    ),
    DIFICIL(
        new ConfigFase(7, 12.0),
        new ConfigRecursos(125, 20, 25),
        new ConfigZumbis(7, 10, 42)
    ),
    INSANO(
        new ConfigFase(10, 15.0),
        new ConfigRecursos(150, 25, 30),
        new ConfigZumbis(10, 5, 70)
    );

    public record ConfigFase(int altura, double largura) {}
    public record ConfigRecursos(int recursosIniciais, int recursosPorCiclo, int cooldownRecursos) {}
    public record ConfigZumbis(int tamanhoHorda, int cooldownSpawnZumbi, int zumbisParaVencer) {}

    public final ConfigFase configFase;
    public final ConfigRecursos configRecursos;
    public final ConfigZumbis configZumbis;

    private DificuldadeNivel(
        ConfigFase configFase,
        ConfigRecursos configRecursos,
        ConfigZumbis configZumbis
    ) {
        this.configFase = configFase;
        this.configRecursos = configRecursos;
        this.configZumbis = configZumbis;
    }

    public static DificuldadeNivel porIndice(int dificuldade) {
        return switch (dificuldade) {
            case 0 -> TUTORIAL;
            case 1 -> FACIL;
            case 2 -> MEDIO;
            case 3 -> DIFICIL;
            case 4 -> INSANO;
            default -> throw new IllegalArgumentException("Dificuldade inválida: " + dificuldade);
        };
    }

    public ConfigFase getConfigFase() { return configFase; }
    public ConfigRecursos getConfigRecursos() { return configRecursos; }
    public ConfigZumbis getConfigZumbis() { return configZumbis; }
}
