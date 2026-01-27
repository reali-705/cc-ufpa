package ufpa.icen.pvz.view;
import javax.swing.JPanel;
import java.awt.Graphics;
import java.awt.image.BufferedImage;

public abstract class Cenario extends JPanel {

    protected BufferedImage imagemFundo;

    protected Cenario() {
        configurar();
        criarComponentes();
        adicionarEventos();
    }

    protected void setImagemFundo(BufferedImage imagem) {
        this.imagemFundo = imagem;
    }

    protected abstract void configurar();
    protected abstract void criarComponentes();
    protected abstract void adicionarEventos();

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (imagemFundo != null) {
            g.drawImage(imagemFundo, 0, 0, getWidth(), getHeight(), null);
        }
    }
}
