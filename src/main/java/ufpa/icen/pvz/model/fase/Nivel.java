package ufpa.icen.pvz.model.fase;

import java.util.Random;

import ufpa.icen.pvz.config.Config;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class Nivel {
    private int dificuldade;
    private int recursosJogador;
    private long tempoUltimoSpawn;
    private long cicloUltimoRecurso;
    private Grid grid;
    private boolean jogoAcabou;
    private Random random;

    public Nivel(int dificuldade) {
        this.dificuldade = dificuldade;
        this.recursosJogador = Config.RECURSOS_INICIAIS;
        this.tempoUltimoSpawn = System.currentTimeMillis();
        this.cicloUltimoRecurso = System.currentTimeMillis();
        this.grid = new Grid(Config.ALTURA_TABULEIRO, Config.LARGURA_TABULEIRO);
        this.jogoAcabou = false;
        this.random = new Random();
    }

    public void atualizar() {
        if (jogoAcabou) {
            return;
        }

        long tempoSpawn = Config.calcularTempoSpawn(dificuldade);
        if (System.currentTimeMillis() - tempoUltimoSpawn >= tempoSpawn) {
            spawnarZumbi();
            tempoUltimoSpawn = System.currentTimeMillis();
        }

        if (grid.atualizar()) {
            jogoAcabou = true;
            System.out.println("Jogo acabou! Os zumbis invadiram sua casa!");
        }

        long tempoDesdeUltimoRecurso = System.currentTimeMillis() - cicloUltimoRecurso;
        if (tempoDesdeUltimoRecurso >= Config.TEMPO_CICLO) {
            recursosJogador += Config.RECURSOS_POR_CICLO;
            cicloUltimoRecurso = System.currentTimeMillis();
        }
    }

    private void spawnarZumbi() {
        int indiceLinha = random.nextInt(Config.ALTURA_TABULEIRO);
        grid.adicionarZumbi(indiceLinha, TipoZumbi.COMUM);
        System.out.println("Spawnando um novo zumbi!");
    }

    public boolean tentarPlantar(int linha, double coluna, TipoPlanta tipoPlanta) {
        try {
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
        } catch (Exception e) {
            System.err.println("Erro ao tentar obter custo da planta: " + e.getMessage());
            e.printStackTrace();
        }
        
        return false;
    }

    public boolean isJogoAcabou() { return jogoAcabou; }
    public Grid getGrid() { return grid; }
    public int getRecursosJogador() { return recursosJogador; }

}
