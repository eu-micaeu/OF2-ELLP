const Class = require('../models/class'); // Importa o modelo de Class
const dotenv = require('dotenv');

dotenv.config(); // Configuração do dotenv

// Create
exports.createClass = async (req, res) => {
    try {
        const { code, number_of_classes ,workshop_id } = req.body; // Desestruturação dos dados do corpo da requisição

        const newClass = await Class.create({ // Criação de um nova classe
            code,
            number_of_classes,
            workshop_id
        });

        res.status(201).json({
            message: 'Classe criado com sucesso!',
            class: newClass
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o classe' }); // Retorno de erro
    }
}

// Read
exports.getAllClass = async (req, res) => {
    try {
        const classes = await Class.findAll(); // Busca todos os estudantes
        res.status(200).json(classes); // Retorno dos estudantes
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar classes' }); // Retorno de erro
    }
}

// Update
exports.updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, subjectname, students_quantity } = req.body;

        const classes = await Class.findByPk(id);

        if (!classes) {
            return res.status(404).json({ error: 'Classe não encontrada' }); // Retorno de erro se a classe não for encontrado
        }

        await classes.update({
            code,
            subjectname,
            students_quantity
        });

        res.status(200).json({
            message: 'Classe atualizado com sucesso!',
            classes
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a classe' }); // Retorno de erro
    }
}

// Delete
exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;

        const classes = await Class.findByPk(id);

        if (!classes) {
            return res.status(404).json({ error: 'Classe não encontrada' }); // Retorno de erro se a classe não for encontrado
        }


        const deletedClass = await classes.destroy();


        res.status(200).json({
            message: 'Classe deletada com sucesso!',
            class: deletedClass
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a classe' }); // Retorno de erro
    }
}