const cors = require('cors');

const corsOptions = {
  origin: '*', // Ou especifique domínios: ['http://localhost:3000']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);