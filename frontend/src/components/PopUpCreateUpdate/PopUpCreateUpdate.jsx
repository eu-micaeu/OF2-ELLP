import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { createWorkshop, updateWorkshop } from '../../utils/api';

function PopUpCreateUpdate({ itemType, onClose, mode = 'create', initialData = {} }) {
  const initialStates = {
    Oficinas: { name: '', start_date: null, end_date: null, academic_load: '' },
    Turmas: { name: '', year: '' },
    Alunos: { name: '', email: '' },
    Presenças: { studentId: '', workshopId: '', date: null },
  };

  const [formData, setFormData] = useState(initialStates[itemType]);

  useEffect(() => {
    if (mode === 'update' && initialData) {
      setFormData(initialData);
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'academic_load' ? parseInt(value, 10) || '' : value }));
  };

  const handleDateChange = (field, newValue) => {
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = async () => {
    try {
      const map = {
        Oficinas: mode === 'create' ? createWorkshop : updateWorkshop,
        // outros tipos aqui...
      };
      await map[itemType](formData);
      alert(`${itemType} ${mode === 'create' ? 'criado' : 'atualizado'} com sucesso!`);
      onClose(true); // true = recarregar
    } catch (err) {
      alert(`Erro ao ${mode === 'create' ? 'criar' : 'atualizar'} ${itemType}: ${err.message}`);
    }
  };

  return (
    <Dialog open onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'Criar' : 'Atualizar'} {itemType}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ mt: 1 }}>
            {Object.entries(formData).map(([field, value]) =>
              field.includes('date') ? (
                <DatePicker
                  key={field}
                  label={field}
                  value={value}
                  onChange={(newValue) => handleDateChange(field, newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                />
              ) : (
                <TextField
                  key={field}
                  name={field}
                  label={field}
                  value={value}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  type={field === 'academic_load' ? 'number' : 'text'}
                />
              )
            )}
          </Box>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopUpCreateUpdate;
