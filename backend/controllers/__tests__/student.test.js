const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const studentController = require('../student'); // ajuste o caminho conforme necessário
const Student = require('../../models/student');

// Mock do modelo
jest.mock('../../models/student');

const app = express();
app.use(bodyParser.json());

// Rotas simuladas
app.post('/api/students', studentController.createStudent);
app.get('/api/students', studentController.getAllStudents);
app.put('/api/students/:id', studentController.updateStudent);
app.delete('/api/students/:id', studentController.deleteStudent);

afterEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/students - Criar estudante', () => {
  it('deve criar um novo estudante', async () => {
    const studentData = {
      name: 'João',
      email: 'joao@email.com',
      phone: '123456789',
      date_of_birth: '2000-01-01',
      series: '5A'
    };

    Student.create.mockResolvedValue(studentData);

    const response = await request(app)
      .post('/api/students')
      .send(studentData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Estudante criado com sucesso!');
    expect(Student.create).toHaveBeenCalledWith(studentData);
  });

  it('deve retornar um erro ao criar estudante', async () => {
    const studentData = {

    };

    Student.create.mockRejectedValue(new Error('Erro ao criar estudante'));

    const response = await request(app)
      .post('/api/students')
      .send(studentData);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao criar o estudante');
  });

});

describe('GET /api/students - Listar estudantes', () => {
  it('deve retornar todos os estudantes', async () => {
    const students = [{ name: 'João' }, { name: 'Maria' }];
    Student.findAll.mockResolvedValue(students);

    const response = await request(app).get('/api/students');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(students);
  });

  it('deve retornar nenhum estudante', async () => {
    const students = [];
    Student.findAll.mockRejectedValue(new Error('Erro ao buscar estudantes'));

    const response = await request(app).get('/api/students');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao buscar estudantes');
  });
});

describe('PUT /api/students/:id - Atualizar estudante', () => {
  it('deve atualizar um estudante', async () => {
    const updatedStudent = {
      name: 'João Atualizado',
      email: 'joao@email.com',
      phone: '999999999',
      date_of_birth: '2000-01-01',
      series: '5A'
    };

    Student.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedStudent);

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(response.statusCode).toBe(200);
    expect(response.body.student).toEqual(updatedStudent);
  });

  it('deve retornar um erro se o estudante não existir', async () => {
    const updatedStudent = {
      name: 'João Atualizado',
      email: 'joao@email.com',
      phone: '999999999',
      date_of_birth: '2000-01-01',
      series: '5A'
    };

    Student.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Estudante não encontrado');
  });


  it('deve retornar erro ao atualizar estudante', async () => {
    const updatedStudent = {
      name: 'João Atualizado',
      email: 'joao@email.com',
      phone: '999999999',
      date_of_birth: '2000-01-01',
      series: '5A'
    };

    Student.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Erro ao atualizar estudante'));

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao atualizar o estudante');
  });

});

describe('DELETE /api/students/:id - Deletar estudante', () => {
  it('deve deletar um estudante', async () => {
    const deletedStudent = { name: 'João Deletado' };
    Student.findByIdAndDelete = jest.fn().mockResolvedValue(deletedStudent);

    const response = await request(app).delete('/api/students/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.student).toEqual(deletedStudent);
  });

  it('deve retornar erro se estudante não existir', async () => {
    const deletedStudent = { name: 'João Deletado' };
    Student.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/api/students/1')
      .send(deletedStudent);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Estudante não encontrado");
  });

  it('deve retornar erro ao deletar estudante', async () => {
    const deletedStudent = { name: 'João Deletado' };
    Student.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Erro ao deletar estudante'));

    const response = await request(app).delete('/api/students/1')
      .send(deletedStudent);


    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("Erro ao deletar o estudante");
  });

});
