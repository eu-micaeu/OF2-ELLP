const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a configuração do banco de dados

class Address extends Model { }

Address.init({
    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true,
    },

    street: { // Coluna de rua

        type: DataTypes.STRING,

        allowNull: false,

    },

    number: { // Coluna de número

        type: DataTypes.STRING,

        allowNull: false,

    },

    complement: { // Coluna de complemento

        type: DataTypes.STRING,

        allowNull: true,

    },

    neighborhood: { // Coluna de bairro

        type: DataTypes.STRING,

        allowNull: false,

    },

    postal_code: { // Coluna de CEP

        type: DataTypes.STRING,

        allowNull: false,

    },

}, {

    sequelize, // Passa a instância do Sequelize

    modelName: 'Address', // Nome do modelo

    timestamps: false, // Desabilita os timestamps automáticos

});

module.exports = Address; 