package ufpa.icen.pvz.view.personagem;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import ufpa.icen.pvz.assets.Assets;
import ufpa.icen.pvz.view.GridFrontend.GridFrontend;


/**
 * PersonagemFrontEnd 
 *
 * - Guarda apenas (linha, coluna) e um GridFrontend para conversões célula <-> pixel.
    * - Responsável por desenhar o sprite na posição correta.
 */
public class PersonagemFrontEnd {

    private int linha;
    private int coluna;
    private final GridFrontend grid;
    private final BufferedImage imagem;

    /**
     * Construtor GRID-only.
     *
     * @param pathImagem caminho para o asset (passado para Assets.get)
     * @param linha linha inicial (0-index)
     * @param coluna coluna inicial (0-index)
     * @param grid instancia do GridFrontend que será usada para conversões
     * @throws IllegalArgumentException se grid for null ou (linha,coluna) inválidos
     */
    public PersonagemFrontEnd(String pathImagem, int linha, int coluna, GridFrontend grid) {
        if (grid == null) {
            throw new IllegalArgumentException("GridFrontend não pode ser null.");
        }
        if (!grid.isValidCell(linha, coluna)) {
            throw new IllegalArgumentException("Posição inicial inválida: (" + linha + "," + coluna + ")");
        }

        this.imagem = Assets.get(pathImagem);
        this.grid = grid;
        this.linha = linha;
        this.coluna = coluna;

        if (this.imagem == null) {
            System.err.println("Personagem: imagem não encontrada em " + pathImagem);
        }
    }

    /**
     * Desenha o sprite na posição derivada do grid (centralizado dentro da célula).
     */
    public void desenhar(Graphics g) {
        if (imagem == null) return;

        int drawX = getX();
        int drawY = getY();

        g.drawImage(imagem, drawX, drawY, getLargura(), getAltura(), null);
    }

    /**
     * Move o personagem por células (dRow, dCol).
     * Retorna true se o movimento foi aplicado (celula válida), false caso contrário.
     *
     * IMPORTANT: este método apenas valida limites do GridFrontend. Para regras de jogo
     * (ocupação, colisão, custos etc.) consulte o backend antes de chamar.
     */
    public boolean moveGrid(int dRow, int dCol, GridFrontend gridArg) {
        GridFrontend g = (gridArg != null) ? gridArg : this.grid;
        if (g == null) return false;

        int nRow = this.linha + dRow;
        int nCol = this.coluna + dCol;

        if (!g.isValidCell(nRow, nCol)) {
            return false;
        }

        this.linha = nRow;
        this.coluna = nCol;
        return true;
    }

    /**
     * Define a posição do personagem no grid (usa validação do GridFrontend).
     */
    public void setGridPos(int linha, int coluna) {
        if (!grid.isValidCell(linha, coluna)) {
            throw new IllegalArgumentException("Posição inválida: (" + linha + "," + coluna + ")");
        }
        this.linha = linha;
        this.coluna = coluna;
    }

    // -----------------------
    // Conversões / getters em pixels
    // -----------------------

    /**
     * Retorna a coordenada X (pixel) do topo-esquerdo do sprite (centralizado na célula).
     */
    public int getX() {
        int px = grid.cellToPixelX(coluna);
        return px + (grid.getCellSize() - getLargura()) / 2;
    }

    /**
     * Retorna a coordenada Y (pixel) do topo-esquerdo do sprite (centralizado na célula).
     */
    public int getY() {
        int py = grid.cellToPixelY(linha);
        return py + (grid.getCellSize() - getAltura()) / 2;
    }

    public BufferedImage getImagem() {
        return imagem;
    }

    public int getLargura() {
        return imagem != null ? imagem.getWidth() : 0;
    }

    public int getAltura() {
        return imagem != null ? imagem.getHeight() : 0;
    }

    /**
     * Verifica se um ponto em pixels está dentro do sprite (usado para seleção por clique).
     */
    public boolean contain(int px, int py) {
        int left = getX();
        int top = getY();
        int right = left + getLargura();
        int bottom = top + getAltura();
        return px >= left && px <= right && py >= top && py <= bottom;
    }

    // -----------------------
    // Info do grid
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

    // -----------------------
    // Utilitários 
    // -----------------------

    /**
     * Retorna o centro X em pixels da célula (útil para efeitos / alinhamentos).
     */
    public int getCenterX() {
        return grid.cellCenterX(coluna);
    }

    /**
     * Retorna o centro Y em pixels da célula (útil para efeitos / alinhamentos).
     */
    public int getCenterY() {
        return grid.cellCenterY(linha);
    }
}
