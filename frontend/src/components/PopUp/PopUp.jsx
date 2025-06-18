import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
    Button, Box, List, ListItem, ListItemText, TextField, Typography, Divider, IconButton
} from '@mui/material';
import {
    getAllWorkshop, getAllClass, getAllStudent,
    createClass, createStudent, updateStudent,
    deleteClass, deleteStudent
} from '../../utils/api';

import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function PopUp({ onClose }) {
    // Estados existentes
    const [workshops, setWorkshops] = useState([]);
    const [loadingWorkshops, setLoadingWorkshops] = useState(true);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [classes, setClasses] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [showCreateClassForm, setShowCreateClassForm] = useState(false);
    const [newClassCode, setNewClassCode] = useState('');
    const [newClassNumberOfClasses, setNewClassNumberOfClasses] = useState('');
    const [showCreateStudentForm, setShowCreateStudentForm] = useState(false);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentEmail, setNewStudentEmail] = useState('');
    const [newStudentPhone, setNewStudentPhone] = useState('');

    // --- NOVOS ESTADOS PARA O DIALOG DE EXCLUSÃO ---
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); // Ex: { id: 1, type: 'class', name: 'TURMA-01' }

    // Carregar oficinas
    useEffect(() => {
        const fetchWorkshops = async () => {
            setLoadingWorkshops(true);
            try {
                const data = await getAllWorkshop();
                setWorkshops(data);
            } catch (err) {
                toast.error(`Erro ao buscar oficinas: ${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            } finally {
                setLoadingWorkshops(false);
            }
        };
        fetchWorkshops();
    }, []);

    // Função para recarregar turmas de uma oficina
    const fetchClasses = async (workshopId) => {
        setLoadingClasses(true);
        try {
            const data = await getAllClass();
            setClasses(data.filter((cls) => cls.workshop_id === workshopId));
        } catch (err) {
            toast.error(`Erro ao buscar turmas: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } finally {
            setLoadingClasses(false);
        }
    };

    // Função para recarregar alunos de uma turma
    const fetchStudents = async (classId) => {
        setLoadingStudents(true);
        try {
            const data = await getAllStudent();
            setStudents(data.filter((student) => student.class_id === classId));
        } catch (err) {
            toast.error(`Erro ao buscar alunos: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleWorkshopClick = async (workshop) => {
        setSelectedWorkshop(workshop);
        setSelectedClass(null);
        setStudents([]);
        await fetchClasses(workshop.id);
    };

    const handleClassClick = async (cls) => {
        setSelectedClass(cls);
        await fetchStudents(cls.id);
    };

    const handleCreateClass = async () => {
        if (!newClassCode.trim() || !newClassNumberOfClasses.trim()) {
            toast.error('Preencha todos os campos da turma.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }
        try {
            await createClass({
                code: newClassCode,
                number_of_classes: parseInt(newClassNumberOfClasses, 10),
                workshop_id: selectedWorkshop.id,
            });
            await fetchClasses(selectedWorkshop.id);
            setShowCreateClassForm(false);
            setNewClassCode('');
            setNewClassNumberOfClasses('');
            toast.success('Turma criada com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } catch (err) {
            toast.error(`Erro ao criar turma: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };

    const handleCreateStudent = async () => {
        if (!newStudentName.trim() || !newStudentEmail.trim() || !newStudentPhone.trim()) {
            toast.error('Preencha todos os campos do aluno.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }
        try {
            await createStudent({
                name: newStudentName,
                email: newStudentEmail,
                phone: newStudentPhone,
                class_id: selectedClass.id,
            });
            await fetchStudents(selectedClass.id);
            setShowCreateStudentForm(false);
            setNewStudentName('');
            setNewStudentEmail('');
            setNewStudentPhone('');
            toast.success('Aluno criado com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } catch (err) {
            toast.error(`Erro ao criar aluno: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };

    // --- NOVAS FUNÇÕES PARA GERENCIAR A EXCLUSÃO ---
    const openDeleteDialog = (item, type) => {
        setItemToDelete({
            id: item.id,
            type: type, // 'class' ou 'student'
            name: type === 'class' ? item.code : item.name
        });
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        const { id, type } = itemToDelete;

        try {
            if (type === 'class') {
                // Buscar todos os alunos da turma antes de deletar a turma
                const allStudents = await getAllStudent();
                const studentsInClass = allStudents.filter(student => student.class_id === id);
                // Deletar todos os alunos da turma
                for (const student of studentsInClass) {
                    await deleteStudent(student.id);
                }
                await deleteClass(id);
                toast.success('Turma deletada com sucesso!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                if (selectedClass?.id === id) {
                    setSelectedClass(null);
                    setStudents([]);
                }
                await fetchClasses(selectedWorkshop.id);
            } else if (type === 'student') {
                await deleteStudent(id);
                toast.success('Aluno deletado com sucesso!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                await fetchStudents(selectedClass.id);
            }
        } catch (err) {
            toast.error(`Erro ao deletar ${type === 'class' ? 'turma' : 'aluno'}: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } finally {
            closeDeleteDialog();
        }
    };
    // --- FIM DAS FUNÇÕES DE EXCLUSÃO ---

    // Substitua as suas funções handleIncrementClassesGone e handleDecrementClassesGone por estas:

    const handleIncrementClassesGone = async (studentToUpdate) => {
        const originalClassesGone = studentToUpdate.classes_gone;
        const newClassesGone = originalClassesGone + 1;

        // Opcional, mas recomendado: impedir que as presenças ultrapassem o número de aulas.
        if (selectedClass && newClassesGone > selectedClass.number_of_classes) {
            toast.warn('O número de presenças não pode exceder o total de aulas da turma.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            return;
        }

        // 1. Atualização Otimista: Atualiza a UI imediatamente.
        setStudents(currentStudents =>
            currentStudents.map(s =>
                s.id === studentToUpdate.id ? { ...s, classes_gone: newClassesGone } : s
            )
        );

        // 2. Chamada à API em segundo plano.
        try {
            await updateStudent(studentToUpdate.id, { classes_gone: newClassesGone });
            // Se a API responder com sucesso, não precisamos fazer nada,
            // pois a UI já foi atualizada.
        } catch (err) {
            // 3. Rollback em caso de erro.
            toast.error(`Erro ao adicionar presença: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            // Reverte a mudança na UI para o estado original.
            setStudents(currentStudents =>
                currentStudents.map(s =>
                    s.id === studentToUpdate.id ? { ...s, classes_gone: originalClassesGone } : s
                )
            );
        }
    };

    const handleDecrementClassesGone = async (studentToUpdate) => {
        const originalClassesGone = studentToUpdate.classes_gone;

        if (originalClassesGone <= 0) {
            toast.warn('Não é possível diminuir presenças abaixo de zero.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            return;
        }

        const newClassesGone = originalClassesGone - 1;

        // 1. Atualização Otimista: Atualiza a UI imediatamente.
        setStudents(currentStudents =>
            currentStudents.map(s =>
                s.id === studentToUpdate.id ? { ...s, classes_gone: newClassesGone } : s
            )
        );

        // 2. Chamada à API em segundo plano.
        try {
            await updateStudent(studentToUpdate.id, { classes_gone: newClassesGone });
            // Sucesso! Nenhuma ação necessária.
        } catch (err) {
            toast.error(`Erro ao remover presença: ${err.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            setStudents(currentStudents =>
                currentStudents.map(s =>
                    s.id === studentToUpdate.id ? { ...s, classes_gone: originalClassesGone } : s
                )
            );
        }
    };

    const getAttendancePercentage = (student) => {
        if (!selectedClass || selectedClass.number_of_classes === 0) return '0%';
        const percentage = (student.classes_gone / selectedClass.number_of_classes) * 100;
        return `${percentage.toFixed(1)}%`;
    };

    const selectedBorderStyle = {
        borderLeft: '5px solid #4CAF50',
        backgroundColor: '#f0fdf4',
    };

    const renderLoading = () => (
        <Typography variant="body2" color="text.secondary">
            Carregando...
        </Typography>
    );

    const generateStudentReportPdf = async (student) => {
        if (!selectedWorkshop || !selectedClass) {
            toast.error('Selecione uma oficina e uma turma antes de gerar o relatório.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const fileName = `${student.name.replace(/\s+/g, '-')}-relatorio-${day}_${month}_${year}.pdf`;

        const content = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="color: #333;">Relatório de Aluno</h1>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <h2 style="color: #555;">Dados do Aluno</h2>
                <p><strong>Nome:</strong> ${student.name}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Telefone:</strong> ${student.phone}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <h2 style="color: #555;">Dados da Oficina e Turma</h2>
                <p><strong>Oficina:</strong> ${selectedWorkshop.name}</p>
                <p><strong>Código da Turma:</strong> ${selectedClass.code}</p>
                <p><strong>Total de Aulas na Turma:</strong> ${selectedClass.number_of_classes}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <h2 style="color: #555;">Frequência</h2>
                <p><strong>Aulas Frequentadas:</strong> ${student.classes_gone}</p>
                <p><strong>Porcentagem de Frequência:</strong> ${getAttendancePercentage(student)}</p>
                <p style="margin-top: 40px; font-size: 0.9em; color: #777;">
                    Relatório gerado em: ${formattedDate}
                </p>
            </div>
        `;

        const opt = {
            margin: 1, filename: fileName, image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(content).save();
            toast.success('Relatório PDF gerado com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            toast.error('Erro ao gerar relatório PDF.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <Dialog open onClose={() => onClose(false)} fullWidth maxWidth="md">
                <DialogContent dividers>

                    {/* Oficinas */}
                    <Typography variant="h6">Oficinas</Typography>
                    {loadingWorkshops ? renderLoading() : (
                        <List>
                            {workshops.map((workshop) => (
                                <ListItem
                                    key={workshop.id} button onClick={() => handleWorkshopClick(workshop)}
                                    sx={selectedWorkshop?.id === workshop.id ? selectedBorderStyle : { borderLeft: '5px solid transparent' }}
                                >
                                    <ListItemText primary={workshop.name} />
                                </ListItem>
                            ))}
                        </List>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Turmas */}
                    <Typography variant="h6">Turmas</Typography>
                    {selectedWorkshop ? (
                        <>
                            {loadingClasses ? renderLoading() : (
                                <>
                                    {classes.length > 0 ? (
                                        <List>
                                            {classes.map((cls) => (
                                                <ListItem
                                                    key={cls.id}
                                                    button
                                                    onClick={() => handleClassClick(cls)}
                                                    sx={selectedClass?.id === cls.id ? selectedBorderStyle : { borderLeft: '5px solid transparent' }}
                                                    secondaryAction={
                                                        <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                                            e.stopPropagation(); // Impede que o clique no ícone selecione a turma
                                                            openDeleteDialog(cls, 'class');
                                                        }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    <ListItemText primary={cls.code} secondary={`Aulas: ${cls.number_of_classes}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Não há turmas nesta oficina.</Typography>
                                    )}
                                </>
                            )}
                            <Button variant="outlined" onClick={() => setShowCreateClassForm(true)} sx={{ mt: 1 }}>Criar Turma</Button>
                            {showCreateClassForm && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Código da Turma" value={newClassCode} onChange={(e) => setNewClassCode(e.target.value)} fullWidth sx={{ mb: 1 }} />
                                    <TextField label="Quantidade de Aulas" type="number" value={newClassNumberOfClasses} onChange={(e) => setNewClassNumberOfClasses(e.target.value)} fullWidth sx={{ mb: 1 }} />
                                    <Button variant="contained" onClick={handleCreateClass}>Salvar</Button>
                                    <Button variant="text" color="secondary" onClick={() => setShowCreateClassForm(false)} sx={{ ml: 2 }}>Cancelar</Button>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary">Selecione uma oficina.</Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Alunos */}
                    <Typography variant="h6">Alunos</Typography>
                    {selectedClass ? (
                        <>
                            {loadingStudents ? renderLoading() : (
                                <>
                                    {students.length > 0 ? (
                                        <List>
                                            {students.map((student) => (
                                                <ListItem key={student.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                    <Box sx={{ flexGrow: 1, minWidth: '200px' }}>
                                                        <ListItemText
                                                            primary={student.name}
                                                            secondary={`${student.email} | ${student.phone} | Aulas: ${student.classes_gone} | Frequência: ${getAttendancePercentage(student)}`}
                                                        />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                                                        <Button title='Adicionar Presença' variant="contained" size="small" color="success" onClick={() => handleIncrementClassesGone(student)}>
                                                            <AddIcon fontSize="small" />
                                                        </Button>
                                                        <Button title='Remover Presença' variant="contained" size="small" color="warning" onClick={() => handleDecrementClassesGone(student)}>
                                                            <RemoveIcon fontSize="small" />
                                                        </Button>
                                                        <Button title='Gerar Relatório' variant="outlined" size="small" onClick={() => generateStudentReportPdf(student)}>
                                                            <PictureAsPdfIcon fontSize="small" />
                                                        </Button>
                                                        <Button title='Deletar Aluno' variant="outlined" size="small" color="error" onClick={() => openDeleteDialog(student, 'student')}>
                                                            <DeleteIcon fontSize="small" />
                                                        </Button>
                                                    </Box>
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Nenhum aluno nesta turma.</Typography>
                                    )}
                                </>
                            )}
                            <Button variant="outlined" onClick={() => setShowCreateStudentForm(true)} sx={{ mt: 1 }}>Criar Aluno</Button>
                            {showCreateStudentForm && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField label="Nome" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} fullWidth sx={{ mb: 1 }} />
                                    <TextField label="Email" value={newStudentEmail} onChange={(e) => setNewStudentEmail(e.target.value)} fullWidth sx={{ mb: 1 }} />
                                    <TextField label="Telefone" value={newStudentPhone} onChange={(e) => setNewStudentPhone(e.target.value)} fullWidth sx={{ mb: 1 }} />
                                    <Button variant="contained" onClick={handleCreateStudent}>Salvar</Button>
                                    <Button variant="text" color="secondary" onClick={() => setShowCreateStudentForm(false)} sx={{ ml: 2 }}>Cancelar</Button>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary">Selecione uma turma.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)} color="secondary">Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* --- NOVO DIALOG DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmar Exclusão
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {itemToDelete && `Você tem certeza que deseja deletar ${itemToDelete.type === 'class' ? 'a turma' : 'o(a) aluno(a)'} "${itemToDelete.name}"? Esta ação não pode ser desfeita.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopUp;