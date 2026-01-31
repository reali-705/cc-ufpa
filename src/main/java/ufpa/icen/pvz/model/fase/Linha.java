package ufpa.icen.pvz.model.fase;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.entidades.plantas.Planta;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;
import ufpa.icen.pvz.model.interfaces.Atirador;

/**
 * Representa uma linha do campo de jogo, responsável por gerenciar os
 * zumbis, plantas e projéteis presentes nessa linha.
 * <p>
 * A classe controla a criação e armazenamento das entidades na linha,
 * atualiza seus estados a cada ciclo de jogo (movimentação, disparos,
 * ataques) e realiza a detecção de colisões e remoção de entidades
 * que foram destruídas ou saíram de jogo.
 */
public class Linha {
    private final List<Zumbi> zumbis = new ArrayList<>();
    private final List<Projetil> projetis = new ArrayList<>();
    private final Planta[] plantas;

    // adicionar na config
    private static final double MARGEM_COLISAO = 0.5;

    private final double tamanho;
    private final int indice;

    public Linha(double tamanho, int indice) {
        this.plantas = new Planta[(int) tamanho];
        this.tamanho = tamanho;
        this.indice = indice;
    }

    public boolean adicionarPlanta(double posicaoX, TipoPlanta tipoPlanta) {
        int colunaDesejada = (int) posicaoX;

        if (colunaDesejada < 0 || colunaDesejada >= plantas.length) {
            System.out.println("Posição X inválida para a planta: " + colunaDesejada);
            return false;
        }
        if (plantas[colunaDesejada] != null && plantas[colunaDesejada].estaViva()) {
            System.out.println("Já existe uma planta viva na coluna: " + colunaDesejada);
            return false;
        }
        
        plantas[colunaDesejada] = tipoPlanta.criar(posicaoX, colunaDesejada);
        return true;
    }

    public void adicionarZumbi(TipoZumbi tipoZumbi) {
        try {
            Zumbi novoZumbi = tipoZumbi.criar(tamanho, this.indice);
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
            if (planta == null || !planta.estaViva()) {
                continue;
            }
            if (planta instanceof Atirador atirador) {
                for (Zumbi zumbi : zumbis) {
                    if (zumbi.getPosicaoX() >= planta.getPosicaoX()) {
                        Projetil projetil = atirador.atirar();
                        if (projetil != null) {
                            projetis.add(projetil);
                        }
                        break;
                    }
                }
            }
            planta.atualizar();
        }
    }

    private void atualizarProjeteis() {
        for (Projetil projetil : projetis) {            
            if (projetil.getPosicaoX() > tamanho) {
                continue;
            }
            for (Zumbi zumbi : zumbis) {
                if (Math.abs(projetil.getPosicaoX() - zumbi.getPosicaoX()) < MARGEM_COLISAO) {
                    projetil.setAlvo(zumbi);
                    break;
                }
            }
            projetil.atualizar();
        }
    }

    private boolean atualizarZumbis() {
        for (Zumbi zumbi : zumbis) {
            if (zumbi == null || !zumbi.estaViva()) {
                continue;
            }
            if (zumbi.getPosicaoX() < 0) {
                return true; // zumbi venceu
            }
            for (Planta planta : plantas) {
                if (planta == null || !planta.estaViva()) {
                    continue;
                }
                if (Math.abs(zumbi.getPosicaoX() - planta.getPosicaoX()) < MARGEM_COLISAO) {
                    zumbi.setAlvo(planta);
                    break;
                }
            }
            zumbi.atualizar();
        }
        return false;
    }

    // analisar melhor forma para verificar entidades mortas/destruidas
    private void limparMortos() {
        zumbis.removeIf(zumbi -> !zumbi.estaViva());
        projetis.removeIf(projetil -> !projetil.estaAtiva(tamanho));
        for (int i = 0; i < plantas.length; i++) {
            if (plantas[i] != null && !plantas[i].estaViva()) {
                plantas[i] = null;
            }
        }
    }

    public double getTamanho() { return tamanho; }
    public int getIndice() { return indice; }
    public List<Zumbi> getZumbis() { return zumbis; }
    public List<Projetil> getProjetis() { return projetis; }
    public List<Planta> getPlantas() { return Arrays.asList(plantas); }
}
