const User = require('../models/user');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: newUser
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }

        res.status(200).json({
            message: 'Login realizado com sucesso!'
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
};