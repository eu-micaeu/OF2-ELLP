jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn(),
  };
});

describe('Configuração do Sequelize', () => {
  beforeEach(() => {
    process.env.DB_NAME = 'test_db';
    process.env.DB_USER = 'test_user';
    process.env.DB_PASS = 'test_pass';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';

    jest.resetModules(); // Limpa o cache para que o require traga uma nova instância
  });

  it('deve configurar o Sequelize com as variáveis de ambiente corretas', () => {
    const { Sequelize } = require('sequelize');

    require('../database'); // Força a execução da criação do Sequelize

    expect(Sequelize).toHaveBeenCalledWith(
      'test_db',
      'test_user',
      'test_pass',
      {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    );
  });
});
