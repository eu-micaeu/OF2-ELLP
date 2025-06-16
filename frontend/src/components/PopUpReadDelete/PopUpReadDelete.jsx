import { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box
} from '@mui/material';

// Workshop API functions
import { getAllWorkshop, deleteWorkshop } from '../../utils/api';

// Class API functions
import { getAllClass, deleteClass } from '../../utils/api';

// Student API functions
import { getAllStudent, deleteStudent } from '../../utils/api';

import PopUpCreateUpdate from '../PopUpCreateUpdate/PopUpCreateUpdate';

function PopUpReadDelete({ itemType, onClose }) {
  const [list, setList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'update'
  const [selectedData, setSelectedData] = useState(null);

  const fetchList = async () => {
    const map = {
      Oficinas: getAllWorkshop,
      Turmas: getAllClass,
      Alunos: getAllStudent,
      // outros tipos...
    };

    try {
      const data = await map[itemType]();
      setList(data);
    } catch (err) {
      alert(`Erro ao buscar ${itemType}: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    const map = {
      Oficinas: deleteWorkshop,
      Turmas: deleteClass,
      Alunos: deleteStudent,
      // outros tipos...
    };

    try {
      await map[itemType](id);
      alert(`${itemType} deletado com sucesso!`);
      fetchList();
    } catch (err) {
      alert(`Erro ao deletar ${itemType}: ${err.message}`);
    }
  };

  const handleOpenForm = (mode, data = null) => {
    setFormMode(mode);
    setSelectedData(data);
    setOpenForm(true);
  };

  const handleFormClose = (shouldReload) => {
    setOpenForm(false);
    setSelectedData(null);
    if (shouldReload) fetchList();
  };

  useEffect(() => {
    fetchList();
  }, [itemType]);

  return (
    <>
      <Dialog open onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{itemType} - Listar / Deletar</DialogTitle>
        <DialogContent dividers>
          {list.length === 0 ? (
            <p>Nenhum item encontrado.</p>
          ) : (
            list.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>{item.name || item.code || JSON.stringify(item)}</span>
                <Box>
                  <Button onClick={() => handleOpenForm('update', item)} size="small">Atualizar</Button>
                  <Button onClick={() => handleDelete(item.id)} color="error" size="small">Deletar</Button>
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpenForm('create')} variant="contained">Criar</Button>
          <Button onClick={onClose} color="secondary">Fechar</Button>
        </DialogActions>
      </Dialog>

      {openForm && (
        <PopUpCreateUpdate
          itemType={itemType}
          mode={formMode}
          initialData={selectedData}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}

export default PopUpReadDelete;
