import Header from "../../components/Header/Header";
import styles from "./Index.module.css";

function Index() {
    return (
        <div>
            <Header />
            <img src="/Background.png" alt="background" className={styles.background}/>
        </div>
    );
}

export default Index;