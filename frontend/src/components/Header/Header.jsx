import { useState } from 'react';
import PopUpReadDelete from '../PopUpReadDelete/PopUpReadDelete';
import styles from './Header.module.css';

function Header() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = ['Oficinas', 'Turmas', 'Alunos', 'Presenças', 'Endereços', 'Tutores'];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedItem(null); // Fecha o Box de CRUD ao fechar o popup
  };

  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <nav>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item} className={styles.navItem} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {showPopup && selectedItem && (
        <PopUpReadDelete
          itemType={selectedItem}
          onClose={handleClosePopup}
        />
      )}
    </header>
  );
}

export default Header;