import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createWorkshop, getAllWorkshop, deleteWorkshop } from "../../utils/api"; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { toast } from "react-toastify";

import styles from "./Index.module.css";

function Index() {
    const [showPopup, setShowPopup] = useState(null); 
    const [workshops, setWorkshops] = useState([]); 
    const [newWorkshop, setNewWorkshop] = useState({ name: "", start_date: "", end_date: "", academic_load: "" }); 
    const [deleteId, setDeleteId] = useState(""); 

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
            setShowPopup("list"); 
        } catch (error) {
            toast.error(`Erro ao listar oficinas: ${error.message}`);
            setShowPopup(null);
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

                    <div className={styles.card} onClick={handleListWorkshops}>
                        <img src="/card2.png" alt="icon" className={styles.icon} />
                        <h1 className={styles.titleCard}>Listar Oficinas</h1>
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
            <Dialog open={showPopup === "list"} onClose={() => setShowPopup(null)}>
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