package ufpa.icen.pvz.view;

import javax.swing.JPanel;

public abstract class Cenario extends JPanel {
    
    public Cenario() {
        configurar();
        criarComponentes();
        adicionarEventos();
    }
    
    protected abstract void configurar();
    protected abstract void criarComponentes();
    protected abstract void adicionarEventos();
}
