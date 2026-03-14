package ufpa.icen.pvz.view.personagem;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import ufpa.icen.pvz.assets.Assets;
import ufpa.icen.pvz.view.GridFront.GridFrontend;

/**
 * Classe base abstrata para qualquer entidade visual no grid.
 *
 * Responsabilidades:
 * - Guardar posição (linha, coluna)
 * - Converter célula -> pixel via GridFrontend
 * - Desenhar o sprite
 *
 */
public abstract class PersonagemFrontEnd {

    protected int linha;
    protected int coluna;

    protected final GridFrontend grid;
    protected final BufferedImage imagem;

    protected PersonagemFrontEnd(
            String pathImagem,
            int linha,
            int coluna,
            GridFrontend grid
    ) {
        if (grid == null) {
            throw new IllegalArgumentException("GridFrontend não pode ser null.");
        }
        if (!grid.isValidCell(linha, coluna)) {
            throw new IllegalArgumentException(
                "Posição inicial inválida: (" + linha + "," + coluna + ")"
            );
        }

        this.imagem = Assets.get(pathImagem);
        this.grid = grid;
        this.linha = linha;
        this.coluna = coluna;

        if (this.imagem == null) {
            System.err.println("Imagem não encontrada: " + pathImagem);
        }
    }

    // -----------------------
    // Desenho
    // -----------------------

    public void desenhar(Graphics g) {
        if (imagem == null) return;

        g.drawImage(
            imagem,
            getX(),
            getY(),
            getLargura(),
            getAltura(),
            null
        );
    }

    // -----------------------
    // Movimento (apenas grid)
    // -----------------------

    public boolean moveGrid(int dRow, int dCol) {
        int nRow = linha + dRow;
        int nCol = coluna + dCol;

        if (!grid.isValidCell(nRow, nCol)) {
            return false;
        }

        linha = nRow;
        coluna = nCol;
        return true;
    }

    public void setGridPos(int linha, int coluna) {
        if (!grid.isValidCell(linha, coluna)) {
            throw new IllegalArgumentException(
                "Posição inválida: (" + linha + "," + coluna + ")"
            );
        }
        this.linha = linha;
        this.coluna = coluna;
    }

    // -----------------------
    // Conversão célula -> pixel
    // -----------------------

    public int getX() {
        int px = grid.cellToPixelX(coluna);
        return px + (grid.getCellSize() - getLargura()) / 2;
    }

    public int getY() {
        int py = grid.cellToPixelY(linha);
        return py + (grid.getCellSize() - getAltura()) / 2;
    }

    public int getCenterX() {
        return grid.cellCenterX(coluna);
    }

    public int getCenterY() {
        return grid.cellCenterY(linha);
    }

    // -----------------------
    // Sprite
    // -----------------------

    public BufferedImage getImagem() {
        return imagem;
    }

    public int getLargura() {
        return imagem != null ? imagem.getWidth() : 0;
    }

    public int getAltura() {
        return imagem != null ? imagem.getHeight() : 0;
    }

    // -----------------------
    // Interação (clique)
    // -----------------------

    public boolean contain(int px, int py) {
        int left = getX();
        int top = getY();
        return px >= left && px <= left + getLargura()
            && py >= top && py <= top + getAltura();
    }

    // -----------------------
    // Info
    // -----------------------

    public int getLinha() {
        return linha;
    }

    public int getColuna() {
        return coluna;
    }

    public GridFrontend getGrid() {
        return grid;
    }
}
