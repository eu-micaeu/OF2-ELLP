import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createWorkshop, getAllWorkshop, deleteWorkshop } from "../../utils/api"; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 

import styles from "./Index.module.css";

function Index() {
    const [showPopup, setShowPopup] = useState(null); 
    const [workshops, setWorkshops] = useState([]); 
    const [newWorkshop, setNewWorkshop] = useState({ name: "", description: "" }); 
    const [deleteId, setDeleteId] = useState(""); 

    const handleCreateWorkshop = async () => {
        try {
            const response = await createWorkshop(newWorkshop);
            alert(`Oficina criada com sucesso: ${response.name}`);
            setShowPopup(null); 
        } catch (error) {
            alert(error.message);
        }
    };

    const handleListWorkshops = async () => {
        try {
            const workshops = await getAllWorkshop();
            setWorkshops(workshops); 
            setShowPopup("list"); 
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteWorkshop = async () => {
        try {
            await deleteWorkshop(deleteId);
            alert("Oficina deletada com sucesso!");
            setShowPopup(null);
            handleListWorkshops();
        } catch (error) {
            alert(error.message);
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
                        label="Descrição da oficina"
                        fullWidth
                        margin="dense"
                        multiline
                        rows={4}
                        value={newWorkshop.description}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
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
                                <ListItemText primary={workshop.name} secondary={workshop.description} />
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