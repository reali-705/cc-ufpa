package ufpa.icen.pvz.view.tiles;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class Tiles extends JPanel {

    private final List<PlantaSlot> slots = new ArrayList<>();
    private PlantaSlot selecionado;

    public interface PlantClickListener {
        void plantaSelecionada(String spritePath);
    }

    private PlantClickListener listener;

    public Tiles() {
        setLayout(null);
        setBackground(new Color(30, 30, 30)); // cor escura de fundo
        setOpaque(true);

        // Adiciona slots (coordenadas podem ser ajustadas)
        adicionarSlot("/assets/girassol.png", 10, 10);
        adicionarSlot("/assets/disparaervilha.png", 10, 90);

        // garante que tudo seja desenhado
        revalidate();
        repaint();
    }

    public void setPlantClickListener(PlantClickListener listener) {
        this.listener = listener;
    }

    private void adicionarSlot(String spritePath, int x, int y) {
        PlantaSlot slot = new PlantaSlot(spritePath, x, y);
        slots.add(slot);
        add(slot);
    }

    // ------------------------
    // Classe interna para cada slot
    // ------------------------
    private class PlantaSlot extends JComponent {
        private final String spritePath;
        private final int largura = 64;
        private final int altura = 64;
        private BufferedImage image; // carregada uma vez

        public PlantaSlot(String spritePath, int x, int y) {
            this.spritePath = spritePath;
            setBounds(x, y, largura, altura);
            setOpaque(true);

            // tenta carregar a imagem no construtor (uma só vez)
            try {
                image = ImageIO.read(getClass().getResourceAsStream(spritePath));
            } catch (Exception ex) {
                image = null;
                System.err.println("tiles: falha ao carregar " + spritePath + " -> " + ex.getMessage());
            }

            addMouseListener(new MouseAdapter() {
                @Override
                public void mousePressed(MouseEvent e) {
                    selecionado = PlantaSlot.this;
                    repaint();

                    if (listener != null) {
                        listener.plantaSelecionada(spritePath);
                    }
                }
            });
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);

            // fundo do slot
            g.setColor(new Color(50, 50, 50));
            g.fillRect(0, 0, largura, altura);

            // borda se selecionado
            if (selecionado == this) {
                g.setColor(Color.YELLOW);
                g.drawRect(0, 0, largura - 1, altura - 1);
                g.drawRect(1, 1, largura - 3, altura - 3);
            } else {
                g.setColor(Color.DARK_GRAY);
                g.drawRect(0, 0, largura - 1, altura - 1);
            }

            // desenha sprite (fallback: placeholder)
            if (image != null) {
                g.drawImage(image, 0, 0, largura, altura, this);
            } else {
                // placeholder simples (X)
                g.setColor(Color.LIGHT_GRAY);
                g.fillRect(4, 4, largura - 8, altura - 8);
                g.setColor(Color.RED);
                g.drawLine(6, 6, largura - 6, altura - 6);
                g.drawLine(largura - 6, 6, 6, altura - 6);
            }
        }
    }
}
