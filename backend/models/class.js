const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a configuração do banco de dados
const Workshop = require('./workshop');

class Class extends Model { }

Class.init({
    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,
    },

    code: { // Coluna de código da classe

        type: DataTypes.STRING,

        allowNull: false,

    },

    subjectname: { // Coluna de nome da classe

        type: DataTypes.STRING,

        allowNull: false,

    },

    students_quantity: { // Coluna de quantidade de estudantes

        type: DataTypes.INTEGER,

        allowNull: false,

    },

    workshop_id: { // Coluna de ID da oficina associada

        type: DataTypes.INTEGER,

        references: {
            model: Workshop, // Referência ao modelo Workshop
            key: 'id', // Chave estrangeira
        },

        allowNull: false, // Não permite nulo

    },

}, {

    sequelize, // Passa a instância do Sequelize

    modelName: 'Class', // Nome do modelo

    timestamps: false, // Desabilita os timestamps automáticos

});

module.exports = Class; 