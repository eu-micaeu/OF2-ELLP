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
        const { id } = req.params; // ID do estudante a ser atualizado
        const { name, email, phone, dateOfBirth, series } = req.body; // Dados atualizados

        const updatedStudent = await Student.findByIdAndUpdate(id, { // Atualização do estudante
            name,
            email,
            phone,
            dateOfBirth,
            series
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Estudante não encontrado' }); // Retorno de erro se o estudante não for encontrado
        }

        res.status(200).json({
            message: 'Estudante atualizado com sucesso!',
            student: updatedStudent
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o estudante' }); // Retorno de erro
    }
}

// Delete
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params; // ID do estudante a ser deletado

        const deletedStudent = await Student.findByIdAndDelete(id); // Deleção do estudante

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Estudante não encontrado' }); // Retorno de erro se o estudante não for encontrado
        }

        res.status(200).json({
            message: 'Estudante deletado com sucesso!',
            student: deletedStudent
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o estudante' }); // Retorno de erro
    }
}