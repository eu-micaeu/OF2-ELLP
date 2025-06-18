const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Class = require('./class'); // Importa o modelo de classe

class Student extends Model { }

// Modelo de usuário
Student.init({

    id: { // Coluna de ID

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,

    },

    name: { // Coluna de nome de usuário

        type: DataTypes.STRING,

        allowNull: false,

    },

    email: { // Coluna de email

        type: DataTypes.STRING,

        allowNull: false,

    },

    phone: { // Coluna de telefone

        type: DataTypes.STRING,

        allowNull: false,

    },

    date_of_birth: { // Coluna da data de nascimento

        type: DataTypes.STRING,

        defaultValue: 'user',

    },

    series: { // Coluna de série

        type: DataTypes.STRING,

        // allowNull: false,

    },

    class_id: { // Coluna de ID da classe

        type: DataTypes.INTEGER,

        references: { // Referência à tabela de classes

            model: Class,

            key: 'id',

        },

        allowNull: false,

    }

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Student', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Student;