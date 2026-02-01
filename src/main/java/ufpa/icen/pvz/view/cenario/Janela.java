package ufpa.icen.pvz.view.cenario;
import javax.swing.JFrame;
// setSize(960, 720);

public class Janela extends JFrame{
    Cenario cenario;
    public Janela(String titulo, int largura, int altura){
        // Configurações básicas da janela
        super(titulo);
        setSize(largura, altura);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setVisible(true);
        this.cenario = new GameCenario();
        add(cenario);
    }
    
}
