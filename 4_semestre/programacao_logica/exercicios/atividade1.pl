% --- ATIVIDADE 1: CADEIA ALIMENTAR E RELAÇÕES ACADÊMICAS ---

% --- Questão 1: Modelagem de uma cadeia alimentar ---
% fatos
% animal(Nome): Define que 'Nome' é um animal.
animal(urso).
animal(peixeGrande).
animal(peixePequeno).
animal(cervo).
animal(guaxinim).
animal(raposa).
animal(coelho).
animal(lince).

% vegetal(Nome): Define que 'Nome' é um vegetal.
vegetal(alga).

% come(Predador, Presa): Define que 'Predador' come 'Presa'.
% come\2
come(urso, peixeGrande).
come(urso, peixePqueno).
come(urso, cervo).
come(urso, guaxinim).
come(urso, coelho).
come(peixeGrande, peixePequeno).
come(peixePequeno, alga).
come(cervo, alga).
come(guaxinim, peixeGrande).
come(guaxinim, peixePequeno).
come(guaxinim, alga).
come(raposa, peixeGrande).
come(raposa, peixePequeno).
come(raposa, coelho).
come(raposa, alga).
come(coelho, alga).
come(lince, coelho).


% --- Questão 2: Definição de Fatos e Regras ---
/*
Fatos são o conjuntos de verdades absolutas que serão usadas de base para a lógica.
Regras o conjunto de combinações de fatos com operadores lógicos (And, Or, Not etc) para inferir novas informações.
*/

% --- Questão 3: Relação entre alunos e professores ---
% fatos
% aluno(Nome, Disciplina): Define que 'Nome' é aluno na 'Disciplina'.
aluno(pedro, prog).
aluno(pedro, calculo).
aluno(pedro, ihc).
aluno(maria, prog).
aluno(maria, so).
aluno(jose, calculo).
aluno(jose, ihc).

% professor(Nome, Disciplina): Define que 'Nome' é professor da 'Disciplina'.
professor(renato, prog).
professor(valcir, calculo).
professor(marceli, ihc).

% regras
% turma(Professor, Aluno): Define que um Professor e um Aluno pertencem à mesma turma
% se o Professor leciona uma Matéria que o Aluno cursa.
turma(Professor, Aluno) :- professor(Professor, Materia), aluno(Aluno, Materia).
