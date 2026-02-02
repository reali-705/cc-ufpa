package ufpa.icen.pvz.api;

import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;

public interface IgameFrontend {

    PersonagemFrontEnd getSelecionado();

    // Ações do jogador
    void selecionar(int xPixel, int yPixel);
    void moverSelecionado(int dRow, int dCol);
    void criarPlanta(int row, int col, String spritePath);
    void apagarPlanta(int row, int col);
    

    // Zumbis
    void criarZumbi(int row, int col, String spritePath);
    void apagarZumbi(int row, int col);

    // Visual
    void toggleGrid();

    //projeteis 
    void criarProjetil(int row, int col, String spritePath);
    void apagarProjetil(int row, int col);

    // Configuração
    void setPlantaSelecionada(String spritePath);
}
