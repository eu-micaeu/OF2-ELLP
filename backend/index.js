const express = require('express');
const studentRoutes = require('./routes/student');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // Inicializa o servidor

app.use(express.json()); // Permite o uso de JSON nas requisições

app.use('/api/students', studentRoutes); // Rota para usuários

const PORT = process.env.PORT || 3000; // Porta do servidor

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor