package ufpa.icen.pvz.model.fase;

import ufpa.icen.pvz.config.Config;
import ufpa.icen.pvz.model.fase.Grid;

public class Nivel {
    private int dificuldade;
    private int recursosJogador;
    private long tempoUltimoSpawn;
    private Grid grid;

    public Nivel(int dificuldade) {
        this.dificuldade = dificuldade;
        this.recursosJogador = Config.RECURSOS_INICIAIS;
        this.tempoUltimoSpawn = System.currentTimeMillis();
        this.grid = new Grid();
    }

    public void atualizar() {
        if (System.currentTimeMillis() - tempoUltimoSpawn >= Config.TEMPO_SPAWN_ZUMBIS) {
            spawnarZumbi();
            tempoUltimoSpawn = System.currentTimeMillis();
        }

        // Atualiza todas as entidades no grid
        // grid.atualizar();
    }

    private void spawnarZumbi() {
        // Lógica para spawnar um zumbi em uma linha aleatória
        System.out.println("Spawnando um novo zumbi!");
    }

    public boolean isJogoAcabou() {
        // Completar lógica para determinar se o jogo acabou
        return false;
    }
}
