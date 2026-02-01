// arquivo: ufpa.icen.pvz.grid.Grid.java
package ufpa.icen.pvz.view;

/**
 * Classe auxiliar que representa o tabuleiro (grid) e faz conversões.
 * offsetX/offsetY permitem posicionar o tabuleiro dentro do painel.
 */
public class GridFrontend {
    private final GridPreset preset;
    private final int rows;
    private final int cols;
    private final int offsetX; // margem em px à esquerda
    private final int offsetY; // margem em px em cima

    public GridFrontend(GridPreset preset, int rows, int cols, int offsetX, int offsetY) {
        this.preset = preset;
        this.rows = rows;
        this.cols = cols;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    public GridFrontend(GridPreset preset) {
        this(preset, preset.getDefaultRows(), preset.getDefaultCols(), 0, 0);
    }

    public int getCellSize() { return preset.getCellSize(); }
    public int getRows() { return rows; }
    public int getCols() { return cols; }
    public int getOffsetX() { return offsetX; }
    public int getOffsetY() { return offsetY; }

    // converte coluna -> pixel X (esquerda da célula)
    public int cellToPixelX(int col) {
        return offsetX + col * getCellSize();
    }

    // converte linha -> pixel Y (topo da célula)
    public int cellToPixelY(int row) {
        return offsetY + row * getCellSize();
    }

    // devolve o centro da célula (útil para posicionar sprites no centro)
    public int cellCenterX(int col) {
        return cellToPixelX(col) + getCellSize() / 2;
    }
    public int cellCenterY(int row) {
        return cellToPixelY(row) + getCellSize() / 2;
    }

    // converte pixel (x) -> coluna (usa floor)
    public int pixelToCol(int x) {
        int col = (x - offsetX) / getCellSize();
        return col;
    }

    // converte pixel (y) -> linha
    public int pixelToRow(int y) {
        int row = (y - offsetY) / getCellSize();
        return row;
    }

    public boolean isValidCell(int row, int col) {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }
}
