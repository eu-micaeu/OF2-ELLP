# Frontend

Frontend da aplicação desenvolvido em **ReactJS**, responsável por fornecer uma interface interativa e acessível para usuários realizarem o gerenciamento de alunos, turmas, oficinas e frequências.

## **Objetivo**:  
Proporcionar uma experiência de usuário fluida e intuitiva, consumindo os dados da API backend e exibindo as informações de forma clara e funcional.

---

## ✅ Funcionalidades
- Interface gráfica para gerenciamento de entidades:
  - Visualização, cadastro, edição e exclusão de:
    - Alunos  
    - Turmas  
    - Oficinas  
    - Frequência

- Validação de formulários e feedback de ações  
- Integração com a API via requisições HTTP  
- Navegação entre páginas com React Router  

---

## **Arquivos-Chave**:

```text
OF02/
└── frontend/
    ├── public/               # Arquivos estáticos públicos (index.html, favicon etc.)
    ├── src/
    │   ├── assets/           # Imagens, fontes e outros recursos estáticos
    │   ├── components/       # Componentes reutilizáveis da interface
    │   ├── pages/            # Páginas principais da aplicação
    │   ├── services/         # Configurações e chamadas de API
    │   ├── routes/           # Definições de rotas da aplicação
    │   ├── context/          # Context API para gerenciamento de estado global
    │   ├── App.js            # Componente principal da aplicação
    │   ├── index.js          # Ponto de entrada da aplicação React
    ├── .env                  # Variáveis de ambiente da aplicação frontend
    ├── package.json          # Dependências e scripts do projeto
    ├── Dockerfile            # Dockerfile para construção da imagem do frontend

```
