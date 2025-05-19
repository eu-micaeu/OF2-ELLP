import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Home</li>
          <li className={styles.navItem}>Oficinas</li>
          <li className={styles.navItem}>Turmas</li>
          <li className={styles.navItem}>Alunos</li>
          <li className={styles.navItem}>Presenças</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;