package ufpa.icen.pvz.view.cenario;

import ufpa.icen.pvz.api.IgameFrontend;
import ufpa.icen.pvz.assets.Assets;
import ufpa.icen.pvz.controller.EntityManagerFrontend;
import ufpa.icen.pvz.controller.InputHandler;
import ufpa.icen.pvz.view.GridFront.GridFrontend;
import ufpa.icen.pvz.view.GridFront.GridPreset;
import ufpa.icen.pvz.view.personagem.*;

import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.util.ArrayList;

/**
 * GameCenario: classe que delega render para GameRenderer,
 * input para InputHandler e guarda entidades via EntityManagerFrontend.
 *
 * Observação importante:
 * - ProjetilFrontend aqui é apenas visual; a lógica (movimento/colisão) pertence
 *   ao backend. Quando você tiver a classe backend Projetil, rode um loop
 *   de atualização lá e chame atualizarPosicaoProjetil(...) para sincronizar a posição.
 *   
 */
public class GameCenario extends Cenario implements IgameFrontend {

    private final GridFrontend grid;
    private final EntityManagerFrontend entities;
    private final InputHandler input;
    private final GameRenderer renderer;

    private String plantaSelecionada = "/assets/girassol.png";

    public GameCenario() {
        this.grid = new GridFrontend(GridPreset.MEDIUM);
        // três listas: plantas, zumbis, projeteis (frontend)
        this.entities = new EntityManagerFrontend(new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        this.input = new InputHandler(grid, entities);
        this.renderer = new GameRenderer(grid, entities);

        // clique no grid cria planta (usa plantaSelecionada atual)
        input.setOnClick((row, col) -> invokeOnEdt(() -> criarPlanta(row, col, plantaSelecionada)));

        setPreferredSize(new Dimension(960, 640));
        configurar();
        criarComponentes();
        adicionarEventos();
    }

    @Override
    protected void configurar() {
        setLayout(null);
        setFocusable(true);
        requestFocusInWindow();
    }

    @Override
    protected void criarComponentes() {
        BufferedImage fundo = Assets.get("/assets/fundo.png");
        renderer.setFundo(fundo);

        // planta inicial central
        int row = grid.getRows() / 2;
        int col = grid.getCols() / 2;
        PlantaFrontEnd inicial = new PlantaFrontEnd(plantaSelecionada, row, col, grid);
        entities.addPlanta(inicial);
        input.setSelecionado(inicial);
    }

    @Override
    protected void adicionarEventos() {
        addMouseListener(input.getMouseListener());

        bindTecla(KeyEvent.VK_LEFT,  0, -1);
        bindTecla(KeyEvent.VK_RIGHT, 0,  1);
        bindTecla(KeyEvent.VK_UP,   -1,  0);
        bindTecla(KeyEvent.VK_DOWN,  1,  0);

        getInputMap(WHEN_IN_FOCUSED_WINDOW)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_G, 0), "toggleGrid");
        getActionMap().put("toggleGrid", new AbstractAction() {
            @Override public void actionPerformed(java.awt.event.ActionEvent e) { toggleGrid(); }
        });
    }

    private void bindTecla(int key, int dRow, int dCol) {
        input.bindMovimento(this, key, dRow, dCol, this::repaint);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        // GameRenderer cuida de fundo, grid e entidades (inclusive projeteis)
        renderer.render(g);

        // destaque do selecionado
        PersonagemFrontEnd sel = getSelecionado();
        if (sel != null) {
            Color old = g.getColor();
            g.setColor(Color.RED);
            g.drawRect(sel.getX() - 2, sel.getY() - 2, sel.getLargura() + 4, sel.getAltura() + 4);
            g.setColor(old);
        }
    }

    // -----------------------
    // IgameFrontend overrides
    // -----------------------
    @Override
    public PersonagemFrontEnd getSelecionado() {
        PersonagemFrontEnd sel = input.getSelecionado();
        if (sel == null && !entities.getPlantas().isEmpty()) {
            sel = entities.getPlantas().get(entities.getPlantas().size() - 1);
        }
        return sel;
    }

    @Override
    public void selecionar(int xPixel, int yPixel) {
        PersonagemFrontEnd clicked = entities.findByPixel(xPixel, yPixel);
        if (clicked != null) input.setSelecionado(clicked);
        repaint();
    }

    @Override
    public void moverSelecionado(int dRow, int dCol) {
        PersonagemFrontEnd sel = getSelecionado();
        if (sel != null) {
            sel.moveGrid(dRow, dCol);
            repaint();
        }
    }

    @Override
    public void criarPlanta(int row, int col, String spritePath) {
        if (!grid.isValidCell(row, col) || spritePath == null) return;
        invokeOnEdt(() -> {
            PlantaFrontEnd p = new PlantaFrontEnd(spritePath, row, col, grid);
            entities.addPlanta(p);
            input.setSelecionado(p);
            repaint();
        });
    }

    @Override
    public void apagarPlanta(int row, int col) {
        invokeOnEdt(() -> {
            entities.removePlantaAt(row, col);
            repaint();
        });
    }

    @Override
    public void criarZumbi(int row, int col, String spritePath) {
        if (!grid.isValidCell(row, col) || spritePath == null) return;
        invokeOnEdt(() -> {
            ZumbiFrontend z = new ZumbiFrontend(spritePath, row, col, grid);
            entities.addZumbi(z);
            repaint();
        });
    }

    @Override
    public void apagarZumbi(int row, int col) {
        invokeOnEdt(() -> {
            entities.removeZumbiAt(row, col);
            repaint();
        });
    }

    /**
     * Cria um projetil frontend (visual) — sem backend.
     * Quando você implementar o backend do projetil, faça o loop de atualização
     * no backend e chame atualizarPosicaoProjetil(...) para sincronizar a posição.
     */
    @Override
    public void criarProjetil(int row, int col, String spritePath) {
        if (!grid.isValidCell(row, col) || spritePath == null) return;
        invokeOnEdt(() -> {
            ProjetilFrontend pf = new ProjetilFrontend(row, col, spritePath, grid);
            entities.addProjetil(pf);
            repaint();
        });
    }

    @Override
    public void apagarProjetil(int row, int col) {
        invokeOnEdt(() -> {
            entities.removeProjetilAt(row, col);
            repaint();
        });
    }

    /**
     * Sincroniza posição do projetil frontend com o backend.
     * Chame isto a partir do seu game-loop/backend depois de atualizar o backend.
     */
    public void atualizarPosicaoProjetil(ProjetilFrontend pf, int row, int col) {
        invokeOnEdt(() -> {
            pf.atualizarPosicao(row, col);
            repaint();
        });
    }

    @Override
    public void toggleGrid() {
        renderer.setShowGrid(!renderer.isShowGrid());
        repaint();
    }

    @Override
    public void setPlantaSelecionada(String spritePath) {
        this.plantaSelecionada = spritePath;
    }

    // -----------------------
    // Utilitário EDT
    // -----------------------
    private static void invokeOnEdt(Runnable r) {
        if (SwingUtilities.isEventDispatchThread()) r.run();
        else SwingUtilities.invokeLater(r);
    }
}
