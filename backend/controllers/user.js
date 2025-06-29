const User = require('../models/user');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

// Função para gerar token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // 1 dia de expiração
    );
};

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        const token = generateToken(newUser);

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: { id: newUser.id, email: newUser.email },
            token
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

        const token = generateToken(user);

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
};
