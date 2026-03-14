package ufpa.icen.pvz.controller;
import java.util.function.BiConsumer;
import javax.swing.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import javax.swing.AbstractAction;
import javax.swing.KeyStroke;
import ufpa.icen.pvz.view.GridFront.GridFrontend;
import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;

public class InputHandler {

    private final GridFrontend grid;
    private final EntityManagerFrontend entities;
    private PersonagemFrontEnd selecionado;
    private BiConsumer<Integer,Integer> onClick; // callback para criação de planta

    public InputHandler(GridFrontend grid, EntityManagerFrontend entities) {
        this.grid = grid;
        this.entities = entities;
    }

    public void setSelecionado(PersonagemFrontEnd p) { this.selecionado = p; }
    public PersonagemFrontEnd getSelecionado() { return selecionado; }

    public void setOnClick(BiConsumer<Integer,Integer> callback) {
        this.onClick = callback;
    }

    public MouseListener getMouseListener() {
        return new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                selecionarOuCriar(e.getX(), e.getY());
            }
        };
    }

    private void selecionarOuCriar(int mx, int my) {
        PersonagemFrontEnd clicado = entities.findByPixel(mx, my);
        if (clicado != null) {
            selecionado = clicado;
        } else {
            int row = grid.pixelToRow(my);
            int col = grid.pixelToCol(mx);
            if (grid.isValidCell(row, col) && onClick != null) {
                onClick.accept(row, col); // avisa GameCenario para criar planta
            }
        }
    }

    public void bindMovimento(JComponent comp, int key, int dRow, int dCol, Runnable repaint) {
        String action = "move_" + key;
        comp.getInputMap(JComponent.WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(key, 0), action);
        comp.getActionMap().put(action, new AbstractAction() {
            @Override
            public void actionPerformed(java.awt.event.ActionEvent e) {
                if (selecionado != null) {
                    selecionado.moveGrid(dRow, dCol);
                    repaint.run();
                }
            }
        });
    }
}
