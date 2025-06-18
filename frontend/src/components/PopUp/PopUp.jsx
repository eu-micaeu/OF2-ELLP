import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, List, ListItem, ListItemText, TextField, Typography, Divider
} from '@mui/material';
import { getAllWorkshop, getAllClass, getAllStudent, createClass, createStudent } from '../../utils/api';

function PopUp({ onClose }) {
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [showCreateClassForm, setShowCreateClassForm] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newClassCode, setNewClassCode] = useState('');
    const [newClassStudentsQuantity, setNewClassStudentsQuantity] = useState(0);

    const [showCreateStudentForm, setShowCreateStudentForm] = useState(false);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentEmail, setNewStudentEmail] = useState('');
    const [newStudentPhone, setNewStudentPhone] = useState('');

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const data = await getAllWorkshop();
                setWorkshops(data);
            } catch (err) {
                alert(`Erro ao buscar oficinas: ${err.message}`);
            }
        };
        fetchWorkshops();
    }, []);

    const handleWorkshopClick = async (workshop) => {
        setSelectedWorkshop(workshop);
        setSelectedClass(null);
        setStudents([]);
        try {
            const data = await getAllClass();
            setClasses(data.filter((cls) => cls.workshop_id === workshop.id));
        } catch (err) {
            alert(`Erro ao buscar turmas: ${err.message}`);
        }
    };

    const handleClassClick = async (cls) => {
        setSelectedClass(cls);
        try {
            const data = await getAllStudent();
            setStudents(data.filter((student) => student.class_id === cls.id));
        } catch (err) {
            alert(`Erro ao buscar alunos: ${err.message}`);
        }
    };

    const handleCreateClass = async () => {
        if (!newClassName.trim()) {
            alert('O nome da turma não pode estar vazio.');
            return;
        }
        try {
            const newClass = await createClass({
                subjectname: newClassName,
                code: newClassCode,
                students_quantity: newClassStudentsQuantity,
                workshop_id: selectedWorkshop.id,
            });
            setClasses((prev) => [...prev, newClass]);
            setShowCreateClassForm(false);
            setNewClassName('');
            alert('Turma criada com sucesso!');
        } catch (err) {
            alert(`Erro ao criar turma: ${err.message}`);
        }
    };

    const handleCreateStudent = async () => {
        if (!newStudentName.trim()) {
            alert('O nome do aluno não pode estar vazio.');
            return;
        }
        if (!newStudentEmail.trim()) {
            alert('O email do aluno não pode estar vazio.');
            return;
        }
        if (!newStudentPhone.trim()) {
            alert('O telefone do aluno não pode estar vazio.');
            return;
        }
        try {
            const newStudent = await createStudent({
                name: newStudentName,
                email: newStudentEmail,
                phone: newStudentPhone,
                class_id: selectedClass.id,
            });
            setStudents((prev) => [...prev, newStudent]);
            setShowCreateStudentForm(false);
            setNewStudentName('');
            setNewStudentEmail('');
            setNewStudentPhone('');
            alert('Aluno criado com sucesso!');
        } catch (err) {
            alert(`Erro ao criar aluno: ${err.message}`);
        }
    };

    const selectedBorderStyle = {
        borderLeft: '5px solid #4CAF50',
        backgroundColor: '#f0fdf4',
    };

    return (
        <Dialog open onClose={() => onClose(false)} fullWidth maxWidth="sm">
            <DialogTitle>Visualizar Hierarquia</DialogTitle>
            <DialogContent dividers>

                {/* Oficinas */}
                <Typography variant="h6">Oficinas</Typography>
                <List>
                    {workshops.map((workshop) => (
                        <ListItem
                            key={workshop.id}
                            button
                            onClick={() => handleWorkshopClick(workshop)}
                            sx={selectedWorkshop?.id === workshop.id ? selectedBorderStyle : { borderLeft: '5px solid transparent' }}
                        >
                            <ListItemText primary={workshop.name} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Turmas */}
                <Typography variant="h6">Turmas</Typography>
                {selectedWorkshop ? (
                    <>
                        {classes.length > 0 ? (
                            <List>
                                {classes.map((cls) => (
                                    <ListItem
                                        key={cls.id}
                                        button
                                        onClick={() => handleClassClick(cls)}
                                        sx={selectedClass?.id === cls.id ? selectedBorderStyle : { borderLeft: '5px solid transparent' }}
                                    >
                                        <ListItemText primary={cls.subjectname} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Não há turmas vinculadas a esta oficina.
                            </Typography>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setShowCreateClassForm(true)}
                            sx={{ mt: 1 }}
                        >
                            Criar Turma
                        </Button>

                        {showCreateClassForm && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="Nome da Turma"
                                    value={newClassName}
                                    onChange={(e) => setNewClassName(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    label="Quantidade de Alunos"
                                    type="number"
                                    value={newClassStudentsQuantity}
                                    onChange={(e) => setNewClassStudentsQuantity(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    label="Código da Turma"
                                    value={newClassCode}
                                    onChange={(e) => setNewClassCode(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateClass}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    onClick={() => setShowCreateClassForm(false)}
                                    sx={{ ml: 2 }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Selecione uma oficina para visualizar ou criar turmas.
                    </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Alunos */}
                <Typography variant="h6">Alunos</Typography>
                {selectedClass ? (
                    <>
                        {students.length > 0 ? (
                            <List>
                                {students.map((student) => (
                                    <ListItem key={student.id}>
                                        <ListItemText primary={student.name} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Nenhum aluno nesta turma.
                            </Typography>
                        )}

                        {/* Mostrar botão de criar aluno se a turma estiver vazia */}
                        {students.length === 0 && (
                            <>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setShowCreateStudentForm(true)}
                                    sx={{ mt: 1 }}
                                >
                                    Criar Aluno
                                </Button>

                                {showCreateStudentForm && (
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            label="Nome do Aluno"
                                            value={newStudentName}
                                            onChange={(e) => setNewStudentName(e.target.value)}
                                            fullWidth
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            label="Email do Aluno"
                                            value={newStudentEmail}
                                            onChange={(e) => setNewStudentEmail(e.target.value)}
                                            fullWidth
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            label="Telefone do Aluno"
                                            value={newStudentPhone}
                                            onChange={(e) => setNewStudentPhone(e.target.value)}
                                            fullWidth
                                            sx={{ mb: 1 }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleCreateStudent}
                                        >
                                            Salvar
                                        </Button>
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            onClick={() => setShowCreateStudentForm(false)}
                                            sx={{ ml: 2 }}
                                        >
                                            Cancelar
                                        </Button>
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Selecione uma turma para visualizar ou criar alunos.
                    </Typography>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="secondary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopUp;
