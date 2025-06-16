const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tutor extends Model { }

Tutor.init({

    tutor_id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    tutor_name: { // Coluna de nome do tutor

        type: DataTypes.STRING,

        defaultValue: 'user',

    },

    tutor_curse: { // Coluna de curso do tutor

        type: DataTypes.STRING,

        defaultValue: 'user',

    } 
}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Tutor', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Tutor;