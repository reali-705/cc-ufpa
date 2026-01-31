package ufpa.icen.pvz.view;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import ufpa.icen.pvz.assets.Assets;

public class PersonagemFrontEnd {

    private int x;
    private int y;
    private final BufferedImage imagem;

    public PersonagemFrontEnd(String pathImagem, int x, int y) {
        System.out.println("Carregando personagem: " + pathImagem);

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

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public BufferedImage getImagem() {
        return imagem;
    }

    public int getLargura() {
        return imagem != null ? imagem.getWidth() : 0;
    }

    public int getAltura() {
        return imagem != null ? imagem.getHeight() : 0;
    }

    public boolean contain(int px, int py) {
        return px >= x && px <= x + getLargura()
            && py >= y && py <= y + getAltura();
    }
}
