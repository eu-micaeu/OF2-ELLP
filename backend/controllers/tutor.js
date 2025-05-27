const Tutor = require('../models/tutor');
const dotenv = require('dotenv');

dotenv.config();

// Create
exports.createTutor = async (req, res) => {
    try {
        const { tutor_name, tutor_curse } = req.body; // Desestruturação dos dados do corpo da requisição

        const newTutor = await Tutor.create({ // Criação de um novo tutor
            tutor_name,
            tutor_curse
        });

        res.status(201).json({
            message: 'Tutor criado com sucesso!',
            tutor: newTutor
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o tutor' }); // Retorno de erro
    }
}

// Read
exports.getAllTutors = async (req, res) => {
    try {
        const tutors = await Tutor.findAll();
        return res.status(200).json(tutors);
    } catch (error) {
        console.error('Error fetching tutors:', error.message); // Log error details.
        return res.status(500).json({ error: 'Erro ao obter os tutores' });
    }
};

// Update
exports.updateTutor = async (req, res) => {
    try {
        const { id } = req.params; // ID do tutor a ser atualizado
        const { tutor_name, tutor_curse } = req.body; // Dados atualizados

        const updatedTutor = await Tutor.findByIdAndUpdate(id, { // Atualização do tutor
            tutor_name,
            tutor_curse
        }, { new: true });

        if (!updatedTutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' }); // Retorno de erro se o tutor não for encontrado
        }

        res.status(200).json({
            message: 'Tutor atualizado com sucesso!',
            tutor: updatedTutor
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o tutor' }); // Retorno de erro
    }
}

// Delete
exports.deleteTutor = async (req, res) => {
    try {
        const { id } = req.params; // ID do tutor a ser deletado

        const deletedTutor = await Tutor.destroy({ where: { id } }); // Deleção do tutor

        if (!deletedTutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' }); // Retorno de erro se o tutor não for encontrado
        }

        res.status(200).json({
            message: 'Tutor deletado com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o tutor' }); // Retorno de erro
    }
}

