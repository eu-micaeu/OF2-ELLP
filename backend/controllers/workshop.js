const Workshop = require('../models/workshop');
const dotenv = require('dotenv');

dotenv.config(); // Carrega variáveis do .env

// Create
exports.createWorkshop = async (req, res) => {
    try {
        const { name, start_date, end_date, academic_load } = req.body;

        const newWorkshop = await Workshop.create({
            name,
            start_date,
            end_date,
            academic_load
        });

        res.status(201).json({
            message: 'Oficina criada com sucesso!',
            workshop: newWorkshop
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a oficina' });
    }
}

// Read
exports.getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.findAll();
        res.status(200).json(workshops);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar oficinas' });
    }
}

// Update
exports.updateWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, start_date, end_date, academic_load } = req.body;

        const workshop = await Workshop.findByPk(id);

        if (!workshop) {
            return res.status(404).json({ error: 'Oficina não encontrada' });
        }

        await workshop.update({
            name,
            start_date,
            end_date,
            academic_load
        });

        res.status(200).json({
            message: 'Oficina atualizada com sucesso!',
            workshop
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a oficina' });
    }
}

// Delete
exports.deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;

        const workshop = await Workshop.findByPk(id);

        if (!workshop) {
            return res.status(404).json({ error: 'Oficina não encontrada' });
        }

        await workshop.destroy();

        res.status(200).json({
            message: 'Oficina deletada com sucesso!',
            workshop
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a oficina' });
    }
}
