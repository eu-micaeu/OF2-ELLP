const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const classController = require('../class'); // ajuste o caminho conforme necessário
const Class = require('../../models/class');

// Mock do modelo
jest.mock('../../models/class');

const app = express();
app.use(bodyParser.json());

// Rotas simuladas
app.post('/api/class', classController.createClass); //
app.get('/api/class', classController.getAllClass);
app.put('/api/class/:id', classController.updateClass);
app.delete('/api/class/:id', classController.deleteClass);

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/class - Criar classe', () => {
    it('deve criar uma nova classe', async () => {
        const classData = {
            code: '123',
            subjectname: 'Matemática',
            students_quantity: 30
        };

        Class.create.mockResolvedValue(classData);

        const response = await request(app)
            .post('/api/class')
            .send(classData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Classe criado com sucesso!');
        expect(Class.create).toHaveBeenCalledWith(classData);
    });

    it('deve retornar um erro ao criar classe', async () => {
        const classData = {

        };

        Class.create.mockRejectedValue(new Error('Erro ao criar classe'));

        const response = await request(app)
            .post('/api/class')
            .send(classData);

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao criar o classe');
    });
});

describe('GET /api/class - Buscar todas as classes', () => {
    it('deve retornar todas as classes', async () => {
        const classData = [
            { code: '123', subjectname: 'Matemática', students_quantity: 30 },
            { code: '456', subjectname: 'Português', students_quantity: 25 }
        ];

        Class.findAll.mockResolvedValue(classData);

        const response = await request(app)
            .get('/api/class');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(classData);
        expect(Class.findAll).toHaveBeenCalled();
    });

    it('deve retornar um erro ao buscar classes', async () => {
        Class.findAll.mockRejectedValue(new Error('Erro ao buscar classes'));

        const response = await request(app)
            .get('/api/class');
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao buscar classes');
    });
});

describe('PUT /api/class/:id - Atualizar classe', () => {
    it('deve atualizar uma classe existente', async () => {
        const classData = {
            code: '123',
            subjectname: 'Matemática',
            students_quantity: 30
        };

        Class.findByPk.mockResolvedValue({
            update: jest.fn().mockResolvedValue(classData)
        });

        const response = await request(app)
            .put('/api/class/1')
            .send(classData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Classe atualizado com sucesso!');
        expect(Class.findByPk).toHaveBeenCalledWith('1');
    });

    it('deve retornar um erro ao atualizar classe', async () => {
        const classData = {
            code: '123',
            subjectname: 'Matemática',
            students_quantity: 30
        };

        Class.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .put('/api/class/1')
            .send(classData);

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar a classe');
    });


    it('deve retornar erro ao atualizar classe', async () => {
        const classData = {
            code: '123',
            subjectname: 'Matemática',
            students_quantity: 30
        };

        Class.findByPk.mockResolvedValue({
            update: jest.fn().mockRejectedValue(new Error('Erro ao atualizar classe'))
        });

        const response = await request(app)
            .put('/api/class/1')
            .send(classData);
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar a classe');
    });

});

describe('DELETE /api/class/:id - Deletar classe', () => {
    it('deve deletar uma classe existente', async () => {
        const classes = {
            destroy: jest.fn().mockResolvedValue(true), // Sequelize returns the number of rows affected
            name: 'Classe Antiga'
        };

        Class.findByPk.mockResolvedValue(classes);

        const response = await request(app).delete('/api/class/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Classe deletada com sucesso!');
        expect(classes.destroy).toHaveBeenCalled();
    });

    it('deve retornar um erro se a classe nao for encontrada', async () => {

        Class.findByPk.mockResolvedValue(null);

        const response = await request(app).delete('/api/class/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Classe não encontrada');
    });


    it('deve retornar erro ao deletar classe', async () => {
        Class.findByPk.mockRejectedValue(new Error('Erro inesperado'));

        const response = await request(app).delete('/api/class/1');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao deletar a classe');
    });
});   
