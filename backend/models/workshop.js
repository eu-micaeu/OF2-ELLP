const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Workshop extends Model { }

// Modelo da oficina
Workshop.init({

    workshop_id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    name: { // Coluna de nome da oficina

        type: DataTypes.STRING,

        allowNull: false,

    },

    start_date: { // Coluna da data de início

        type: DataTypes.STRING,

    },

    end_date: { // Coluna da data de término

        type: DataTypes.STRING,

    },

    academic_load: { // Coluna da carga horária

        type: DataTypes.INTEGER,

    },

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Workshop', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Workshop;