/*
Primeira versão da regra (simples, mas ineficiente devido a cálculos repetidos)
    % fatos
    fibonacci(0, 0).
    fibonacci(1, 1).

    % regras
    fibonacci(N, F) :-
        N > 1,
        N1 is N - 1,
        N2 is N - 2,
        fibonacci(N1, F1),
        fibonacci(N2, F2),
        F is F1 + F2.
*/

% --- IMPLEMENTAÇÃO OTIMIZADA DE FIBONACCI COM RECURSÃO DE CAUDA ---

% Regra principal que inicia o cálculo.
% fibonacci(N, F) onde N é a posição na sequência e F é o resultado.
% Inicia o auxiliar com os dois primeiros valores da sequência (0 e 1).
fibonacci(N, F) :-
    fibonacci_auxiliar(N, 0, 1, F).

% Caso base da recursão: quando o contador N chega a 0, o resultado é o valor 'Atual'.
fibonacci_auxiliar(0, Atual, _, Atual).

/*
Passo recursivo:
N: contador regressivo.
Atual: valor de fib(i).
Proximo: valor de fib(i+1).
Resultado: variável para unificar o resultado final.
*/
fibonacci_auxiliar(N, Atual, Proximo, Resultado) :-
    N > 0,
    N_novo is N - 1,
    Proximo_novo is Atual + Proximo, % Calcula o próximo número da sequência.
    % Chama a recursão atualizando os valores: 'Atual' se torna 'Proximo' e 'Proximo' se torna 'Proximo_novo'.
    fibonacci_auxiliar(N_novo, Proximo, Proximo_novo, Resultado).
