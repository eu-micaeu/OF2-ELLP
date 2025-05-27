const Presence = require('../models/presence');
const dotenv = require('dotenv');

dotenv.config(); 

// Create
exports.createPresence = async (req, res) => {
    try {
        const { student_id, workshop, presence_date, present } = req.body; // Desestruturação dos dados do corpo da requisição

        const newPresence = await Presence.create({ // Criação de uma nova presença
            student_id,
            workshop,
            presence_date,
            present
        });

        res.status(201).json({
            message: 'Presença criada com sucesso!',
            presence: newPresence
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a presença' }); // Retorno de erro
    }
}

// Read
exports.getAllPresences = async (req, res) => {
    try {
        const presences = await Presence.findAll(); // Busca todas as presenças
        res.status(200).json(presences); // Retorno das presenças
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar presenças' }); // Retorno de erro
    }
}

// Update
exports.updatePresence = async (req, res) => {
    try {
        const { id } = req.params; // ID da presença a ser atualizada
        const { student_id, workshop, presence_date, present } = req.body; // Dados atualizados

        const updatedPresence = await Presence.findByIdAndUpdate(id, { // Atualização da presença
            student_id,
            workshop,
            presence_date,
            present
        }, { new: true });

        if (!updatedPresence) {
            return res.status(404).json({ error: 'Presença não encontrada' }); // Retorno de erro se a presença não for encontrada
        }

        res.status(200).json({
            message: 'Presença atualizada com sucesso!',
            presence: updatedPresence
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a presença' }); // Retorno de erro
    }
}

// Delete
exports.deletePresence = async (req, res) => {
    try {
        const { id } = req.params; // ID da presença a ser deletada

        const deletedPresence = await Presence.destroy({ // Deleção da presença
            where: { presence_id: id }
        });

        if (!deletedPresence) {
            return res.status(404).json({ error: 'Presença não encontrada' }); // Retorno de erro se a presença não for encontrada
        }

        res.status(200).json({
            message: 'Presença deletada com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a presença' }); // Retorno de erro
    }
}


