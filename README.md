# rentalx

# SOLID

S ==> SRP - Single Responsability Principle(Princípio da Responsabilidade Única)
O ==> OCP - Open-Closed Principle (Princípio aberto/fechado)
L ==> LSP - Liskov Substituion Principle (Princípio de Substituição de Liskov)
I ==> ISP - Interface Segregation Principle (Princípio da Segregação de Interface)
D ==> DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)



# Pattern Singleton 

Singleton é um padrão de projeto de software.
Este padrão garante a existência de apenas uma instância de uma
classe, mantendo um ponto global de acesso ao seu objeto. 

# Injeção de dependencia

--> tsyringe

# Token | Autenticação com JWT.

--> Autenticação de rotas, deve ser criado um middleware



# SEED
 --> Conceito ?

# Cdastro de Carro

**Requitisot Funcionais**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel listar todas as categorias.

**Requisitos não Funcionais**

**Regras de Negócio**
Não deve ser possivel cadastrar um carro com uma placa já existente.
Não deve ser possivel alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado disponibilidade: true por padrão.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Requitisot Funcionais**
Deve ser possível listar todos os carros disponíveis
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis pelo nome do carro.
**Requisitos não Funcionais**

**Regras de Negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**Requisitos não Funcionais**
**Requisitos Funcionais**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as especificações.
Deve ser possovel listar todos os carros.
**Regras de Negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.


# Cadastro de imagens do carro

**Regras de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

**Requisitos não Funcionais**
Utilizar o muter para upload dos arquivos 

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.


# Aluguel de carro

**Requisitos não Funcionais**
**Regras de Negócio**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 
**Requisitos Funcionais**
Deve ser possivel cadastrar um aluguel.

