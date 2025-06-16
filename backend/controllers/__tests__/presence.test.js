const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const presenceController = require('../presence');
const Presence = require('../../models/presence');

jest.mock('../../models/presence');

const app = express();
app.use(bodyParser.json());

app.post('/api/presences', presenceController.createPresence);
app.get('/api/presences', presenceController.getAllPresences);
app.put('/api/presences/:id', presenceController.updatePresence);
app.delete('/api/presences/:id', presenceController.deletePresence);

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/presences', () => {
    it('deve criar uma nova presença com sucesso', async () => {
        const presenceData = {
            student_id: 1,
            workshop: 1,
            presence_date: '2025-05-26',
            present: true
        };

        Presence.create.mockResolvedValue({ presence_id: 1, ...presenceData });

        const response = await request(app)
            .post('/api/presences')
            .send(presenceData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Presença criada com sucesso!');
        expect(Presence.create).toHaveBeenCalledWith(presenceData);
    });

    it('deve retornar erro 400 para dados incompletos', async () => {
        const response = await request(app)
            .post('/api/presences')
            .send({}); // dados ausentes

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Todos os campos são obrigatórios.');
        expect(Presence.create).not.toHaveBeenCalled();
    });

    it('deve retornar erro 500 ao falhar na criação', async () => {
        Presence.create.mockRejectedValue(new Error('Erro ao criar presença'));

        const validData = {
            student_id: 1,
            workshop: 2,
            presence_date: '2025-05-30',
            present: false
        };

        const response = await request(app)
            .post('/api/presences')
            .send(validData);

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao criar a presença');
    });
});

describe('GET /api/presences', () => {
    it('deve retornar todas as presenças', async () => {
        const mockData = [
            { presence_id: 1, student_id: 1, workshop: 1, presence_date: '2025-05-26', present: true },
            { presence_id: 2, student_id: 2, workshop: 2, presence_date: '2025-05-27', present: false }
        ];

        Presence.findAll.mockResolvedValue(mockData);

        const response = await request(app).get('/api/presences');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(Presence.findAll).toHaveBeenCalled();
    });

    it('deve retornar erro 500 ao falhar na busca', async () => {
        Presence.findAll.mockRejectedValue(new Error('Erro ao buscar presenças'));

        const response = await request(app).get('/api/presences');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao obter as presenças');
    });
});

describe('PUT /api/presences/:id', () => {
    it('deve atualizar uma presença existente', async () => {
        const updatedData = {
            student_id: 1,
            workshop: 1,
            presence_date: '2025-05-28',
            present: false
        };

        Presence.update.mockResolvedValue([1]); // sucesso (1 linha afetada)

        const response = await request(app)
            .put('/api/presences/1')
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Presença atualizada com sucesso!');
        expect(Presence.update).toHaveBeenCalledWith(updatedData, { where: { presence_id: '1' } });
    });

    it('deve retornar 404 se a presença não for encontrada', async () => {
        Presence.update.mockResolvedValue([0]); // nenhuma linha afetada

        const response = await request(app)
            .put('/api/presences/999')
            .send({
                student_id: 10,
                workshop: 5,
                presence_date: '2025-05-30',
                present: true
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Presença não encontrada');
    });

    it('deve retornar erro 500 ao falhar na atualização', async () => {
        Presence.update.mockRejectedValue(new Error('Falha interna'));

        const response = await request(app)
            .put('/api/presences/1')
            .send({
                student_id: 1,
                workshop: 1,
                presence_date: '2025-05-30',
                present: true
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar a presença');
    });
});

describe('DELETE /api/presences/:id', () => {
    it('deve deletar uma presença existente', async () => {
        Presence.destroy.mockResolvedValue(1); // sucesso (1 linha deletada)

        const response = await request(app).delete('/api/presences/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Presença deletada com sucesso!');
        expect(Presence.destroy).toHaveBeenCalledWith({ where: { presence_id: '1' } });
    });

    it('deve retornar 404 se a presença não existir', async () => {
        Presence.destroy.mockResolvedValue(0); // nenhuma linha deletada

        const response = await request(app).delete('/api/presences/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Presença não encontrada');
    });

    it('deve retornar erro 500 ao falhar na deleção', async () => {
        Presence.destroy.mockRejectedValue(new Error('Erro ao deletar'));

        const response = await request(app).delete('/api/presences/1');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao deletar a presença');
    });
});
