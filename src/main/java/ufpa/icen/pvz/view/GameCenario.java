package ufpa.icen.pvz.view;

import ufpa.icen.pvz.assets.Assets;
import ufpa.icen.pvz.view.PersonagemFrontEnd;

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

        try {
            fundoImage = Assets.get("/assets/fundo.png");
        } catch (Exception e) {
            fundoImage = null;
        }

        PersonagemFrontEnd inicial =
                new PersonagemFrontEnd("/assets/girassol.png", 200, 300);

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
                    personagens.add(clicado);
                } else {
                    PersonagemFrontEnd novo =
                            new PersonagemFrontEnd("/assets/girassol.png", mx, my);

                    novo.setPosicao(
                            mx - novo.getLargura() / 2,
                            my - novo.getAltura() / 2
                    );

                    personagens.add(novo);
                    selecionado = novo;
                }

                repaint();
                requestFocusInWindow();
            }
        });

        int move = 8;

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_LEFT, 0), "left");

        getActionMap().put("left", new AbstractAction() {
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null)
                    selecionado.move(-move, 0);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_RIGHT, 0), "right");

        getActionMap().put("right", new AbstractAction() {
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null)
                    selecionado.move(move, 0);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_UP, 0), "up");

        getActionMap().put("up", new AbstractAction() {
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null)
                    selecionado.move(0, -move);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED)
                .put(KeyStroke.getKeyStroke(KeyEvent.VK_DOWN, 0), "down");

        getActionMap().put("down", new AbstractAction() {
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null)
                    selecionado.move(0, move);
                repaint();
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (fundoImage != null) {
            g.drawImage(fundoImage, 0, 0,
                    getWidth(), getHeight(), this);
        }

        for (PersonagemFrontEnd p : personagens) {
            p.desenhar(g);
        }

        if (selecionado != null &&
            selecionado.getImagem() != null) {

            g.drawRect(
                    selecionado.getX() - 2,
                    selecionado.getY() - 2,
                    selecionado.getLargura() + 4,
                    selecionado.getAltura() + 4
            );
        }
    }
}
