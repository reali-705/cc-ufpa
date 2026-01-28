package ufpa.icen.pvz.model.fase;

import java.util.ArrayList;
import java.util.List;

import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.entidades.plantas.Planta;
import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.interfaces.Atirador;

/** */
public class Linha {
    private final List<Zumbi> zumbis = new ArrayList<>();
    private final List<Planta> plantas = new ArrayList<>();
    private final List<Projetil> projetis = new ArrayList<>();

    // adicionar na config
    private static final double MARGEM_COLISAO = 0.5;

    private final double tamanho;
    private final int indice;

    public Linha(double tamanho,int indice) {
        this.tamanho = tamanho;
        this.indice = indice;
    }

    public boolean adicionarPlanta(double posicaoX, Class<? extends Planta> tipoPlanta) {
        if (posicaoX < 0 || posicaoX > tamanho) {
            System.err.println("Posição inválida tentando adicionar planta.");
            return false;
        }

        int colunaDesejada = (int) posicaoX;
        for (Planta planta : plantas) {
            if ((int) planta.getPosicaoX() == colunaDesejada) {
                System.out.println("Já existe uma planta na coluna " + colunaDesejada + ". Não é possível adicionar outra.");
                return false;
            }
        }
        
        try {
            Planta novPlanta = tipoPlanta
                .getDeclaredConstructor(double.class, int.class)
                .newInstance(posicaoX, this.indice);
            plantas.add(novPlanta);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public void adicionarZumbi(Class<? extends Zumbi> tipoZumbi) {
        try {
            Zumbi novoZumbi = tipoZumbi
                .getDeclaredConstructor(double.class, int.class)
                .newInstance(tamanho, this.indice);
            zumbis.add(novoZumbi);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean atualizar() {
        atualizarPlantas();
        atualizarProjeteis();
        if (atualizarZumbis()) {
            return true;
        }
        limparMortos();
        return false;
    }

    private void atualizarPlantas() {
        if (zumbis.isEmpty()) {
            return;
        }
        for (Planta planta : plantas) {
            if (planta instanceof Atirador atirador) {
                boolean zumbiNaFrente = false;

                for (Zumbi zumbi : zumbis) {
                    if (zumbi.getPosicaoX() > planta.getPosicaoX()) {
                        zumbiNaFrente = true;
                        break;
                    }
                }

                if (zumbiNaFrente) {
                    Projetil projetil = atirador.atirar();
                    if (projetil != null) {
                        projetis.add(projetil);
                    }
                }
            }
        }
    }

    private void atualizarProjeteis() {
        for (Projetil projetil : projetis) {
            projetil.mover();
            if (projetil.getPosicaoX() > tamanho) {
                projetil.setEstado(EstadoEntidade.MORTA);
                continue;
            }
            for (Zumbi zumbi : zumbis) {
                if (Math.abs(projetil.getPosicaoX() - zumbi.getPosicaoX()) < MARGEM_COLISAO) {
                    projetil.atingir(zumbi);
                    projetil.setEstado(EstadoEntidade.MORTA); // passar para logica do atingir
                    break;
                }
            }
        }
    }

    private boolean atualizarZumbis() {
        for (Zumbi zumbi : zumbis) {
            if (!zumbi.estaViva()) {
                continue;
            }
            if (zumbi.getPosicaoX() <= 0) {
                return true; // zumbi venceu
            }
            if (zumbi.getEstado() == EstadoEntidade.MOVENDO) {
                zumbi.mover();
            }

            boolean atacou = false;
            for (Planta planta : plantas) {
                if (!planta.estaViva()) {
                    continue;
                }
                if (Math.abs(zumbi.getPosicaoX() - planta.getPosicaoX()) < MARGEM_COLISAO) {
                    zumbi.setEstado(EstadoEntidade.ATACANDO); // deve ser passado para a logica do atingir
                    zumbi.atingir(planta);
                    atacou = true;
                    if (!planta.estaViva()) {
                        zumbi.setEstado(EstadoEntidade.MOVENDO);
                    }
                    break;
                }
            }
            if (!atacou && zumbi.getEstado() == EstadoEntidade.ATACANDO) {
                zumbi.setEstado(EstadoEntidade.MOVENDO);
            }
        }
        return false;
    }

    // analisar melhor forma para verificar entidades mortas/destruidas
    private void limparMortos() {
        zumbis.removeIf(zumbi -> !zumbi.estaViva());
        plantas.removeIf(planta -> !planta.estaViva());
        projetis.removeIf(projetil -> projetil.getEstado() == EstadoEntidade.MORTA);
    }
}
