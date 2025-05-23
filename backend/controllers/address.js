const Address = require('../models/address');
const dotenv = require('dotenv');

dotenv.config(); // Carrega variáveis do .env

// Create
exports.createAddress = async (req, res) => {
    try {
        const { street, number, neighborhood, complement, state, postal_code } = req.body;

        const newAddress = await Address.create({
            street,
            number,
            neighborhood,
            complement,
            state,
            postal_code
        });

        res.status(201).json({
            message: 'Endereço criado com sucesso!',
            address: newAddress
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o endereço' });
    }
}

// Read
exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereços' });
    }
}

// Update
exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { street, number, neighborhood, complement, state, postal_code } = req.body;

        const address = await Address.findByPk(id);

        if (!address) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }

        await address.update({
            street,
            number,
            neighborhood,
            complement,
            state,
            postal_code
        });

        res.status(200).json({
            message: 'Endereço atualizado com sucesso!',
            address
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o endereço' });
    }
}

// Delete
exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findByPk(id);

        if (!address) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }

        await address.destroy();

        res.status(200).json({
            message: 'Endereço deletado com sucesso!'
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o endereço' });
    }
}
