package ufpa.icen.pvz.FrontModel;


import ufpa.icen.pvz.view.personagem.PlantaFrontEnd;
import ufpa.icen.pvz.view.personagem.ZumbiFrontend;
import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;
import ufpa.icen.pvz.view.GridFront.GridFrontend;

import java.util.ArrayList;
import java.util.List;

public class GameModelFrontend {
    private final List<PlantaFrontEnd> plantas = new ArrayList<>();
    private final List<ZumbiFrontend> zumbis = new ArrayList<>();
    private PersonagemFrontEnd selecionado;
    private String plantaSelecionada;

    private final GridFrontend grid;

    public GameModelFrontend(GridFrontend grid) {
        this.grid = grid;
    }

    public GridFrontend getGrid() { return grid; }

    // operações
    public void addPlanta(PlantaFrontEnd p) {
        plantas.add(p);
        selecionado = p;
    }
    public void addZumbi(ZumbiFrontend z) {
        zumbis.add(z);
    }
    public void removePlantaAt(int row, int col) {
        plantas.removeIf(p -> p.getLinha() == row && p.getColuna() == col);
        if (selecionado != null && selecionado.getLinha() == row && selecionado.getColuna() == col) {
            selecionado = null;
        }
    }
    public void removeZumbiAt(int row, int col) {
        zumbis.removeIf(z -> z.getLinha() == row && z.getColuna() == col);
    }

    public List<PlantaFrontEnd> getPlantas() { return plantas; }
    public List<ZumbiFrontend> getZumbis() { return zumbis; }

    public void setPlantaSelecionada(String path) { this.plantaSelecionada = path; }
    public String getPlantaSelecionada() { return plantaSelecionada; }

    public void setSelecionado(PersonagemFrontEnd p) { this.selecionado = p; }
    public PersonagemFrontEnd getSelecionado() { return selecionado; }
}
 
