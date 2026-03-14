% --- BASE DE CONHECIMENTO: ÁRVORE GENEALÓGICA ---

% --- FATOS ---
% Define quais indivíduos são mulheres.
% mulher(nome).
mulher(ana).
mulher(bia).
mulher(eva).
mulher(clo).
mulher(lia).
mulher(gal).
mulher(maria).

% Define quais indivíduos são homens.
% homem(nome).
homem(ivo).
homem(gil).
homem(rai).
homem(ary).
homem(noe).
homem(thor).

% Define a relação de progenitor.
% genitor(Progenitor, Filho).
genitor(ana, eva).
genitor(ivo, eva).
genitor(ana, maria).
genitor(ivo, maria).
genitor(bia, rai).
genitor(gil, rai).
genitor(bia, clo).
genitor(gil, clo).
genitor(bia, ary).
genitor(gil, thor).
genitor(bia, thor).
genitor(gil, ary).
genitor(eva, noe).
genitor(rai, noe).
genitor(ary, gal).
genitor(lia, gal).

% --- REGRAS ---
% Define a relação de pai.
% X é pai de Y se X é homem e é genitor de Y.
pai(X, Y) :- homem(X), genitor(X, Y).

% Define a relação de mae.
% X é mae de Y se X é mulher e é genitor de Y.
mae(X, Y) :- mulher(X), genitor(X, Y).

% Define um casal com base nos filhos em comum.
% X e Y sao um casal se ambos sao genitores de Z e X é diferente de Y.
casal(X, Y) :- genitor(X, Z), genitor(Y, Z), X \= Y.

% Define a relação de avós (gênero não especificado).
% X é avô/avó de Y se X é genitor de Z e Z é genitor de Y.
avos(X, Y) :- genitor(X, Z), genitor(Z, Y).

% Define a relação de avô (gênero masculino).
% X é avô de Y se X é pai de Z e Z é genitor de Y.
avoh(X, Y) :- pai(X, Z), genitor(Z, Y).

% Define a relação de avó (gênero feminino).
% X é avó de Y se X é mae de Z e Z é genitor de Y.
avom(X, Y) :- mae(X, Z), genitor(Z, Y).

% Define a relação de filho.
% X é filho de Y se Y é genitor de X e X é homem.
filho(X, Y) :- genitor(Y, X), homem(X).

% Define a relação de filha.
% X é filha de Y se Y é genitor de X e X é mulher.
filha(X, Y) :- genitor(Y, X), mulher(X).

% Define a relação de irmão (ambos os pais em comum).
% X é irmão de Y se X é homem, ambos têm o mesmo pai e a mesma mae, e X é diferente de Y.
irmao(X, Y) :- homem(X),
    pai(Z, X), pai(Z, Y),
    mae(W, X), mae(W, Y),
    X \= Y.

% Define a relação de irmã (ambos os pais em comum).
% X é irmã de Y se X é mulher, ambos têm o mesmo pai e a mesma mae, e X é diferente de Y.
irma(X, Y) :- mulher(X),
    pai(Z, X), pai(Z, Y),
    mae(W, X), mae(W, Y),
    X \= Y.

% Define a relação de meio-irmão (apenas um dos pais em comum).
% X é meio-irmão de Y se X é homem, X é diferente de Y, e eles têm apenas a mae ou apenas o pai em comum.
meio_irmao(X, Y) :- homem(X),
    pai(A, X), pai(B, Y),
    mae(C, X), mae(D, Y),
    X \= Y,
    (A \= B, C == D); (A == B, C \= D).

% Define a relação de meia-irmã (apenas um dos pais em comum).
% X é meia-irmã de Y se X é mulher, X é diferente de Y, e elas têm apenas a mae ou apenas o pai em comum.
meio_irma(X, Y) :- mulher(X),
    pai(A, X), pai(B, Y),
    mae(C, X), mae(D, Y),
    X \= Y,
    (A \= B, C == D); (A == B, C \= D).

% Define a relação de tio (por sangue ou casamento).
% X é tio de Y se X é irmão do genitor de Y, ou se X é casado com a irmã do genitor de Y.
tio(X, Y) :-
    genitor(A, Y),
    ( irmao(X, A);
    irma(B, A), mae(B, C), pai(X, C) ). % X é casado com B, que é irmã de A

% Define a relação de tia (por sangue ou casamento).
% X é tia de Y se X é irmã do genitor de Y, ou se X é casada com o irmão do genitor de Y.
tia(X, Y) :-
    genitor(A, Y),
    ( irma(X, A);
    irmao(B, A), pai(B, C), mae(X, C) ). % X é casada com B, que é irmão de A

% Define que uma pessoa é feliz se ela tem filhos.
% X é feliz se X é genitor de alguém.
feliz(X) :- genitor(X, _).

% Define uma família nuclear.
% X (pai) e Y (mae) formam uma família com Z (filho/filha).
familia(X, Y, Z) :- pai(X, Z), mae(Y, Z).
