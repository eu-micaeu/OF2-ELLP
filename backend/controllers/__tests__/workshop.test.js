const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const workshopController = require('../../controllers/workshop');
const Workshop = require('../../models/workshop');

// Mock do modelo Workshop
jest.mock('../../models/workshop');

const app = express();
app.use(bodyParser.json());

// Rotas simuladas para teste
app.post('/api/workshops', workshopController.createWorkshop);
app.get('/api/workshops', workshopController.getAllWorkshops);
app.put('/api/workshops/:id', workshopController.updateWorkshop);
app.delete('/api/workshops/:id', workshopController.deleteWorkshop);

afterEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/workshops - Criar oficina', () => {
  it('deve criar uma nova oficina', async () => {
    const workshopData = {
      name: 'Oficina de Robótica',
      start_date: '2025-05-20',
      end_date: '2025-05-25',
      academic_load: '20h'
    };

    Workshop.create.mockResolvedValue(workshopData);

    const response = await request(app)
      .post('/api/workshops')
      .send(workshopData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Oficina criada com sucesso!');
    expect(Workshop.create).toHaveBeenCalledWith(workshopData);
  });

  it('deve retornar erro ao criar oficina', async () => {
    Workshop.create.mockRejectedValue(new Error('Erro ao criar'));

    const response = await request(app)
      .post('/api/workshops')
      .send({});

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao criar a oficina');
  });
});

describe('GET /api/workshops - Listar oficinas', () => {
  it('deve retornar todas as oficinas', async () => {
    const workshops = [{ name: 'Oficina A' }, { name: 'Oficina B' }];
    Workshop.findAll.mockResolvedValue(workshops);

    const response = await request(app).get('/api/workshops');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(workshops);
  });

  it('deve retornar erro ao listar oficinas', async () => {
    Workshop.findAll.mockRejectedValue(new Error('Erro ao buscar'));

    const response = await request(app).get('/api/workshops');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao buscar oficinas');
  });
});

describe('PUT /api/workshops/:id - Atualizar oficina', () => {
  it('deve atualizar uma oficina existente', async () => {
    const workshop = {
      update: jest.fn().mockResolvedValue(true),
      name: 'Oficina Antiga'
    };

    Workshop.findByPk.mockResolvedValue(workshop);

    const updateData = {
      name: 'Oficina Atualizada',
      start_date: '2025-06-01',
      end_date: '2025-06-05',
      academic_load: '30h'
    };

    const response = await request(app)
      .put('/api/workshops/1')
      .send(updateData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Oficina atualizada com sucesso!');
    expect(workshop.update).toHaveBeenCalledWith(updateData);
  });

  it('deve retornar erro se oficina não for encontrada', async () => {
    Workshop.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/workshops/999')
      .send({ name: 'Nova' });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Oficina não encontrada');
  });

  it('deve retornar erro ao atualizar oficina', async () => {
    Workshop.findByPk.mockRejectedValue(new Error('Erro inesperado'));

    const response = await request(app)
      .put('/api/workshops/1')
      .send({ name: 'Erro' });

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao atualizar a oficina');
  });
});

describe('DELETE /api/workshops/:id - Deletar oficina', () => {
  it('deve deletar uma oficina existente', async () => {
    const workshop = {
      destroy: jest.fn().mockResolvedValue(true),
      name: 'Oficina Antiga'
    };

    Workshop.findByPk.mockResolvedValue(workshop);

    const response = await request(app).delete('/api/workshops/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Oficina deletada com sucesso!');
    expect(workshop.destroy).toHaveBeenCalled();
  });

  it('deve retornar erro se oficina não for encontrada', async () => {
    Workshop.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/api/workshops/999');

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Oficina não encontrada');
  });

  it('deve retornar erro ao deletar oficina', async () => {
    Workshop.findByPk.mockRejectedValue(new Error('Erro inesperado'));

    const response = await request(app).delete('/api/workshops/1');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao deletar a oficina');
  });
});
