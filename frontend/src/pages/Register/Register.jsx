import { useState } from 'react';
import styles from './Register.module.css';
import { register } from '../../utils/api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        try {
            const response = await register({ email, password });
            alert('Registro realizado com sucesso!');
            console.log('Registro:', response);
            // Redirecionar ou limpar os campos após o registro
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            window.location.href = '/login'; // Redireciona para a página de login após
        } catch (error) {
            alert('Erro ao registrar: ' + (error?.message || 'Tente novamente.'));
        }
    };

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Registrar</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className={styles.registerButton}>
                    Registrar
                </button>
                <p className={styles.loginPrompt}>
                    Já tem uma conta? <a href="/login">Entrar</a>
                </p>
            </form>
        </div>
    );
}

export default Register;