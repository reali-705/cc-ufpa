package ufpa.icen.pvz.view.cenario;
import javax.swing.JPanel;
public abstract class Cenario extends JPanel {

    protected Cenario() {
    }

    protected abstract void configurar();
    protected abstract void criarComponentes();
    protected abstract void adicionarEventos();
}
