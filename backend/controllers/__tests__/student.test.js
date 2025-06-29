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
      classes_gone: 5,
      class_id: 1,
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
  const updatedStudent = {
    id: '1',
    name: 'João Atualizado',
    email: 'joao@email.com',
    phone: '999999999',
    dateOfBirth: '2000-01-01',
    series: '5A'
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('deve atualizar um estudante', async () => {
    Student.update = jest.fn().mockResolvedValue([1]);
    Student.findByPk = jest.fn().mockResolvedValue(updatedStudent);

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(Student.update).toHaveBeenCalledWith(
      {
        name: updatedStudent.name,
        email: updatedStudent.email,
        phone: updatedStudent.phone,
        classes_gone: updatedStudent.classes_gone,
        class_id: updatedStudent.class_id,

      },
      { where: { id: '1' } }
    );
    expect(Student.findByPk).toHaveBeenCalledWith('1');
    expect(response.statusCode).toBe(200);
    expect(response.body.student).toEqual(updatedStudent);
    expect(response.body.message).toBe('Estudante atualizado com sucesso!');
  });

  it('deve retornar um erro se o estudante não existir', async () => {
    Student.update = jest.fn().mockResolvedValue([0]);

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(Student.update).toHaveBeenCalledWith(
      expect.any(Object),
      { where: { id: '1' } }
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Estudante não encontrado');
  });

  it('deve retornar erro ao atualizar estudante', async () => {
    Student.update = jest.fn().mockRejectedValue(new Error('Erro ao atualizar estudante'));

    const response = await request(app)
      .put('/api/students/1')
      .send(updatedStudent);

    expect(Student.update).toHaveBeenCalledWith(
      expect.any(Object),
      { where: { id: '1' } }
    );
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao atualizar o estudante');
  });
});

describe('DELETE /api/students/:id - Deletar estudante', () => {
  it('deve deletar um estudante', async () => {
    Student.destroy = jest.fn().mockResolvedValue(1); // 1 registro deletado

    const response = await request(app).delete('/api/students/1');

    expect(Student.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Estudante deletado com sucesso!');
  });

  it('deve retornar erro se estudante não existir', async () => {
    Student.destroy = jest.fn().mockResolvedValue(0); // 0 registros deletados

    const response = await request(app).delete('/api/students/1');

    expect(Student.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Estudante não encontrado');
  });

  it('deve retornar erro ao deletar estudante', async () => {
    Student.destroy = jest.fn().mockRejectedValue(new Error('Erro ao deletar estudante'));

    const response = await request(app).delete('/api/students/1');

    expect(Student.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('Erro ao deletar o estudante');
  });
});
