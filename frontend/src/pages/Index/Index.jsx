import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createWorkshop, getAllWorkshop, getAllStudent, deleteWorkshop, getClassById,getWorkshopById, getAllClasses } from "../../utils/api"; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { toast } from "react-toastify";
import Typography from '@mui/material/Typography';
import styles from "./Index.module.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';

function Index() {
    const [showPopup, setShowPopup] = useState(null); 
    const [workshops, setWorkshops] = useState([]); 
    const [students, setStudents] = useState([]);
    const [newWorkshop, setNewWorkshop] = useState({ name: "", start_date: "", end_date: "", academic_load: "" }); 
    const [deleteId, setDeleteId] = useState(""); 
    const [classNames, setClassNames] = useState([]);
    const [setSelectedWorkshop, setWorkshopNames] = useState({});

    const handleCreateWorkshop = async () => {
        try {
            const response = await createWorkshop(newWorkshop);
            toast.success("Oficina criada com sucesso!");
            setShowPopup(null); 
        } catch (error) {
            toast.error(`Erro ao criar oficina: ${error.message}`);
            setShowPopup(null);
        }
    };

    const handleListWorkshops = async () => {
        try {
            const workshops = await getAllWorkshop();
            setWorkshops(workshops); 
            setShowPopup("listWorkshops"); 
        } catch (error) {
            toast.error(`Erro ao listar oficinas: ${error.message}`);
            setShowPopup(null);
        }
    };

    const handleListStudents = async () => {
        try {
            const students = await getAllStudent();
            setStudents(students); 
            setShowPopup("listStudents");
        } catch (error) {
            toast.error(`Erro ao listar oficinas: ${error.message}`);
            setShowPopup(null);
        }
    };

     const handleGetById = async (id) => {
        try {
            const classe = await getClassById(id);
            setClassNames(prev => ({ ...prev, [id]: classe.code }));

        } catch (error) {
        console.error('Erro ao buscar classe por ID:', error);
        }
    };

    const handleGetWorkshopById = async (id) => {
        try {
            const classe = await getClassById(id);
            setClassNames(prev => ({ ...prev, [id]: classe.code }));

            const workshop = await getWorkshopById(classe.workshop_id);

            setWorkshopNames(prev => ({ ...prev, [id]: workshop.name }));
            setSelectedWorkshop(workshop);

            return workshop; // <-- esse retorno é importante para outras partes do código
        } catch (error) {
            console.error('Erro ao buscar workshop por ID:', error);
            return null;
        }
    };


    useEffect(() => {
    students.forEach((student) => {
        if (!classNames[student.class_id]) {
        handleGetById(student.class_id);
        }
    });
    }, [students]);



    const generateStudentReportPdf = async (student) => {
        const classId = student.class_id;

        try {
            const classe = await getClassById(classId);
            const workshop = await getWorkshopById(classe.workshop_id);

            const today = new Date();
            const formattedDate = new Intl.DateTimeFormat('pt-BR').format(today);
            const fileName = `${student.name.replace(/\s+/g, '-')}-relatorio-${formattedDate.replace(/\//g, '_')}.pdf`;

            const content = `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h1>Relatório de Aluno</h1>
                    <p><strong>Nome:</strong> ${student.name}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <h2 style="color: #555;">Dados da Oficina e Turma</h2>
                    <p><strong>Oficina:</strong> ${workshop.name}</p>

                    <p><strong>Turma:</strong> ${classe.code}</p>
                    <p><strong>Total de Aulas:</strong> ${classe.number_of_classes}</p>
                    <p><strong>Aulas Frequentadas:</strong> ${student.classes_gone}</p>
                                        <p><strong>Frequência:</strong> ${
                        classe.number_of_classes === 0
                            ? '0%'
                            : `${((student.classes_gone / classe.number_of_classes) * 100).toFixed(1)}%`
                        }</p>
                    <p style="margin-top: 40px;">Relatório gerado em: ${formattedDate}</p>
                </div>
            `;

            const opt = {
                margin: 1,
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(content).save();
            toast.success('Relatório gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            toast.error('Erro ao gerar relatório PDF.');
        }
    };


    const handleDeleteWorkshop = async () => {
        try {
            await deleteWorkshop(deleteId);
            toast.success("Oficina deletada com sucesso!");
            setShowPopup(null);
            handleListWorkshops();
        } catch (error) {
            toast.error(`Erro ao deletar oficina: ${error.message}`);
            setShowPopup(null);
        }
    };



    const handleListClasses = async () => {
        try {
            const classes = await getAllClasses();
            setClassNames(classes.map((cls) => cls.code));
            setShowPopup("listClasses");
        } catch (error) {
            toast.error(`Erro ao listar turmas: ${error.message}`);
        }
    };


    return (
        <>
            <Header />

            <img src="/Background.png" alt="background" className={styles.background} />

            <div className={styles.section}>
                <h1 className={styles.title}>Ações para as Oficinas<hr></hr></h1>

                <div className={styles.containerCard}>
                    <div className={styles.card} onClick={() => setShowPopup("create")}>
                        <img src="/card1.png" alt="icon" className={styles.icon} />
                        <h1 className={styles.titleCard}>Cadastrar Oficinas</h1>
                    </div>

                    <div className={styles.card} onClick={() => { handleListWorkshops(); setShowPopup("listWorkshops"); }}>
                        <img src="/card2.png" alt="icon" className={styles.icon} />
                        <h1 className={styles.titleCard}>Listar Oficinas</h1>
                    </div>

                    <div className={styles.card} onClick={() => { handleListStudents(); setShowPopup("listStudents"); }}>
                        <img src="/card3.png" alt="" className={styles.icon}/>
                        <h1 className={styles.titleCard}>Listar Alunos</h1>
                    </div>

                    <div className={styles.card} onClick={() => { handleListClasses(); setShowPopup("listClasses"); }}>
                        <img src="/card4.png" alt="" className={styles.icon}/>
                        <h1 className={styles.titleCard}>Listar Turmas</h1>
                    </div>

                </div>
            </div>

            {/* Dialog para criar oficina */}
            <Dialog open={showPopup === "create"} onClose={() => setShowPopup(null)}>
                <DialogTitle>Cadastrar Oficina</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome da oficina"
                        fullWidth
                        margin="dense"
                        value={newWorkshop.name}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, name: e.target.value })}
                    />
                    <TextField
                        label="Data de início"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={newWorkshop.start_date}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, start_date: e.target.value })}
                    />
                    <TextField
                        label="Data de término"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={newWorkshop.end_date}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, end_date: e.target.value })}
                    />
                    <TextField
                        label="Carga horária"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={newWorkshop.academic_load}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, academic_load: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateWorkshop} color="primary">Cadastrar</Button>
                    <Button onClick={() => setShowPopup(null)} color="secondary">Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para listar oficinas */}
            <Dialog open={showPopup === "listWorkshops"} onClose={() => setShowPopup(null)}>
 
                <DialogTitle>Lista de Oficinas</DialogTitle>
                <DialogContent>
                    <List>
                        {workshops.map((workshop) => (
                            <ListItem
                                key={workshop.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            setDeleteId(workshop.id);
                                            setShowPopup("confirmDelete");
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={workshop.name} secondary={workshop.academic_load + " Horas"} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(null)} color="secondary">Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para listar estudantes */}
            <Dialog open={showPopup === "listStudents"} onClose={() => setShowPopup(null)} fullWidth maxWidth="md">
                <DialogTitle>Lista Alunos</DialogTitle>
                <DialogContent>
                    <List>
                        {students.map((student) => (
                            <ListItem
                                key={student.id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            setDeleteId(student.id);
                                            setShowPopup("confirmDelete");
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <>
                                        {student.name}
                                        <Typography variant="body2" color="textSecondary">
                                            {student.email} • {student.phone}
                                        </Typography>
                                        </>
                                    }
                                    secondary={
                                        <>
                                        {student.classes_gone} Horas
                                        <Typography variant="body2" color="textSecondary">
                                            {`Classe: ${classNames[student.class_id] || 'Carregando...'}`}
                                        </Typography>
                                         <Button
                                            title="Gerar Relatório"
                                            variant="outlined"
                                            size="small"
                                            onClick={() => generateStudentReportPdf(student)}
                                            >
                                            <PictureAsPdfIcon fontSize="small" />
                                        </Button> 
                                        </>
                                    }
                                    />
                                
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(null)} color="secondary">Fechar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showPopup === "listClasses"} onClose={() => setShowPopup(null)} fullWidth maxWidth="sm">
                <DialogTitle>Listar Turmas</DialogTitle>
                <DialogContent className={styles.listaClass}>
                    {classNames && <List>
                        {classNames?.map((className) => (
                            <ListItem key={className} className={styles.itemListaClass}>
                                <ListItemText primary={className} />
                            </ListItem>
                        ))}
                    </List>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPopup(null)} color="secondary">Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para confirmar exclusão */}
            <Dialog open={showPopup === "confirmDelete"} onClose={() => setShowPopup(null)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <p>Tem certeza de que deseja excluir esta oficina?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteWorkshop} color="primary">Confirmar</Button>
                    <Button onClick={() => setShowPopup(null)} color="secondary">Cancelar</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}

export default Index;