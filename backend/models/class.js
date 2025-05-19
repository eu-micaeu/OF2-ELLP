const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a configuração do banco de dados

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

}, {

    sequelize, // Passa a instância do Sequelize

    modelName: 'Class', // Nome do modelo

    tableName: 'class', // Nome da tabela no banco de dados

    timestamps: false, // Desabilita os timestamps automáticos

});

module.exports = Class; 