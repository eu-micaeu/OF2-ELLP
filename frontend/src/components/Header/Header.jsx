import { useState } from 'react';
import CrudPopup from '../CrudPopup/CrudPopup';
import styles from './Header.module.css';
import { Button, Box } from '@mui/material';

function Header() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = ['Oficinas', 'Turmas', 'Alunos', 'Presenças'];

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    setShowPopup(false);
  };

  const handleCreateClick = () => {
    if (selectedItem) {
      setShowPopup(true);
    } else {
      console.error('Nenhum item selecionado para criar');
    }
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
          <li className={styles.navItem}>Home</li>
          {menuItems.map((item) => (
            <li key={item} className={styles.navItem} onClick={() => handleItemClick(item)}>
              {item}
              {selectedItem === item && (
                <Box
                  className={styles.crudBox}
                  onClick={(e) => e.stopPropagation()}
                  sx={{ display: 'flex', gap: 1, mt: 1 }}
                >
                  <Button variant="contained" size="small" onClick={handleCreateClick}>Criar</Button>
                  <Button variant="outlined" size="small">Ler</Button>
                  <Button variant="outlined" size="small">Atualizar</Button>
                  <Button variant="outlined" size="small" color="error">Deletar</Button>
                </Box>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {showPopup && selectedItem && (
        <CrudPopup
          itemType={selectedItem}
          onClose={handleClosePopup}
        />
      )}
    </header>
  );
}

export default Header;