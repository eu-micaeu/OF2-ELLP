const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const addressController = require('../address'); // ajuste o caminho conforme necessário
const Address = require('../../models/address');

jest.mock('../../models/address');

const app = express();
app.use(bodyParser.json());

app.post('/api/address', addressController.createAddress);
app.get('/api/address', addressController.getAllAddress);
app.put('/api/address/:id', addressController.updateAddress);
app.delete('/api/address/:id', addressController.deleteAddress);

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /api/address - Criar endereço', () => {
    it('deve criar um novo endereço', async () => {
        const addressData = {
            street: 'Rua A',
            number: '123',
            neighborhood: 'Centro',
            complement: 'Ap 101',
            state: 'SP',
            postal_code: '12345-678'
        };

        Address.create.mockResolvedValue(addressData);

        const response = await request(app)
            .post('/api/address')
            .send(addressData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Endereço criado com sucesso!');
        expect(Address.create).toHaveBeenCalledWith(addressData);
    });

    it('deve retornar erro ao criar endereço', async () => {
        Address.create.mockRejectedValue(new Error('Erro'));

        const response = await request(app)
            .post('/api/address')
            .send({});

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao criar o endereço');
    });
});

describe('GET /api/address - Buscar todos os endereços', () => {
    it('deve retornar todos os endereços', async () => {
        const addresses = [
            { street: 'Rua A', number: '123' },
            { street: 'Rua B', number: '456' }
        ];

        Address.findAll.mockResolvedValue(addresses);

        const response = await request(app).get('/api/address');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(addresses);
    });

    it('deve retornar erro ao buscar endereços', async () => {
        Address.findAll.mockRejectedValue(new Error('Erro'));

        const response = await request(app).get('/api/address');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao buscar endereços');
    });
});

describe('PUT /api/address/:id - Atualizar endereço', () => {
    it('deve atualizar um endereço existente', async () => {
        const address = {
            update: jest.fn().mockResolvedValue(true),
        };

        Address.findByPk.mockResolvedValue(address);

        const updateData = {
            street: 'Nova Rua',
            number: '456',
            neighborhood: 'Novo Bairro',
            complement: 'Casa',
            state: 'RJ',
            postal_code: '98765-432'
        };

        const response = await request(app)
            .put('/api/address/1')
            .send(updateData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Endereço atualizado com sucesso!');
        expect(address.update).toHaveBeenCalledWith(updateData);
    });

    it('deve retornar erro se endereço não for encontrado', async () => {
        Address.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .put('/api/address/999')
            .send({});

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Endereço não encontrado');
    });

    it('deve retornar erro ao atualizar endereço', async () => {
        Address.findByPk.mockResolvedValue({
            update: jest.fn().mockRejectedValue(new Error('Erro'))
        });

        const response = await request(app)
            .put('/api/address/1')
            .send({});

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao atualizar o endereço');
    });
});

describe('DELETE /api/address/:id - Deletar endereço', () => {
    it('deve deletar um endereço existente', async () => {
        const address = {
            destroy: jest.fn().mockResolvedValue(true)
        };

        Address.findByPk.mockResolvedValue(address);

        const response = await request(app).delete('/api/address/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Endereço deletado com sucesso!');
        expect(address.destroy).toHaveBeenCalled();
    });

    it('deve retornar erro se endereço não for encontrado', async () => {
        Address.findByPk.mockResolvedValue(null);

        const response = await request(app).delete('/api/address/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Endereço não encontrado');
    });

    it('deve retornar erro ao deletar endereço', async () => {
        Address.findByPk.mockRejectedValue(new Error('Erro'));

        const response = await request(app).delete('/api/address/1');

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Erro ao deletar o endereço');
    });
});
