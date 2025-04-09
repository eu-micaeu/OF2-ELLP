# 🤖 OFICINA 2 - ELLP 🚀
## 📝 Sobre o projeto ELLP
O projeto ELLP da UTFPR-CP envolve estudantes de escolas públicas da região de Cornélio Procópio em oficinas super dinâmicas de:

- 🤖 Robótica

- 💻 Tecnologia da Informação

- 📱 Desenvolvimento de Aplicativos com o App Inventor

🎯 O objetivo é despertar o interesse dos jovens no mundo digital, oferecendo experiências práticas, criativas e educativas!

👩‍🏫👨‍🏫 Qualquer estudante de graduação da UTFPR-CP pode participar como voluntário(a), contribuindo com:

- ✍️ Criação de materiais

- 🧑‍💻 Monitoria

- 👩‍🏫 Instrução

- 🧑‍🔧 Coordenação


## 💻 Sobre o sistema

Para auxiliar os voluntários do projeto, está sendo desenvolvido o sistema que busca facilitar o monitoramento e registro de presença dos participantes das oficinas.

### 🧠 O que faz o app?

| Funcionalidade 🛠 | Descrição 📄 |
|------------------|-------------|
| 🔐 Autenticação de usuário | Sistema seguro de login para acesso às funcionalidades administrativas. |
| 📝 Registro de presença | Permite registrar a presença de um aluno em uma oficina específica com identificador único, nome completo e data da oficina. |
| 🧑‍🎓 Cadastro, edição e exclusão de alunos | Gerenciamento completo dos alunos no sistema. |
| 📈 Monitoramento de presença | Permite visualizar a frequência de um aluno em todas as oficinas realizadas. |
| 🗓️ Cadastro de aulas | Criação de novas aulas vinculadas às oficinas. |
| 📊 Relatórios de presença por aluno | Geração de relatórios de presença individualizados para acompanhamento. |
| 🏫 Cadastro, edição e exclusão de oficinas | Gerenciamento completo das oficinas realizadas no projeto. |


### 🛠️ Como foi construído e por quê?
O sistema foi desenvolvido com as seguintes tecnologias:

- 🐳 Docker:	Padroniza o ambiente de desenvolvimento e facilita o deploy.
- ⚛️ ReactJS:	Construção do frontend com interfaces interativas e responsivas.
- 🚀 ExpressJS:	Backend leve e eficiente com Node.js.
- 🐘 PostgreSQL:	Banco de dados relacional robusto e seguro.
- 🐙 GitHub:	Controle de versão e colaboração em equipe. 
- 💬 Discord:	Comunicação rápida entre os membros do time.
- ✅ Trello: Organização de tarefas e acompanhamento do progresso do projeto, para 

## 📦 Instalação
### ⚙️ Pré-requisitos
- 🐳 Docker

```s̀h
# Clonar o repositório 
git clone https://github.com/eu-micaeu/OF2-ELLP.git

# Navegar até o diretório do projeto
cd OF2-ELLP

# Construir a imagem Docker
docker build -t ellp-app .

# Rodar o container Docker
docker run -p 3000:3000 ellp-app
```

## 🌐 Acesso ao aplicativo
- 🎨 Frontend: http://localhost:3000

- 🛠 Backend: http://localhost:5173

## 👥 Colaboradores
- 🧠 Brena dos Santos Freitas

- 💡 Maria Fernanda de Abreu Aguiar

- 🔧 Micael Ribeiro Rocha
