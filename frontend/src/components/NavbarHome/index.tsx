import LogoIma from '../../assets/logo-ima.webp';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom'

export function NavbarHome() {
    return (
        <>
            <header className={styles.navigation}>
                <div className={styles.logo}>
                    <img src={LogoIma} alt="Logo Imã" />
                </div>
                <nav>
                    <ul className={styles.navMenu}>
                        <li className={styles.navItemEntrar}>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li className={styles.navItemConta}>
                            <NavLink to="/register">Abrir conta</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.menu}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
            </header>
        </>
    );
}