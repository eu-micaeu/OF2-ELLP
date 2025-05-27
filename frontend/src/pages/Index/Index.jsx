import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./Index.module.css";

function Index() {

    return (

        <>

            <Header />

            <img src="/Background.png" alt="background" className={styles.background} />

            <div className={styles.section}>

                <h1 className={styles.title}>Ações principais<hr></hr></h1>

                <div className={styles.containerCard}>

                    <div className={styles.card}>

                        <img src="/card1.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Cadastrar Monitor</h1>

                    </div>

                    <div className={styles.card}>

                        <img src="/card2.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Registrar Presença</h1>

                    </div>

                    <div className={styles.card}>

                        <img src="/card3.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Emitir Relatórios</h1>

                    </div>

                </div>

            </div>

            <div className={styles.section}>

                <h1 className={styles.title}>Outras ações</h1>

                <div className={styles.containerCard}>

                    <div className={styles.card}>

                        <img src="/card4.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Visualizar alunos</h1>

                    </div>

                    <div className={styles.card}>

                        <img src="/card5.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Visualizar Oficinas</h1>

                    </div>

                    <div className={styles.card} onClick={() => window.open("https://grupoellp.com.br", "_blank")}>

                        <img src="/card6.png" alt="icon" className={styles.icon} />

                        <h1 className={styles.titleCard}>Visite nosso site</h1>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );
}

export default Index;