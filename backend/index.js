const express = require('express');
const studentRoutes = require('./routes/student');
const workshopRoutes = require('./routes/workshop');
const addressRoutes = require('./routes/address');
const presenceRoutes = require('./routes/presence');

const dotenv = require('dotenv');
const cors = require('./middlewares/cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/presences', presenceRoutes);
app.use('/api/address', addressRoutes);


const sequelize = require('./config/database'); // sua configuração do Sequelize

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco estabelecida.');

    // Sincroniza os models (cria tabelas)
    await sequelize.sync({ force: false }); // force: true recria as tabelas limpando dados

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
}

start();