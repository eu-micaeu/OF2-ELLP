import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box, List, ListItem, ListItemText, TextField, Typography, Divider
} from '@mui/material';
import { getAllWorkshop, getAllClass, getAllStudent, createClass, createStudent, updateStudent } from '../../utils/api';
import html2pdf from 'html2pdf.js'; // Import the library

function PopUp({ onClose }) {
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

    // Carregar oficinas
    useEffect(() => {
        const fetchWorkshops = async () => {
            setLoadingWorkshops(true);
            try {
                const data = await getAllWorkshop();
                setWorkshops(data);
            } catch (err) {
                alert(`Erro ao buscar oficinas: ${err.message}`);
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
            alert(`Erro ao buscar turmas: ${err.message}`);
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
            alert(`Erro ao buscar alunos: ${err.message}`);
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
            alert('Preencha todos os campos da turma.');
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
            alert('Turma criada com sucesso!');
        } catch (err) {
            alert(`Erro ao criar turma: ${err.message}`);
        }
    };

    const handleCreateStudent = async () => {
        if (!newStudentName.trim() || !newStudentEmail.trim() || !newStudentPhone.trim()) {
            alert('Preencha todos os campos do aluno.');
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
            alert('Aluno criado com sucesso!');
        } catch (err) {
            alert(`Erro ao criar aluno: ${err.message}`);
        }
    };

    const handleIncrementClassesGone = async (student) => {
        try {
            await updateStudent(student.id, { classes_gone: student.classes_gone + 1 });
            await fetchStudents(selectedClass.id);
        } catch (err) {
            alert(`Erro ao atualizar aulas frequentadas: ${err.message}`);
        }
    };

    const handleDecrementClassesGone = async (student) => {
        if (student.classes_gone > 0) {
            try {
                await updateStudent(student.id, { classes_gone: student.classes_gone - 1 });
                await fetchStudents(selectedClass.id);
            } catch (err) {
                alert(`Erro ao atualizar aulas frequentadas: ${err.message}`);
            }
        } else {
            alert('Aluno já está com 0 aulas.');
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

    // --- PDF Generation Function ---
    const generateStudentReportPdf = async (student) => {
        if (!selectedWorkshop || !selectedClass) {
            alert('Por favor, selecione uma oficina e uma turma antes de gerar o relatório.');
            return;
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
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
            margin: 1,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(opt).from(content).save();
            alert(`Relatório para ${student.name} gerado com sucesso!`);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Erro ao gerar o relatório PDF. Tente novamente.");
        }
    };
    // --- End PDF Generation Function ---

    return (
        <Dialog open onClose={() => onClose(false)} fullWidth maxWidth="md">
            <DialogTitle>Visualizar Hierarquia</DialogTitle>
            <DialogContent dividers>

                {/* Oficinas */}
                <Typography variant="h6">Oficinas</Typography>
                {loadingWorkshops ? renderLoading() : (
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
                                            >
                                                <ListItemText primary={cls.code} secondary={`Aulas: ${cls.number_of_classes}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Não há turmas nesta oficina.
                                    </Typography>
                                )}
                            </>
                        )}
                        <Button variant="outlined" onClick={() => setShowCreateClassForm(true)} sx={{ mt: 1 }}>
                            Criar Turma
                        </Button>

                        {showCreateClassForm && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="Código da Turma"
                                    value={newClassCode}
                                    onChange={(e) => setNewClassCode(e.target.value)}
                                    fullWidth sx={{ mb: 1 }}
                                />
                                <TextField
                                    label="Quantidade de Aulas"
                                    type="number"
                                    value={newClassNumberOfClasses}
                                    onChange={(e) => setNewClassNumberOfClasses(e.target.value)}
                                    fullWidth sx={{ mb: 1 }}
                                />
                                <Button variant="contained" onClick={handleCreateClass}>Salvar</Button>
                                <Button variant="text" color="secondary" onClick={() => setShowCreateClassForm(false)} sx={{ ml: 2 }}>Cancelar</Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Selecione uma oficina.
                    </Typography>
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
                                            <ListItem
                                                key={student.id}
                                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}
                                            >
                                                <Box sx={{ flexGrow: 1, minWidth: '200px' }}> {/* Adjust minWidth as needed */}
                                                    <ListItemText
                                                        primary={student.name}
                                                        secondary={
                                                            <>
                                                                {`${student.email} | ${student.phone} | Aulas: ${student.classes_gone} | Frequência: ${getAttendancePercentage(student)}`}
                                                            </>
                                                        }
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}> {/* Added responsive margin-top */}
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="success"
                                                        onClick={() => handleIncrementClassesGone(student)}
                                                    >
                                                        +1 Aula
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDecrementClassesGone(student)}
                                                    >
                                                        -1 Aula
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => generateStudentReportPdf(student)}
                                                    >
                                                        Gerar Relatório
                                                    </Button>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Nenhum aluno nesta turma.
                                    </Typography>
                                )}
                            </>
                        )}
                        <Button variant="outlined" onClick={() => setShowCreateStudentForm(true)} sx={{ mt: 1 }}>
                            Criar Aluno
                        </Button>

                        {showCreateStudentForm && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="Nome"
                                    value={newStudentName}
                                    onChange={(e) => setNewStudentName(e.target.value)}
                                    fullWidth sx={{ mb: 1 }}
                                />
                                <TextField
                                    label="Email"
                                    value={newStudentEmail}
                                    onChange={(e) => setNewStudentEmail(e.target.value)}
                                    fullWidth sx={{ mb: 1 }}
                                />
                                <TextField
                                    label="Telefone"
                                    value={newStudentPhone}
                                    onChange={(e) => setNewStudentPhone(e.target.value)}
                                    fullWidth sx={{ mb: 1 }}
                                />
                                <Button variant="contained" onClick={handleCreateStudent}>Salvar</Button>
                                <Button variant="text" color="secondary" onClick={() => setShowCreateStudentForm(false)} sx={{ ml: 2 }}>Cancelar</Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Selecione uma turma.
                    </Typography>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="secondary">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopUp;