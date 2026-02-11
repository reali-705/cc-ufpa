package ufpa.icen.pvz;

import ufpa.icen.pvz.config.CenarioConfig;
import ufpa.icen.pvz.controller.GameController;
import ufpa.icen.pvz.view.cenario.GameCenario;
import ufpa.icen.pvz.view.cenario.Janela;
import ufpa.icen.pvz.view.tiles.Tiles;

import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            GameCenario gameCenario = new GameCenario();
            GameController controller = new GameController(gameCenario);
            gameCenario.setController(controller);

            Tiles painel = new Tiles();
            int larguraGrid = CenarioConfig.GRID_LARGURA.getValor();
            int alturaGrid = CenarioConfig.GRID_ALTURA.getValor();
            int larguraPainel = CenarioConfig.PAINEL_LARGURA.getValor();

            JPanel mainPanel = new JPanel(null);
            mainPanel.setPreferredSize(new Dimension(larguraGrid + larguraPainel, alturaGrid));

            gameCenario.setBounds(0, 0, larguraGrid, alturaGrid);
            mainPanel.add(gameCenario);

            painel.setBounds(larguraGrid, 0, larguraPainel, alturaGrid);
            mainPanel.add(painel);

            painel.setPlantClickListener(spritePath -> gameCenario.setPlantaSelecionada(spritePath));

            new Janela("Plants vs Zombies", larguraGrid + larguraPainel, alturaGrid, mainPanel);

            controller.iniciarJogo();
        });
    }
}