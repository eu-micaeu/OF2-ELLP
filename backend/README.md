# Backend

Backend da aplicação responsável pelo gerenciamento de entidades e manipulação de arquivos, desenvolvido com ExpressJS.
##  **Objetivo**: 

Fornecer uma API robusta para gerenciar alunos, turmas, oficinas e frequência, garantindo integração eficiente com o frontend e persistência de dados confiável.


## ✅ Funcionalidades
- Gerenciamento de Entidades

-  Cadastro, listagem, edição e exclusão de:

    -  Alunos

    - Turmas

    - Oficinas

    - Frequência

## **Arquivos-Chave**:


```text
OF02/
└── backend/
    ├── config/               # Arquivos de configuração da aplicação
    ├── controllers/          # Lógica dos endpoints da API
    ├── coverage/             # Relatórios de cobertura de testes automatizados
    ├── middlewares/          # Middlewares usados na API
    ├── models/               # Modelos de dados (caso utilize ORM como Sequelize )
    ├── routes/               # Definição das rotas da API
    ├── .env                  # Variáveis de ambiente da aplicação
    ├── Dockerfile            # Dockerfile para construção da imagem do backend


```


## ⚙️ Executando os testes

Para garantir a qualidade e a estabilidade do sistema ELLP, utilizamos testes automatizados que verificam diferentes aspectos do código.

### 🧪 Teste de Integração de API 
Utilizamos a biblioteca Supertest em conjunto com o Jest para simular requisições HTTP e verificar se os endpoints da API se comportam conforme o esperado, cobrindo cenários de sucesso e de erro.


#### Como executar?


```s̀h

# Navegar até o diretório de backend
cd backend 

# Executar testes
npm test

```
