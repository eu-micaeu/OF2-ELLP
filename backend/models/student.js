const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Student extends Model { }

// Modelo de usuário
Student.init({

    student_id: { // Coluna de ID

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

    // address: { // Coluna de endereço

    //     type: DataTypes.STRING,

    //     allowNull: false,

    // },

    dateOfBirth: { // Coluna da data de nascimento

        type: DataTypes.STRING,

        defaultValue: 'user',

    },

    series: { // Coluna de série

        type: DataTypes.STRING,

        allowNull: false,

    },

}, {

    sequelize, // Conexão com o banco de dados

    modelName: 'Student', // Nome do modelo

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Student;