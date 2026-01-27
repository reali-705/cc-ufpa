package ufpa.icen.pvz.model.fase;

/**
 * Represents a line/row in a game phase.
 *
 * <p>This class holds a simple identifier and an optional
 * descriptive name for the line. Additional behavior or
 * properties can be added as the game logic evolves.</p>
 */
public class Linha {

    /**
     * Numerical identifier of this line (for example, its index or position).
     */
    private int numero;

    /**
     * Optional descriptive name for this line.
     */
    private String nome;

    /**
     * Returns the numerical identifier of this line.
     *
     * @return the line number
     */
    public int getNumero() {
        return numero;
    }

    /**
     * Sets the numerical identifier of this line.
     *
     * @param numero the line number to set
     */
    public void setNumero(int numero) {
        this.numero = numero;
    }

    /**
     * Returns the descriptive name of this line.
     *
     * @return the name, or {@code null} if none was set
     */
    public String getNome() {
        return nome;
    }

    /**
     * Sets the descriptive name of this line.
     *
     * @param nome the name to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "Linha{" +
                "numero=" + numero +
                ", nome='" + nome + '\'' +
                '}';
    }
}
