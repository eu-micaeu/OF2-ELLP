const Presence = require('../models/presence');
const dotenv = require('dotenv');

dotenv.config();

// CREATE
exports.createPresence = async (req, res) => {
    try {
        const { student_id, workshop, presence_date, present } = req.body;

        if (!student_id || !workshop || !presence_date || present === undefined) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const newPresence = await Presence.create({
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
        res.status(500).json({ error: 'Erro ao criar a presença' });
    }
};

// READ
exports.getAllPresences = async (req, res) => {
    try {
        const presences = await Presence.findAll();
        return res.status(200).json(presences);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter as presenças' });
    }
};

exports.getStudentPresence = async (req, res) => {
    try {
        const { studentId } = req.params;
        const presences = await Presence.findAll({ where: { student_id: studentId } });
        res.status(200).json(presences);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar frequência do aluno' });
    }
};

// UPDATE
exports.updatePresence = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_id, workshop, presence_date, present } = req.body;

        const [rowsUpdated] = await Presence.update(
            { student_id, workshop, presence_date, present },
            { where: { presence_id: id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Presença não encontrada' });
        }

        res.status(200).json({
            message: 'Presença atualizada com sucesso!'
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a presença' });
    }
};

// DELETE
exports.deletePresence = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPresence = await Presence.destroy({
            where: { presence_id: id }
        });

        if (deletedPresence === 0) {
            return res.status(404).json({ error: 'Presença não encontrada' });
        }

        res.status(200).json({ message: 'Presença deletada com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a presença' });
    }
};

// REPORT
exports.getPresenceReport = async (req, res) => {
    try {
        const { studentId } = req.params;
        const presences = await Presence.findAll({ where: { student_id: studentId } });
        // Formate os dados para o relatório
        const report = presences.map(p => ({
            oficina: p.workshop,
            data: p.presence_date,
            presente: p.present ? 'Sim' : 'Não',
        }));
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
};
