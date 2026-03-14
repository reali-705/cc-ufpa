package ufpa.icen.pvz.model.fase;

import java.util.Random;

import ufpa.icen.pvz.model.enums.DificuldadeNivel;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class Nivel {
    private final Grid grid;
    private final Random random;
    private final DificuldadeNivel dificuldade;
    private int contador = 0;
    private int recursosJogador;
    private final int recursosPorCiclo;
    private final int cooldownRecursos;
    private String gameOver;

    private final int tamanhoHorda;
    private final int cooldownSpawnZumbi;
    private final int zumbisParaVencer;
    private int zumbisParaAdicionar = 0;

    public Nivel(int dificuldade) {
        this.random = new Random();
        this.dificuldade = DificuldadeNivel.porIndice(dificuldade);

        DificuldadeNivel.ConfigFase configFase = this.dificuldade.getConfigFase();
        this.grid = new Grid(configFase.altura(), configFase.largura());

        DificuldadeNivel.ConfigRecursos configRecursos = this.dificuldade.getConfigRecursos();
        this.recursosJogador = configRecursos.recursosIniciais();
        this.recursosPorCiclo = configRecursos.recursosPorCiclo();
        this.cooldownRecursos = configRecursos.cooldownRecursos();

        DificuldadeNivel.ConfigZumbis configZumbis = this.dificuldade.getConfigZumbis();
        this.tamanhoHorda = configZumbis.tamanhoHorda();
        this.cooldownSpawnZumbi = configZumbis.cooldownSpawnZumbi();
        this.zumbisParaVencer = configZumbis.zumbisParaVencer();
    }

    public boolean atualizar() {
        this.contador++;

        spawnarZumbi();

        boolean recursosAdicionados = adicionarRecursos();

        return verificarGameOver(recursosAdicionados);
    }

    private void spawnarZumbi() {
        if (contador % cooldownSpawnZumbi == 0 &&
                contador / cooldownSpawnZumbi <= zumbisParaVencer / tamanhoHorda) {
            zumbisParaAdicionar += tamanhoHorda;
        }
        // Spawnar zumbi a cada 2 ciclos para evitar spawn instantâneo
        if (zumbisParaAdicionar > 0 && contador % 2 == 0) {
            int indiceLinha = random.nextInt(grid.getQuantidadeLinhas());
            while (grid.getLinhas().get(indiceLinha) == null) {
                indiceLinha = random.nextInt(grid.getQuantidadeLinhas());
            }
            grid.adicionarZumbi(indiceLinha, TipoZumbi.COMUM);
            zumbisParaAdicionar--;
        }
    }

    private boolean adicionarRecursos() {
        int solGerado = grid.atualizar();
        if (solGerado == -1) {
            return false;
        }
        if (contador % cooldownRecursos == 0) {
            recursosJogador += recursosPorCiclo;
        }
        return true;
    }

    private boolean verificarGameOver(boolean recursosAdicionados) {
        if (!recursosAdicionados) {
            gameOver = "Um zumbi alcançou sua casa! Fim de jogo!";
            return true;
        } else if (grid.getZumbis().isEmpty() &&
                contador / cooldownSpawnZumbi > zumbisParaVencer / tamanhoHorda) {
            gameOver = "Todos os zumbis foram derrotados! Você venceu!";
            return true;
        }
        return false;
    }

    public boolean tentarPlantar(int linha, double coluna, TipoPlanta tipoPlanta) {
        int custoPlanta = tipoPlanta.getCusto();

        if (recursosJogador < custoPlanta) {
            System.out.println("Recursos insuficientes!");
            return false;
        }

        if (grid.adicionarPlanta(linha, coluna, tipoPlanta)) {
            recursosJogador -= custoPlanta;
            System.out.println("Planta posicionada com sucesso!");
            return true;
        }

        return false;
    }

    public DificuldadeNivel getDificuldade() {
        return dificuldade;
    }

    public int getRecursosJogador() {
        return recursosJogador;
    }

    public Grid getGrid() {
        return grid;
    }

    public int getContador() {
        return contador;
    }

    public String getGameOver() {
        return gameOver;
    }
}