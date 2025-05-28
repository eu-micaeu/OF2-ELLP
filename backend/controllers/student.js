const Student = require('../models/student');
const dotenv = require('dotenv');

dotenv.config(); // Configuração do dotenv

// Create
exports.createStudent = async (req, res) => {
    try {
        const { name, email, phone, date_of_birth, series } = req.body; // Desestruturação dos dados do corpo da requisição

        const newStudent = await Student.create({ // Criação de um novo usuário
            name,
            email,
            phone,
            date_of_birth,
            series
        });

        res.status(201).json({
            message: 'Estudante criado com sucesso!',
            student: newStudent
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o estudante' }); // Retorno de erro
    }
}

// Read
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll(); // Busca todos os estudantes
        res.status(200).json(students); // Retorno dos estudantes
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estudantes' }); // Retorno de erro
    }
}

// Update
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, dateOfBirth, series } = req.body;

    const [updatedCount] = await Student.update(
      { name, email, phone, dateOfBirth, series },
      { where: { id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Estudante não encontrado' });
    }

    const updatedStudent = await Student.findByPk(id);

    res.status(200).json({
      message: 'Estudante atualizado com sucesso!',
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o estudante' });
  }
};

// Delete
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await Student.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Estudante não encontrado' });
    }

    res.status(200).json({ message: 'Estudante deletado com sucesso!' });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o estudante' });
  }
};
