package ufpa.icen.pvz.controller;

import ufpa.icen.pvz.config.GameEstados;

public class GameController implements Runnable {
    private Thread gameThread;
    private boolean rodando;
    private GameEstados estadoAtual;
    private final int FPS = 60;
    private final int UPS = 60;

    public GameController() {
        this.estadoAtual = GameEstados.MENU;
    }

    public synchronized void iniciarJogo() {
        if (gameThread == null) {
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

            if (estadoAtual == GameEstados.PAUSADO) {
                deltaAtualizacao = 0;
            } else if (deltaAtualizacao >= 1) {
                atualizarJogo();
                atualizacoes++;
                deltaAtualizacao--;
            }

            if (deltaFrame >= 1) {
                renderizarJogo();
                frames++;
                deltaFrame--;
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
        if (estadoAtual == GameEstados.JOGANDO) {
            // Lógica de atualização do jogo
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
