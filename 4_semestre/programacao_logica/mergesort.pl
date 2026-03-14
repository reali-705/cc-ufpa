% dividir - divide uma lista em duas metades
/*
dividir(Lista, L1, L2):
    Lista é a lista original,
    L1 é a primeira metade da lista,
    L2 é a segunda metade da lista.
*/
dividir(Lista, L1, L2) :-
    length(Lista, Len),
    Meio is Len // 2,
    dividir_aux(Lista, Meio, L1, L2).

% dividir_aux - ajuda a dividir a lista em duas partes
/*
dividir_aux(Lista, Len, L1, L2):
    Lista é a lista original,
    Len é o número de elementos em L1,
    L1 é a primeira metade da lista,
    L2 é a segunda metade da lista.
*/
dividir_aux(L, 0, [], L).
dividir_aux([X|Xs], Len, [X|L1], L2) :-
    Len > 0,
    Len1 is Len - 1,
    dividir_aux(Xs, Len1, L1, L2).

% merge - mescla duas listas ordenadas
/*
merge(Lista1, Lista2, ListaMesclada):
Lista1 e Lista2 são listas ordenadas,
ListaMesclada é a lista resultante da mesclagem.
*/
merge([], L, L).
merge(L, [], L).
merge([X|Xs], [Y|Ys], [X|Zs]) :-
    X =< Y,
    merge(Xs, [Y|Ys], Zs).
merge([X|Xs], [Y|Ys], [Y|Zs]) :-
    X > Y,
    merge([X|Xs], Ys, Zs).

% =========================================================================== %

% mergesort - ordena uma lista usando o algoritmo mergesort
/*
mergesort(Lista, Sorted):
    Lista é a lista original,
    Sorted é a lista ordenada.
*/
% casos base
mergesort([], []).
mergesort([X], [X]).

% caso recursivo
mergesort(Lista, Sorted) :-
    dividir(Lista, L1, L2),
    mergesort(L1, Sorted1),
    mergesort(L2, Sorted2),
    merge(Sorted1, Sorted2, Sorted).

% =========================================================================== %
% EXEMPLOS PARA TESTE
% =========================================================================== %

/*
Teste do predicado dividir/3
?- dividir([5,2,8,1,9,3], L1, L2).
L1 = [5, 2, 8],
L2 = [1, 9, 3].
*/

/*
Teste do predicado merge/3
?- merge([1,3,5], [2,4,6], L).
L = [1, 2, 3, 4, 5, 6].
*/

/*
Teste do predicado mergesort/2 com lista pequena
?- mergesort([3,1,2], Sorted).
Sorted = [1, 2, 3].
*/

/*
Teste do predicado mergesort/2 com lista média
?- mergesort([5,2,8,1,9,3,7,4], Sorted).
Sorted = [1, 2, 3, 4, 5, 7, 8, 9].
*/

/*
Teste do predicado mergesort/2 com lista vazia
?- mergesort([], Sorted).
Sorted = [].
*/

/*
Teste do predicado mergesort/2 com um elemento
?- mergesort([42], Sorted).
Sorted = [42].
*/