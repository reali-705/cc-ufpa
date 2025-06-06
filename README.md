# TRABALHO DE PROJETO DE ALGORITMOS I
### O projeto é construir uma réplica do jogo **Angrys Birds** utilizando métodos de algoritmos ministrados em sala, utilizando diversas ferramentas e linguagens de programação - **JavaScript**, **HTML**, **TypeScript** - que serão explicadas no decorrer de cada atividade.

## ATIVIDADE 1
Primeiro contato com **HTML** e **JavaScript**, anexando um arquivo.png e um arquivo.js ao **HTML** para ser visualizado no navegador.
+ O PNG sendo uma foto da capa do jogo escolhido
+ O **JS** com uma função que adiciona um texto ao **HTML** e com comandos pop-up e no console do navegador.
+ O **HTML**, além de anexar tudo, possui uma pequena descrição do jogo escolhido.

## ATIVIDADE 2
Utilizando variáveis, funções, objetos e classe que estão conectadas com o jogo **Angrys Birds**.  
A página **HTML** contem a descrição dos elementos utilizados no **JS** e mostra o teste de 10 lançamentos.  
Aumentando a complexidade do **HTML** e do **JavaScript**. Criando descrição mais detalhada tanto do jogo quanto das variáveis, funções e objetos utilizados no **JS**
+ Foi adicionado ao *head* do **HTML** um *style* com algumas configurações do estilo dos elementos da página
    + O conteúdo desenvolve ainda mais detalhado a descrição do jogo e o conteúdo do **JS**;
    + O *style* cria características - como cor, fonte, tamanho e borda - para os elementos e uma classe.
+ Para o **JavaScript** as variáveis, uma classe e funções foram criadas para formar uma mecânica semelhante ao jogo em questão
    + função ***getRandomInt***: retorna um número inteiro entre determinados valores;
    + função ***calcular_componentes_velocidade***: afim de "quebrar" o vetor velocidade de lançamento para calcular em um plano cartenizano que será o cenário do jogo;
    + função ***verificar_colisao***: verifica a posição dos objetos (passaro e porco);
    + ***pontuacao_porco***: de acordo com o **atributo** *tamanho* da classe Porco, calcula uma pontuação aleatória utilizando a *getRandomInt*;
    + Para implementar a lógica das funções, um *looping* foi construído e gera informações no console da página.

## ATIVIDADE 3
Desenvolvendo classes e, para isso, um diagrama para auxiliar na criação de cada classe. Para a criação e visualização do diagrama, utilizei uma extensão do vscode: **PlantUML**, a qual utiliza a linguagem **PUML** que cria o diagrama a partir de textos. Com isso, as classes criadas foram:
+ **Personagem** -> sendo a base para as classes que serão descristas depois
    + atributos: tamanho, raio, posicao e vivo
    + métodos: constructor e verificar_colisao
+ **Porco** -> aprimorando o que havia desenvolvido na atividade 2, além de herdar da **Personagem**
    + atributos exclusivos: vida e pontos
    + métodos exclusivos: receber_dado e derrotar
+ **Passaro** -> herda da **Personagem** e desenvolve funções próprias
    + atributos exclusivos: dano, gravidade, velocidade e voando
    + métodos exclusivos: lancar, voar e acertar

Para melhor desenvolvimento foi feita uma estrutura em módulos para abrigar de forma mais organizada os arquivos e seus tipos, com isso, foi necessário instalar mais uma extensão do VSCode, o **Live Share**, para poder visualizar de forma eficiente todos os objetos criados pelas classes:
```
activity 3/
├── dist/
│   ├── classes/
│   │   ├── level.js
│   │   ├── passaro.js
│   │   ├── personagem.js
│   │   ├── porco.js
│   │   └── tamanho.js
│   ├── funcoes.js
│   └── main.js
├── src/
│   ├── classes/
│   │   ├── level.ts
│   │   ├── passaro.ts
│   │   ├── personagem.ts
│   │   ├── porco.ts
│   │   └── tamanho.ts
│   ├── funcoes.ts
│   └── main.ts
├── diagrama_classes.puml
├── estilo.css
├── pagina_jogo.html
├── tsconfig.json
└── tsconfig.tsbuildinfo
```
Nessa etapa o código principal foi elaborado em **TypeScript** localizado no diretório `activity 3/src/` e transpilado/compilado para **JavaScript** em `activity 3/dist/`, o arquivo `mian.ts` tem como estrutura unir todas as classes, implementar uma lógica que deixe o jogo funcional em uma *grid* dentro do arquivo `pagina_jogo.html`.
+ `classes/` abriga arquivos que possuem a estruta de cada classe no jogo de forma individual;
+ `estilo.css` é o arquivo que abriga as características e classes para os elementos do `pagina_jogo.html`;
+ `tsconfig.json` possui as configurações para a transpilação/compilação do **TypeScript** em **JavaScript**;
+ `pagina_jogo.html` é o arquivo principal que chama o `dist/main.js` e o `estilo.css`, e mostra o jogo com uma interface gráfica rudimentar através do navegador.

lembrando que, devido a estrutura em módulos, é essencial a extensão **Live Share** para o funcionamento correto do código.


## ATIVIDADE 4
Adicionando um arquivo.json para guardar array e utilizá-lo no código a partir da API fetch.


## ATIVIDADE 5
