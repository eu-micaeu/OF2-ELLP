const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../user'); // Assumindo que o arquivo do controller se chama userController.js
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock do modelo User, bcrypt e jwt
jest.mock('../../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Define JWT_SECRET para os testes
process.env.JWT_SECRET = 'testsecret';
jwt.sign.mockReturnValue('mocked-jwt-token');

const app = express();
app.use(bodyParser.json());

// Rotas para teste
app.post('/api/user/register', userController.registerUser);
app.post('/api/user/login', userController.loginUser);

afterEach(() => {
    jest.clearAllMocks();
});

describe('User Controller - Register', () => {
    it('🧪 Deve registrar um novo usuário com sucesso', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.create.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/api/user/register')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário registrado com sucesso!');
        expect(response.body.user).toEqual({ id: 1, email: 'test@example.com' });
        expect(response.body.token).toBe('mocked-jwt-token');
        expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedPassword' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 1, email: 'test@example.com' },
            'testsecret',
            { expiresIn: '1d' }
        );
    });

    it('🧪 Deve retornar erro 400 se email ou senha não forem fornecidos no registro', async () => {
        let response = await request(app)
            .post('/api/user/register')
            .send({ email: 'test@example.com' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email e senha são obrigatórios.');

        response = await request(app)
            .post('/api/user/register')
            .send({ password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email e senha são obrigatórios.');
    });

    it('🧪 Deve retornar erro 500 se ocorrer um erro no servidor durante o registro', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/api/user/register')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Erro ao registrar o usuário');
    });
});

describe('User Controller - Login', () => {
    it('🧪 Deve logar um usuário com sucesso', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login realizado com sucesso!');
        expect(response.body.token).toBe('mocked-jwt-token');
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 1, email: 'test@example.com' },
            'testsecret',
            { expiresIn: '1d' }
        );
    });

    it('🧪 Deve retornar erro 400 se email ou senha não forem fornecidos no login', async () => {
        let response = await request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email e senha são obrigatórios.');

        response = await request(app)
            .post('/api/user/login')
            .send({ password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email e senha são obrigatórios.');
    });

    it('🧪 Deve retornar erro 401 se o usuário não for encontrado', async () => {
        User.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'nonexistent@example.com', password: 'password123' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Email ou senha inválidos.');
    });

    it('🧪 Deve retornar erro 401 se a senha estiver incorreta', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Email ou senha inválidos.');
    });

    it('🧪 Deve retornar erro 500 se ocorrer um erro no servidor durante o login', async () => {
        User.findOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Erro ao realizar o login');
    });

    it('🧪 Deve retornar erro 500 se bcrypt.compare falhar durante o login', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockRejectedValue(new Error('Bcrypt error'));

        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Erro ao realizar o login');
    });
});
