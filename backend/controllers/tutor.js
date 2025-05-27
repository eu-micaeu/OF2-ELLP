const Tutor = require('../models/tutor');
const dotenv = require('dotenv');

dotenv.config();

// CREATE
exports.createTutor = async (req, res) => {
    try {
        const { tutor_name, tutor_curse } = req.body;

        if (!tutor_name || !tutor_curse) {
            return res.status(400).json({ error: 'Nome e curso do tutor são obrigatórios.' });
        }

        const newTutor = await Tutor.create({ tutor_name, tutor_curse });

        res.status(201).json({
            message: 'Tutor criado com sucesso!',
            tutor: newTutor
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o tutor' });
    }
};

// READ
exports.getAllTutors = async (req, res) => {
    try {
        const tutors = await Tutor.findAll();
        return res.status(200).json(tutors);
    } catch (error) {
        console.error('Error fetching tutors:', error.message);
        return res.status(500).json({ error: 'Erro ao obter os tutores' });
    }
};

// UPDATE
exports.updateTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { tutor_name, tutor_curse } = req.body;

        const [rowsUpdated] = await Tutor.update(
            { tutor_name, tutor_curse },
            { where: { tutor_id: id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }

        res.status(200).json({ message: 'Tutor atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o tutor' });
    }
};

// DELETE
exports.deleteTutor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTutor = await Tutor.destroy({ where: { tutor_id: id } });

        if (deletedTutor === 0) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }

        res.status(200).json({ message: 'Tutor deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o tutor' });
    }
};
