package ufpa.icen.pvz.view.cenario;

import ufpa.icen.pvz.assets.Assets;
import ufpa.icen.pvz.view.GridFront.GridFrontend;
import ufpa.icen.pvz.view.GridFront.GridPreset;
import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;
import ufpa.icen.pvz.view.personagem.PlantaFrontEnd;
import ufpa.icen.pvz.view.personagem.ZumbiFrontend;

import javax.swing.*;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

public class GameCenario extends Cenario {

    private BufferedImage fundoImage;

    private final List<PlantaFrontEnd> plantas = new ArrayList<>();
    private final List<ZumbiFrontend> zumbis = new ArrayList<>();

    private PersonagemFrontEnd selecionado;

    private GridFrontend grid;
    private boolean showGrid = true;

    // --- NOVO: planta selecionada pelo painel lateral (padrão: null)
    private String plantaSelecionada = null;

    public GameCenario() {
    setPreferredSize(new Dimension(960, 640)); // largura x altura da grid
    configurar();
    criarComponentes();
    adicionarEventos();
}


    // -----------------------
    // Configuração
    // -----------------------

    @Override
    protected void configurar() {
        setLayout(null);
        setFocusable(true);
        requestFocusInWindow();
    }

    @Override
    protected void criarComponentes() {
        grid = new GridFrontend(GridPreset.MEDIUM);
        fundoImage = Assets.get("/assets/fundo.png");

        int row = grid.getRows() / 2;
        int col = grid.getCols() / 2;

        PlantaFrontEnd inicial =
                new PlantaFrontEnd("/assets/girassol.png", row, col, grid);

        plantas.add(inicial);
        selecionado = inicial;
    }

    // -----------------------
    // Eventos
    // -----------------------

    @Override
    protected void adicionarEventos() {

        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                selecionarOuCriarPlanta(e.getX(), e.getY());
            }
        });

        bindMovimento(KeyEvent.VK_LEFT,  0, -1);
        bindMovimento(KeyEvent.VK_RIGHT, 0,  1);
        bindMovimento(KeyEvent.VK_UP,   -1,  0);
        bindMovimento(KeyEvent.VK_DOWN,  1,  0);

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_G, 0), "toggleGrid");

        getActionMap().put("toggleGrid", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showGrid = !showGrid;
                repaint();
            }
        });
    }

    private void bindMovimento(int key, int dRow, int dCol) {
        String action = "move_" + key;

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(key, 0), action);

        getActionMap().put(action, new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(dRow, dCol);
                    repaint();
                }
            }
        });
    }

    private void selecionarOuCriarPlanta(int mx, int my) {
        PersonagemFrontEnd clicado = findByPixel(mx, my);

        if (clicado != null) {
            selecionar(clicado);
            return;
        }

        int row = grid.pixelToRow(my);
        int col = grid.pixelToCol(mx);

        if (grid.isValidCell(row, col)) {
            // Se o painel lateral definiu uma planta (sprite), usa-a.
            // Caso contrário, mantém o comportamento antigo (desenharPlanta).
            if (plantaSelecionada != null) {
                adicionarPlanta(row, col, plantaSelecionada);
            } else {
                desenharPlanta(row, col);
            }
        }
    }

    private void selecionar(PersonagemFrontEnd p) {
        selecionado = p;
        repaint();
    }

    // -----------------------
    // Renderização
    // -----------------------

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (fundoImage != null) {
            g.drawImage(fundoImage, 0, 0, getWidth(), getHeight(), this);
        }

        if (showGrid) {
            drawGridLines(g);
        }

        for (PlantaFrontEnd p : plantas) {
            p.desenhar(g);
        }

        for (ZumbiFrontend z : zumbis) {
            z.desenhar(g);
        }

        if (selecionado != null) {
            g.drawRect(
                    selecionado.getX() - 2,
                    selecionado.getY() - 2,
                    selecionado.getLargura() + 4,
                    selecionado.getAltura() + 4
            );
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

    // -----------------------
    // API frontend-only
    // -----------------------

    // Mantive sua função existente (compatibilidade)
    public void desenharPlanta(int row, int col) {
        SwingUtilities.invokeLater(() -> {
            if (!grid.isValidCell(row, col)) return;

            PlantaFrontEnd planta =
                    new PlantaFrontEnd("/assets/girassol.png", row, col, grid);

            plantas.add(planta);
            selecionado = planta;
            repaint();
        });
    }

    public void desenharZumbi(int row, int col) {
        SwingUtilities.invokeLater(() -> {
            if (!grid.isValidCell(row, col)) return;

            ZumbiFrontend zumbi =
                    new ZumbiFrontend("/assets/zumbi.png", row, col, grid);

            zumbis.add(zumbi);
            repaint();
        });
    }

    public void apagarPlanta(int row, int col) {
        SwingUtilities.invokeLater(() -> {
            plantas.removeIf(p ->
                    p.getLinha() == row && p.getColuna() == col
            );
            repaint();
        });
    }

    public void apagarZumbi(int row, int col) {
        SwingUtilities.invokeLater(() -> {
            zumbis.removeIf(z ->
                    z.getLinha() == row && z.getColuna() == col
            );
            repaint();
        });
    }

   

    /**
     * Define qual sprite será usado quando o jogador clicar no grid para criar plantas.
     * Chamado por GameView/Tiles.
     */
    public void setPlantaSelecionada(String spritePath) {
        this.plantaSelecionada = spritePath;
    }

    /**
     * Cria/adiciona uma planta usando o spritePath fornecido.
     */
    public void adicionarPlanta(int row, int col, String spritePath) {
        SwingUtilities.invokeLater(() -> {
            if (!grid.isValidCell(row, col) || spritePath == null) return;

            PlantaFrontEnd planta = new PlantaFrontEnd(spritePath, row, col, grid);
            plantas.add(planta);
            selecionado = planta;
            repaint();
        });
    }

    // -----------------------
    // Utilitários
    // -----------------------

    private PersonagemFrontEnd findByPixel(int x, int y) {
        for (int i = plantas.size() - 1; i >= 0; i--) {
            if (plantas.get(i).contain(x, y)) return plantas.get(i);
        }
        for (int i = zumbis.size() - 1; i >= 0; i--) {
            if (zumbis.get(i).contain(x, y)) return zumbis.get(i);
        }
        return null;
    }
}
