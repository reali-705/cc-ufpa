package ufpa.icen.pvz.view;

import ufpa.icen.pvz.assets.Assets;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;

import javax.swing.AbstractAction;
import javax.swing.KeyStroke;

public class GameCenario extends Cenario {

    private BufferedImage fundoImage;
    private List<PersonagemFrontEnd> personagens;
    private PersonagemFrontEnd selecionado;

    // Grid (frontend) — responsável por conversões célula <-> pixel
    private GridFrontend grid;

    public GameCenario() {
        super();
    }

    @Override
    protected void configurar() {
        setLayout(null);
        setFocusable(true);
    }

    @Override
    protected void criarComponentes() {
        personagens = new ArrayList<>();

        // cria o grid frontend (preset configurável)
        grid = new GridFrontend(GridPreset.MEDIUM);

        try {
            fundoImage = Assets.get("/assets/fundo.png");
        } catch (Exception e) {
            fundoImage = null;
        }

        // cria um personagem inicial no centro do tabuleiro (linha/col)
        int inicialRow = grid.getRows() / 2;
        int inicialCol = grid.getCols() / 2;

        // Nota: PersonagemFrontEnd deve ter CONSTRUTOR (assetPath, row, col, grid)
        PersonagemFrontEnd inicial =
                new PersonagemFrontEnd("/assets/girassol.png", inicialRow, inicialCol, grid);

        personagens.add(inicial);
        selecionado = inicial;
    }

    @Override
    protected void adicionarEventos() {
        requestFocusInWindow();

        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                int mx = e.getX();
                int my = e.getY();

                // tenta selecionar personagem existente (do topo para baixo)
                PersonagemFrontEnd clicado = null;
                for (int i = personagens.size() - 1; i >= 0; i--) {
                    PersonagemFrontEnd p = personagens.get(i);
                    if (p.contain(mx, my)) {
                        clicado = p;
                        break;
                    }
                }

                if (clicado != null) {
                    selecionado = clicado;
                    personagens.remove(clicado);
                    personagens.add(clicado); // traz pro topo
                } else {
                    // Converte clique em célula (grid)
                    int col = grid.pixelToCol(mx);
                    int row = grid.pixelToRow(my);

                    if (!grid.isValidCell(row, col)) {
                        requestFocusInWindow();
                        return; // clique fora do grid
                    }

                    // cria novo personagem NA CÉLULA (sem modo pixel)
                    PersonagemFrontEnd novo =
                            new PersonagemFrontEnd("/assets/girassol.png", row, col, grid);

                    personagens.add(novo);
                    selecionado = novo;
                }

                repaint();
                requestFocusInWindow();
            }
        });

        // Bindings de teclado — movimentação por célula
        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_LEFT, 0), "left");
        getActionMap().put("left", new AbstractAction() {
            @Override public void actionPerformed(ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(0, -1, grid);
                    repaint();
                }
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_RIGHT, 0), "right");
        getActionMap().put("right", new AbstractAction() {
            @Override public void actionPerformed(ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(0, 1, grid);
                    repaint();
                }
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_UP, 0), "up");
        getActionMap().put("up", new AbstractAction() {
            @Override public void actionPerformed(ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(-1, 0, grid);
                    repaint();
                }
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_DOWN, 0), "down");
        getActionMap().put("down", new AbstractAction() {
            @Override public void actionPerformed(ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(1, 0, grid);
                    repaint();
                }
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (fundoImage != null) {
            g.drawImage(fundoImage, 0, 0, getWidth(), getHeight(), this);
        }

        // desenha linhas do grid (útil para debug/visualização)
        drawGridLines(g);

        for (PersonagemFrontEnd p : personagens) {
            p.desenhar(g);
        }

        if (selecionado != null && selecionado.getImagem() != null) {
            g.drawRect(
                    selecionado.getX() - 2,
                    selecionado.getY() - 2,
                    selecionado.getLargura() + 4,
                    selecionado.getAltura() + 4
            );
        }
    }

    // Desenha linhas opcionais do grid — mantém a visualização do tabuleiro
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
            g.drawLine(grid.getOffsetX(), y, grid.getOffsetX() + cols * cell, y);
        }
    }
}
