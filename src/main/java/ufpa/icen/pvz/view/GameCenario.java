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

/**
 * GameCenario: cenário de jogo que gera personagens  na tela.
 * - Clique com o mouse para plantar um girassol onde clicou.
 * - Clique sobre um girassol para selecioná-lo.
 * - Use as setas do teclado para mover o girassol selecionado.
 */
public class GameCenario extends Cenario {

    private BufferedImage fundoImage;
    private List<Personagem> personagens;
    private Personagem selecionado;

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
        // inicializa a lista aqui 
        personagens = new ArrayList<>();

       
        try {
            fundoImage = Assets.get("/assets/fundo.png");
        } catch (Exception e) {
            fundoImage = null;
        }

        // cria um girassol inicial (posição arbitrária)
        Personagem inicial = new Personagem("/assets/girassol.png", 200, 300);
        personagens.add(inicial);
        selecionado = inicial;
    }

    @Override
    protected void adicionarEventos() {
        // garantir foco para receber keybindings
        requestFocusInWindow();

        // mouse: clicar sobre um girassol seleciona; clicar em área vazia planta um novo
        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                int mx = e.getX();
                int my = e.getY();

                // tenta selecionar personagem clicado (do topo para baixo)
                Personagem clicado = null;
                for (int i = personagens.size() - 1; i >= 0; i--) {
                    Personagem p = personagens.get(i);
                    if (p.contain(mx, my)) {
                        clicado = p;
                        break;
                    }
                }

                if (clicado != null) {
                    selecionado = clicado;
                    // opcional: traz para frente (ultima posição)
                    personagens.remove(clicado);
                    personagens.add(clicado);
                } else {
                    // planta novo girassol (centra a imagem no clique)
                    Personagem novo = new Personagem("/assets/girassol.png", mx, my);
                    // ajustar para centralizar no clique (opcional)
                    novo.setPosicao(mx - novo.getLargura()/2, my - novo.getAltura()/2);
                    personagens.add(novo);
                    selecionado = novo;
                }
                repaint();
                requestFocusInWindow();
            }
        });

        // keybindings para mover o personagem selecionado
        int move = 8;
        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_LEFT, 0), "left");
        getActionMap().put("left", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null) selecionado.move(-move, 0);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_RIGHT, 0), "right");
        getActionMap().put("right", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null) selecionado.move(move, 0);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_UP, 0), "up");
        getActionMap().put("up", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null) selecionado.move(0, -move);
                repaint();
            }
        });

        getInputMap(WHEN_FOCUSED).put(KeyStroke.getKeyStroke(KeyEvent.VK_DOWN, 0), "down");
        getActionMap().put("down", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (selecionado != null) selecionado.move(0, move);
                repaint();
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // desenha o fundo esticado (se disponível)
        if (fundoImage != null) {
            g.drawImage(fundoImage, 0, 0, getWidth(), getHeight(), this);
        }

        // desenha todos os personagens
        for (Personagem p : personagens) {
            p.desenhar(g);
        }

        // opcional: desenhar indicação de seleção (um retângulo simples)
        if (selecionado != null && selecionado.imagem != null) {
            g.drawRect(selecionado.x - 2, selecionado.y - 2,
                       selecionado.getLargura() + 4, selecionado.getAltura() + 4);
        }
    }

    /**
     * Classe interna simples de Personagem para uso direto no frontend.
     * - x,y: posição do canto superior esquerdo
     * - imagem: carregada via Assets
     */
    private static class Personagem {
        private int x;
        private int y;
        private final BufferedImage imagem;

        public Personagem(String pathImagem, int x, int y) {
            System.out.println("Carregando girassol...");

            this.imagem = Assets.get(pathImagem);
            this.x = x;
            this.y = y;
            if (this.imagem == null) {
                System.err.println("Personagem: imagem não encontrada em " + pathImagem);
            }
        }

        public void desenhar(Graphics g) {
            if (imagem != null) {
                g.drawImage(imagem, x, y, null);
            }
        }

        public void move(int dx, int dy) {
            this.x += dx;
            this.y += dy;
        }

        public void setPosicao(int x, int y) {
            this.x = x;
            this.y = y;
        }

        // retorna largura/altura úteis para seleçoã/centralização
        public int getLargura() {
            return imagem != null ? imagem.getWidth() : 0;
        }

        public int getAltura() {
            return imagem != null ? imagem.getHeight() : 0;
        }

        // verifica se um ponto (px,py) está sobre a imagem (caixa retangular)
        public boolean contain(int px, int py) {
            return px >= x && px <= x + getLargura() && py >= y && py <= y + getAltura();
        }
    }
}
