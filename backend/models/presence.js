const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Presence extends Model { }

Presence.init({

    presence_id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    student_id: { // Coluna id do estudante

        type: DataTypes.INTEGER,

        allowNull: false,

    },

    workshop: { // Coluna id da oficina

        type: DataTypes.INTEGER,

        allowNull: false,

    },


    presence_date: { // Coluna da data da presença

        type: DataTypes.STRING,

        defaultValue: 'user',

    },

    present: { // Coluna de presença
        type: DataTypes.BOOLEAN,

        defaultValue: false,

    }
}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Presence', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Presence;