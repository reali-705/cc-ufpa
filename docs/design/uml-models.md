# UML Models

Este arquivo contém modelos UML que detalham os diferentes aspectos do design do sistema. Abaixo estão alguns exemplos de diagramas que podem ser incluídos.

## Casos de Uso

```markdown
@startuml
:Usuário: --> (Login)
:Usuário: --> (Registrar)
(Login) --> (Sistema)
(Registrar) --> (Sistema)
@enduml
```

## Diagrama de Sequência

```markdown
@startuml
actor Usuário
Usuário -> Sistema: Solicitar Login
Sistema -> Usuário: Exibir Formulário de Login
Usuário -> Sistema: Enviar Credenciais
Sistema -> Usuário: Confirmar Login
@enduml
```

## Diagrama de Classes

```markdown
@startuml
class Usuario {
    +String nome
    +String email
    +login()
    +registrar()
}

class Sistema {
    +autenticar()
    +registrarUsuario()
}

Usuario --> Sistema: usa
@enduml
```

## Notas

- Os diagramas acima são representações textuais e podem ser renderizados usando ferramentas compatíveis com a sintaxe UML.
- Certifique-se de que as ferramentas necessárias para visualizar os diagramas estejam instaladas e configuradas corretamente.