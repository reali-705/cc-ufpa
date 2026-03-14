package ufpa.icen.pvz.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ufpa.icen.pvz.api.IgameFrontend;
import ufpa.icen.pvz.config.GameEstados;
import ufpa.icen.pvz.model.entidades.Entidade;
import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.entidades.plantas.AtiradoraDeErvilha;
import ufpa.icen.pvz.model.entidades.plantas.Planta;
import ufpa.icen.pvz.model.fase.Nivel;
import ufpa.icen.pvz.model.enums.TipoPlanta;

public class GameController implements Runnable {
    private static final int DELTA_ATUALIZACAO = 1500;

    private Thread gameThread;
    private volatile boolean rodando;
    private GameEstados estadoAtual;
    private Nivel nivelAtual;
    private IgameFrontend frontend;

    private final Map<Integer, SnapshotEntidade> anterior = new HashMap<>();

    public GameController() {
        this.estadoAtual = GameEstados.MENU;
    }

    public GameController(IgameFrontend frontend) {
        this();
        this.frontend = frontend;
    }

    public void setFrontend(IgameFrontend frontend) {
        this.frontend = frontend;
    }

    public synchronized void iniciarJogo() {
        if (gameThread == null) {
            this.nivelAtual = new Nivel(2); // média
            this.estadoAtual = GameEstados.JOGANDO;

            rodando = true;
            gameThread = new Thread(this, "GameLoop");
            gameThread.start();
            System.out.println("Jogo iniciado.");
        }
    }

    @Override
    public void run() {
        while (rodando) {
            long inicio = System.currentTimeMillis();

            atualizarJogo();
            sincronizarFrontend();

            long duracao = System.currentTimeMillis() - inicio;
            long espera = DELTA_ATUALIZACAO - duracao;

            if (espera > 0) {
                try {
                    Thread.sleep(espera);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    private void atualizarJogo() {
        if (estadoAtual == GameEstados.JOGANDO && nivelAtual != null) {
            if (nivelAtual.atualizar()) {
                estadoAtual = GameEstados.GAME_OVER;
                System.out.println(nivelAtual.getGameOver());
            }
        }
    }

    private void sincronizarFrontend() {
        if (frontend == null || nivelAtual == null) {
            return;
        }

        Map<Integer, SnapshotEntidade> atual = new HashMap<>();

        List<Planta> plantas = nivelAtual.getGrid().getPlantas();
        for (Planta planta : plantas) {
            SnapshotEntidade snap = SnapshotEntidade.from(planta, TipoEntidade.PLANTA, spritePlanta(planta));
            atual.put(snap.id, snap);
            aplicarMudancas(snap);
        }

        List<Zumbi> zumbis = nivelAtual.getGrid().getZumbis();
        for (Zumbi zumbi : zumbis) {
            SnapshotEntidade snap = SnapshotEntidade.from(zumbi, TipoEntidade.ZUMBI, "/assets/zumbi.png");
            atual.put(snap.id, snap);
            aplicarMudancas(snap);
        }

        List<Projetil> projetis = nivelAtual.getGrid().getProjetis();
        for (Projetil projetil : projetis) {
            // TODO adicionar projetil em resources/asserts
            SnapshotEntidade snap = SnapshotEntidade.from(projetil, TipoEntidade.PROJETIL,
                    "/assets/projetil.png");
            atual.put(snap.id, snap);
            aplicarMudancas(snap);
        }

        for (Map.Entry<Integer, SnapshotEntidade> entry : anterior.entrySet()) {
            if (!atual.containsKey(entry.getKey())) {
                removerDoFrontend(entry.getValue());
            }
        }

        anterior.clear();
        anterior.putAll(atual);
    }

    private void aplicarMudancas(SnapshotEntidade snap) {
        SnapshotEntidade antes = anterior.get(snap.id);
        if (antes == null) {
            criarNoFrontend(snap);
            return;
        }
        if (antes.row != snap.row || antes.col != snap.col) {
            removerDoFrontend(antes);
            criarNoFrontend(snap);
        }
    }

    private void criarNoFrontend(SnapshotEntidade snap) {
        switch (snap.tipo) {
            case PLANTA -> frontend.criarPlanta(snap.row, snap.col, snap.spritePath);
            case ZUMBI -> frontend.criarZumbi(snap.row, snap.col, snap.spritePath);
            case PROJETIL -> frontend.criarProjetil(snap.row, snap.col, snap.spritePath);
        }
    }

    private void removerDoFrontend(SnapshotEntidade snap) {
        switch (snap.tipo) {
            case PLANTA -> frontend.apagarPlanta(snap.row, snap.col);
            case ZUMBI -> frontend.apagarZumbi(snap.row, snap.col);
            case PROJETIL -> frontend.apagarProjetil(snap.row, snap.col);
        }
    }

    private String spritePlanta(Planta planta) {
        if (planta instanceof AtiradoraDeErvilha) {
            return "/assets/disparaervilha.png";
        }
        return "/assets/girassol.png";
    }

    public boolean tentarPlantar(int linha, double coluna, TipoPlanta tipoPlanta) {
        if (nivelAtual == null) {
            return false;
        }
        return nivelAtual.tentarPlantar(linha, coluna, tipoPlanta);
    }

    public void pararJogo() {
        rodando = false;
    }

    public GameEstados getEstadoAtual() {
        return estadoAtual;
    }

    private enum TipoEntidade {
        PLANTA, ZUMBI, PROJETIL
    }

    private static final class SnapshotEntidade {
        private final int id;
        private final TipoEntidade tipo;
        private final int row;
        private final int col;
        private final String spritePath;

        private SnapshotEntidade(int id, TipoEntidade tipo, int row, int col, String spritePath) {
            this.id = id;
            this.tipo = tipo;
            this.row = row;
            this.col = col;
            this.spritePath = spritePath;
        }

        private static SnapshotEntidade from(Entidade entidade, TipoEntidade tipo, String spritePath) {
            int row = entidade.getPosicaoY();
            int col = (int) Math.round(entidade.getPosicaoX());
            return new SnapshotEntidade(entidade.getId(), tipo, row, col, spritePath);
        }
    }
}
