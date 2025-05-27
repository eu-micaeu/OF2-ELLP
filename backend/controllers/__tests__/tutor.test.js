const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const tutorController = require('../tutor');
const Tutor = require('../../models/tutor');

jest.mock('../../models/tutor');

const app = express();
app.use(bodyParser.json());

app.post('/api/tutors', tutorController.createTutor);
app.get('/api/tutors', tutorController.getAllTutors);
app.put('/api/tutors/:id', tutorController.updateTutor);
app.delete('/api/tutors/:id', tutorController.deleteTutor);

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/tutors - Criar tutor', () => {
    it('deve criar um novo tutor', async () => {
        const tutorData = {
            tutor_name: 'Ana',
            tutor_curse: 'Matemática'
        };

        const createdTutor = { tutor_id: 1, ...tutorData };

        Tutor.create.mockResolvedValue(createdTutor);

        const response = await request(app)
            .post('/api/tutors')
            .send(tutorData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Tutor criado com sucesso!');
        expect(Tutor.create).toHaveBeenCalledWith(tutorData);
    });

    it('deve retornar erro de validação ao criar tutor sem dados', async () => {
        const response = await request(app).post('/api/tutors').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Nome e curso do tutor são obrigatórios.');
    });

    it('deve retornar erro ao criar tutor (erro interno)', async () => {
        Tutor.create.mockRejectedValue(new Error('Erro ao criar tutor'));

        const response = await request(app)
            .post('/api/tutors')
            .send({ tutor_name: 'Ana', tutor_curse: 'Matemática' });

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao criar o tutor');
    });
});

describe('GET /api/tutors - Listar todos os tutores', () => {
    it('deve retornar todos os tutores', async () => {
        const tutors = [
            { tutor_id: 1, tutor_name: 'Ana', tutor_curse: 'Matemática' },
            { tutor_id: 2, tutor_name: 'Carlos', tutor_curse: 'História' }
        ];

        Tutor.findAll.mockResolvedValue(tutors);

        const response = await request(app).get('/api/tutors');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(tutors);
        expect(Tutor.findAll).toHaveBeenCalled();
    });

    it('deve retornar erro ao buscar tutores', async () => {
        Tutor.findAll.mockRejectedValue(new Error('Erro ao buscar tutores'));

        const response = await request(app).get('/api/tutors');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao obter os tutores');
    });
});

describe('PUT /api/tutors/:id - Atualizar tutor', () => {
    it('deve atualizar um tutor existente', async () => {
        Tutor.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/api/tutors/1')
            .send({ tutor_name: 'Ana Paula', tutor_curse: 'Física' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Tutor atualizado com sucesso!');
        expect(Tutor.update).toHaveBeenCalledWith(
            { tutor_name: 'Ana Paula', tutor_curse: 'Física' },
            { where: { tutor_id: '1' } }
        );
    });

    it('deve retornar 404 se tutor não for encontrado', async () => {
        Tutor.update.mockResolvedValue([0]);

        const response = await request(app)
            .put('/api/tutors/999')
            .send({ tutor_name: 'X', tutor_curse: 'Y' });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Tutor não encontrado');
    });

    it('deve retornar erro ao atualizar tutor', async () => {
        Tutor.update.mockRejectedValue(new Error('Erro ao atualizar'));

        const response = await request(app)
            .put('/api/tutors/1')
            .send({ tutor_name: 'Erro', tutor_curse: 'Bug' });

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar o tutor');
    });
});

describe('DELETE /api/tutors/:id - Deletar tutor', () => {
    it('deve deletar um tutor existente', async () => {
        Tutor.destroy.mockResolvedValue(1);

        const response = await request(app).delete('/api/tutors/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Tutor deletado com sucesso!');
        expect(Tutor.destroy).toHaveBeenCalledWith({ where: { tutor_id: '1' } });
    });

    it('deve retornar 404 se tutor não for encontrado', async () => {
        Tutor.destroy.mockResolvedValue(0);

        const response = await request(app).delete('/api/tutors/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Tutor não encontrado');
    });

    it('deve retornar erro ao deletar tutor', async () => {
        Tutor.destroy.mockRejectedValue(new Error('Erro ao deletar'));

        const response = await request(app).delete('/api/tutors/1');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao deletar o tutor');
    });
});
