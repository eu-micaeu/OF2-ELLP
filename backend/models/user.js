const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }

User.init({

    id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    email: { // Coluna de email do usuário

        type: DataTypes.STRING,

        allowNull: false, // Não permite valores nulos

        unique: true, // Garante que o email seja único

    },

    password: { // Coluna de senha do usuário

        type: DataTypes.STRING,

        allowNull: false, // Não permite valores nulos

    },

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'User', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = User;