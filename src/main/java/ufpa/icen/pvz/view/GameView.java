package ufpa.icen.pvz.view;

import ufpa.icen.pvz.view.cenario.GameCenario;
import ufpa.icen.pvz.view.tiles.tiles;

import javax.swing.*;

public class GameView extends JFrame {

    public GameView() {
        super("Plants vs Zombies");

        int larguraGrid = 960;
        int larguraPainel = 180;
        int altura = 640;

        // Tamanho total = grid + painel
        setSize(larguraGrid + larguraPainel, altura);
        setLayout(null);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // ------------------------
        // Grid do jogo
        // ------------------------
        GameCenario gameCenario = new GameCenario();
        gameCenario.setBounds(0, 0, larguraGrid, altura);
        add(gameCenario);

        // ------------------------
        // Painel lateral de seleção
        // ------------------------
        tiles painel = new tiles();
        painel.setBounds(larguraGrid, 0, larguraPainel, altura); // dentro da janela agora
        add(painel);

        // Listener para selecionar planta
        painel.setPlantClickListener(spritePath -> {
            System.out.println("Selecionou: " + spritePath);
        });

        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(GameView::new);
    }
}
