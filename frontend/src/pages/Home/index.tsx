import { NavbarHome } from "../../components/NavbarHome";
import BusinessImg from '../../assets/business-ima.svg';
import styles from './styles.module.css';
import { Button } from "../../components/Button";
import { ModalHome } from "../../components/ModalHome";
import { useState } from "react";

export function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <NavbarHome />
            <main>
                <section className={styles.home}>
                    <div className={styles.homeText}>
                    <h4 className={styles.textH4}>Bem-vindos a Imã Pay 🎉</h4>
                    <h1 className={styles.textH1}>Descomplicado e fácil de investir</h1>
                    <p>Na Imã Pay seus investimentos são planejados com especialistas.</p>
                    <Button action={() => setIsModalOpen(true)} txt='Investir agora' />
                    </div>
                    <div className={styles.homeImg}>
                    <img
                        src={BusinessImg}
                        alt="Duas pessoas demonstrando um gráfico de investimento."
                    />
                    </div>
                </section>
                <ModalHome isOpen={isModalOpen} closeModal={() => {setIsModalOpen(!isModalOpen)}} />
            </main>
        </>
    );
}