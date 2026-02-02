// Frontend
package ufpa.icen.pvz.view.personagem;

import ufpa.icen.pvz.view.GridFront.GridFrontend;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import ufpa.icen.pvz.assets.Assets;

public class ProjetilFrontend {

    private int row;
    private int col;
    private final BufferedImage sprite;
    private final GridFrontend grid;

    /**
     * Cria um projetil frontend para renderização.
     * @param row linha inicial
     * @param col coluna inicial
     * @param spritePath caminho do sprite
     * @param grid referência da grid para posicionamento
     */
    public ProjetilFrontend(int row, int col, String spritePath, GridFrontend grid) {
        this.row = row;
        this.col = col;
        this.sprite = Assets.get(spritePath);
        this.grid = grid;
    }

    /**
     * Atualiza a posição do projetil, com base no backend.
     */
    public void atualizarPosicao(int row, int col) {
        this.row = row;
        this.col = col;
    }

    /**
     * Desenha o projetil no componente gráfico.
     */
    public void desenhar(Graphics g) {
        int x = grid.getOffsetX() + col * grid.getCellSize();
        int y = grid.getOffsetY() + row * grid.getCellSize();
        g.drawImage(sprite, x, y, grid.getCellSize(), grid.getCellSize(), null);
    }

    // Getters opcionais
    public int getRow() { return row; }
    public int getCol() { return col; }
}
