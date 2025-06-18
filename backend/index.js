const express = require('express');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class');
const workshopRoutes = require('./routes/workshop');
const presenceRoutes = require('./routes/presence');
const userRoutes = require('./routes/user');
const tutorRoutes = require('./routes/tutor');

const dotenv = require('dotenv');
const cors = require('./middlewares/cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors);
app.use('/api/student', studentRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/class', classRoutes);
app.use('/api/presences', presenceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tutor', tutorRoutes);

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