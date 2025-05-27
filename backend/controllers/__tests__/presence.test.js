const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const presenceController = require('../presence'); 
const Presence = require('../../models/presence');

// Mock do modelo
jest.mock('../../models/presence');

const app = express();
app.use(bodyParser.json());

// Rotas simuladas
app.post('/api/presences', presenceController.createPresence);
app.get('/api/presences', presenceController.getAllPresences);
app.put('/api/presences/:id', presenceController.updatePresence);
app.delete('/api/presences/:id', presenceController.deletePresence);

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/presences - Criar presença', () => {
    it('deve criar uma nova presença', async () => {
        const presenceData = {
            student_id: 1,
            workshop: 1,
            presence_date: '2025-05-26',
            present: true
        };

        Presence.create.mockResolvedValue(presenceData);

        const response = await request(app)
            .post('/api/presences')
            .send(presenceData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Presença criada com sucesso!');
        expect(Presence.create).toHaveBeenCalledWith(presenceData);
    });

    it('deve retornar um erro ao criar presença', async () => {
        Presence.create.mockRejectedValue(new Error('Erro ao criar presença'));

        const response = await request(app)
            .post('/api/presences')
            .send({});

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao criar a presença');
    });
});

describe('GET /api/presences - Obter todas as presenças', () => {
    it('deve retornar todas as presenças', async () => {
        const presences = [
            { presence_id: 1, student_id: 1, workshop: 1, presence_date: '2025-05-26', present: true },
            { presence_id: 2, student_id: 2, workshop: 2, presence_date: '2025-05-27', present: false }
        ];

        Presence.findAll.mockResolvedValue(presences);

        const response = await request(app).get('/api/presences');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(presences);
        expect(Presence.findAll).toHaveBeenCalled();
    });

    it('deve retornar um erro ao obter presenças', async () => {
        Presence.findAll.mockRejectedValue(new Error('Erro ao obter presenças'));

        const response = await request(app).get('/api/presences');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao obter as presenças');
    });
});

describe('PUT /api/presences/:id - Atualizar presença', () => {
    it('deve atualizar uma presença existente', async () => {
        const updatedData = {
            present: false
        };

        Presence.update.mockResolvedValue([1]); // 1 registro atualizado

        const response = await request(app)
            .put('/api/presences/1')
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Presença atualizada com sucesso!');
        expect(Presence.update).toHaveBeenCalledWith(updatedData, { where: { presence_id: '1' } });
    });

    it('deve retornar um erro ao atualizar presença', async () => {
        Presence.update.mockRejectedValue(new Error('Erro ao atualizar presença'));

        const response = await request(app)
            .put('/api/presences/1')
            .send({});

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar a presença');
    });
});

describe('DELETE /api/presences/:id - Deletar presença', () => {
    it('deve deletar uma presença existente', async () => {
        Presence.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/api/presences/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Presença deletada com sucesso!');
        expect(Presence.destroy).toHaveBeenCalledWith({ where: { presence_id: '1' } });
    });

    it('deve retornar um erro ao deletar presença', async () => {
        Presence.destroy.mockRejectedValue(new Error('Erro ao deletar presença'));

        const response = await request(app)
            .delete('/api/presences/1');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao deletar a presença');
    });
});

