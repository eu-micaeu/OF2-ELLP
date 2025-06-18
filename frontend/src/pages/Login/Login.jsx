import { useState } from 'react';
import styles from './Login.module.css';
import { login } from '../../utils/api';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      toast.success('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
      window.location.href = '/';
    } catch (error) {
      toast.error('Erro ao realizar login: ' + error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
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
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
        <p className={styles.registerPrompt}>
          Não tem uma conta? <a href="/register">Registrar</a>
        </p>
      </form>
    </div>
  );
}

export default Login;