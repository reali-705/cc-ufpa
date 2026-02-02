package ufpa.icen.pvz.view.cenario;

import ufpa.icen.pvz.view.GridFront.GridFrontend;
import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;
import ufpa.icen.pvz.view.personagem.ProjetilFrontend;
import ufpa.icen.pvz.controller.EntityManagerFrontend;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

public class GameRenderer {

    private final GridFrontend grid;
    private final EntityManagerFrontend entities;
    private BufferedImage fundoImage;
    private boolean showGrid = true;

    public GameRenderer(GridFrontend grid, EntityManagerFrontend entities) {
        this.grid = grid;
        this.entities = entities;
    }

    public void setFundo(BufferedImage fundo) { this.fundoImage = fundo; }
    public void setShowGrid(boolean show) { this.showGrid = show; }
    public boolean isShowGrid() { return showGrid; }

    public void render(Graphics g) {
        // Fundo
        if (fundoImage != null) {
            int largura = grid.getCols() * grid.getCellSize() + grid.getOffsetX();
            int altura  = grid.getRows() * grid.getCellSize() + grid.getOffsetY();
            g.drawImage(fundoImage, 0, 0, largura, altura, null);
        }

        // Grid
        if (showGrid) drawGridLines(g);

        // Desenha plantas
        for (PersonagemFrontEnd p : entities.getPlantas()) {
            p.desenhar(g);
        }

        // Desenha zumbis
        for (PersonagemFrontEnd z : entities.getZumbis()) {
            z.desenhar(g);
        }

        // Desenha projeteis
        for (ProjetilFrontend proj : entities.getProjeteis()) {
            proj.desenhar(g);
        }
    }

    private void drawGridLines(Graphics g) {
        int cols = grid.getCols();
        int rows = grid.getRows();
        int cell = grid.getCellSize();

        for (int c = 0; c <= cols; c++) {
            int x = grid.getOffsetX() + c * cell;
            g.drawLine(x, grid.getOffsetY(), x, grid.getOffsetY() + rows * cell);
        }

        for (int r = 0; r <= rows; r++) {
            int y = grid.getOffsetY() + r * cell;
            g.drawLine(grid.getOffsetX(), y,
                       grid.getOffsetX() + cols * cell, y);
        }
    }
}
