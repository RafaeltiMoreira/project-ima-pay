import { NavbarHome } from "../../components/NavbarHome";
import AnimeImg from "../../assets/business-animate.svg";
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
                        <h1 className={styles.textH1}>Descomplicado e fácil de usar</h1>
                        <p>Na Imã Pay você controla seus gastos e lucros de forma rápida e simples.</p>
                        <Button action={() => setIsModalOpen(true)} txt='Saiba mais' />
                    </div>
                    <div className={styles.homeImg}>
                        <img
                            src={AnimeImg}
                            alt="Duas pessoas demonstrando um gráfico de investimento."
                        />
                    </div>
                </section>
                <ModalHome isOpen={isModalOpen} closeModal={() => { setIsModalOpen(!isModalOpen) }} />
            </main>
        </>
    );
}