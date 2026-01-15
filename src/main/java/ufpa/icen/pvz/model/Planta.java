package ufpa.icen.pvz.model;

public class Planta extends EntidadeViva implements Atacante {
    int dano;
    int alcance;
    int cooldownAttack;
    
    public Planta(int vida, int dano, double posicaoX, int posicaoY) {
        super(vida, posicaoX, posicaoY);
        this.dano = dano;
        this.cooldownAttack = 1000; // Exemplo de cooldown em milissegundos
    }
    
    @Override
    public void atacar() {
        // Implementação do ataque da planta
    }

    @Override
    public boolean podeAtacar() {
        return this.estado == EstadoEntidade.VIVA;
    }

    @Override
    public void atualizar() {
        // Lógica de atualização da planta (ex: verificar se pode atacar)
    }

    public int getDano() {
        return dano;
    }

    public int getAlcance() {
        return alcance;
    }
    
}
