import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box
} from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { createWorkshop, getAllWorkshops, updateWorkshop, deleteWorkshop } from '../../utils/api';

function CrudPopup({ itemType, onClose }) {
  const initialStates = {
    Oficinas: { name: '', start_date: null, end_date: null, academic_load: '' },
    Turmas: { name: '', year: '' },
    Alunos: { name: '', email: '' },
    Presenças: { studentId: '', workshopId: '', date: null },
  };

  const [formData, setFormData] = useState(initialStates[itemType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'academic_load') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : parseInt(value, 10)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (field, newValue) => {
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const map = {
        Oficinas: createWorkshop,
        // Turmas: createClass,
        // Alunos: createStudent,
        // Presenças: createAttendance,
      };
      await map[itemType](formData);
      alert(`${itemType} criado com sucesso!`);
      onClose();
    } catch (err) {
      alert(`Erro ao criar ${itemType}: ${err.message}`);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar {itemType}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {Object.entries(formData).map(([field, value]) => {
              if (field === 'start_date' || field === 'end_date' || field === 'date') {
                return (
                  <DatePicker
                    key={field}
                    label={field}
                    value={value}
                    onChange={(newValue) => handleDateChange(field, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        fullWidth
                        required
                      />
                    )}
                  />
                );
              }

              return (
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
              );
            })}
          </Box>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CrudPopup;
