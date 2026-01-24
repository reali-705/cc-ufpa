package ufpa.icen.pvz.controller;

import ufpa.icen.pvz.config.GameEstados;
import ufpa.icen.pvz.model.fase.Nivel;

public class GameController implements Runnable {
    private Thread gameThread;
    private boolean rodando;
    private GameEstados estadoAtual;
    private final int FPS = 60;
    private final int UPS = 60;
    private Nivel nivelAtual;

    public GameController() {
        this.estadoAtual = GameEstados.MENU;
    }

    public synchronized void iniciarJogo() {
        if (gameThread == null) {
            this.nivelAtual = new Nivel(1); // Inicia o nível 1
            this.estadoAtual = GameEstados.JOGANDO;

            rodando = true;
            gameThread = new Thread(this);
            gameThread.start();
            System.out.println("Jogo iniciado.");
        }
    }

    @Override
    public void run() {
        double tempoPorFrame = 1000000000.0 / FPS;
        double tempoPorAtualizacao = 1000000000.0 / UPS;

        long ultimoTempo = System.nanoTime();
        double deltaFrame = 0;
        double deltaAtualizacao = 0;

        long contadorTempo = System.currentTimeMillis();
        int frames = 0;
        int atualizacoes = 0;

        while (rodando) {
            long agora = System.nanoTime();

            deltaFrame += (agora - ultimoTempo) / tempoPorFrame;
            deltaAtualizacao += (agora - ultimoTempo) / tempoPorAtualizacao;
            ultimoTempo = agora;

            boolean deveRenderizar = false;

            while (deltaAtualizacao >= 1) {
                atualizarJogo();
                atualizacoes++;
                deltaAtualizacao--;
                deveRenderizar = true;
            }

            if (deveRenderizar || deltaFrame >= 1) {
                renderizarJogo();
                frames++;
                deltaFrame--;
            }

            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // atualização do contador de tempo a cada segundo
            if (System.currentTimeMillis() - contadorTempo >= 1000) {
                System.out.println("FPS: " + frames + " | UPS: " + atualizacoes + " | Estado: " + estadoAtual);
                frames = 0;
                atualizacoes = 0;
                contadorTempo += 1000;
            }
        }

        limparRecursos();
    }

    private void atualizarJogo() {
        if (estadoAtual == GameEstados.JOGANDO && nivelAtual != null) {
            // Lógica de atualização do jogo
            nivelAtual.atualizar();

            if (nivelAtual.isJogoAcabou()) {
                estadoAtual = GameEstados.GAME_OVER;
                System.out.println("Game Over!");
            }
        }
    }

    private void renderizarJogo() {
        // Lógica de renderização do jogo
    }
    
    private void pausarJogo() {
        if (estadoAtual == GameEstados.JOGANDO) {
            estadoAtual = GameEstados.PAUSADO;
            System.out.println("Jogo pausado.");
        } else if (estadoAtual == GameEstados.PAUSADO) {
            estadoAtual = GameEstados.JOGANDO;
            System.out.println("Jogo retomado.");
        }
    }
    
        public synchronized void pararJogo() {
            rodando = false;
            System.out.println("Jogo parado.");
        }

    private void limparRecursos() {
        try {
            if (gameThread != null) {
                gameThread.join(100);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Limpando recursos do jogo...");
    }

    public GameEstados getEstadoAtual() {
        return estadoAtual;
    }
}
