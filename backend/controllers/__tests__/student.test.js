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
      dateOfBirth: '2000-01-01',
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
});

describe('GET /api/students - Listar estudantes', () => {
  it('deve retornar todos os estudantes', async () => {
    const students = [{ name: 'João' }, { name: 'Maria' }];
    Student.findAll.mockResolvedValue(students);

    const response = await request(app).get('/api/students');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(students);
  });
});

describe('PUT /api/students/:id - Atualizar estudante', () => {
  it('deve atualizar um estudante', async () => {
    const updatedStudent = {
      name: 'João Atualizado',
      email: 'joao@email.com',
      phone: '999999999',
      dateOfBirth: '2000-01-01',
      series: '5A'
    };

    Student.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedStudent);

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(response.statusCode).toBe(200);
    expect(response.body.student).toEqual(updatedStudent);
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
});
