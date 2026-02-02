package ufpa.icen.pvz.view;

import ufpa.icen.pvz.config.CenarioConfig;
import ufpa.icen.pvz.view.cenario.GameCenario;
import ufpa.icen.pvz.view.cenario.Janela;
import ufpa.icen.pvz.view.tiles.Tiles;

import javax.swing.*;
import java.awt.*;

public class GameView {

    public GameView() {
        // Cria o cenário e o painel lateral
        GameCenario gameCenario = new GameCenario();
        Tiles painel = new Tiles();

        // Pega os tamanhos da enum CenarioConfig
        int larguraGrid = CenarioConfig.GRID_LARGURA.getValor();
        int alturaGrid = CenarioConfig.GRID_ALTURA.getValor();
        int larguraPainel = CenarioConfig.PAINEL_LARGURA.getValor();

        JPanel mainPanel = new JPanel(null);
        mainPanel.setPreferredSize(new Dimension(larguraGrid + larguraPainel, alturaGrid));

        // Define bounds fixos para o grid e o painel
        gameCenario.setBounds(0, 0, larguraGrid, alturaGrid);
        mainPanel.add(gameCenario);

        painel.setBounds(larguraGrid, 0, larguraPainel, alturaGrid);
        mainPanel.add(painel);

        painel.setPlantClickListener(spritePath -> {
            System.out.println("Selecionou: " + spritePath);
            gameCenario.setPlantaSelecionada(spritePath);
        });

        new Janela(
                "Plants vs Zombies",
                larguraGrid + larguraPainel,
                alturaGrid,
                mainPanel
        );
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(GameView::new);
    }
}
