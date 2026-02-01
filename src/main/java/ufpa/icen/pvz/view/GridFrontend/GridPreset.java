// arquivo: ufpa.icen.pvz.grid.GridPreset.java
package ufpa.icen.pvz.view.GridFrontend;

/**
 * Presets para o tamanho da célula e valores padrão de grid.
 * Use os presets (SMALL/MEDIUM/LARGE) ou adicione outros de acordo com o backend.
 */
public enum GridPreset {
    SMALL(32, 10, 10),
    MEDIUM(64, 10, 15),
    LARGE(128, 6, 10);

    private final int cellSize;   // pixels por célula
    private final int defaultRows;
    private final int defaultCols;

    GridPreset(int cellSize, int defaultRows, int defaultCols) {
        this.cellSize = cellSize;
        this.defaultRows = defaultRows;
        this.defaultCols = defaultCols;
    }

    public int getCellSize() { return cellSize; }
    public int getDefaultRows() { return defaultRows; }
    public int getDefaultCols() { return defaultCols; }
}
