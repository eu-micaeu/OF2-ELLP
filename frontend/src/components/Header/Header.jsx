import { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import styles from './Header.module.css';

function Header() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = ['Oficinas'];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
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
        <PopUp
          title={selectedItem}
          onClose={handleClosePopup}
          content={<p>Conteúdo da {selectedItem}.</p>}
        />
      )}
    </header>
  );
}

export default Header;