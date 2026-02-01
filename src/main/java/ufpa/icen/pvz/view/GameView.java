package ufpa.icen.pvz.view;

import ufpa.icen.pvz.view.cenario.GameCenario;
import ufpa.icen.pvz.view.tiles.Tiles;

import javax.swing.*;
import java.awt.*;

public class GameView extends JFrame {

    public GameView() {
        super("Plants vs Zombies");

        // ------------------------
        // Configuração da janela
        // ------------------------
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // Container principal com BorderLayout
        JPanel mainPanel = new JPanel(new BorderLayout());
        setContentPane(mainPanel);

        // ------------------------
        // Grid do jogo (centro)
        // ------------------------
        GameCenario gameCenario = new GameCenario();
        mainPanel.add(gameCenario, BorderLayout.CENTER);

        // ------------------------
        // Painel lateral de seleção (direita)
        // ------------------------
        Tiles painel = new Tiles();
        painel.setPreferredSize(new Dimension(180, 640));
        mainPanel.add(painel, BorderLayout.EAST);

        // Listener para selecionar planta
        painel.setPlantClickListener(spritePath -> {
            System.out.println("Selecionou: " + spritePath);
            gameCenario.setPlantaSelecionada(spritePath);
        });

        // Ajusta o tamanho da janela ao tamanho dos componentes
        pack();
        setLocationRelativeTo(null); // centraliza a janela
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(GameView::new);
    }
}
