import styles from "./styles.module.css";
import InvestImg from "../../assets/invest.svg";
import LogoImaPay from "../../assets/logo-ima.webp";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export function ModalHome({ isOpen, closeModal }: Props) {
  if (isOpen) {
    return (
      <div className={styles.modalInit}>
        <div className={styles.modal}>
          <div className={styles.container}>
            <button onClick={closeModal} className={styles.btn}>
              Fechar
            </button>
            <div className={styles.content}>
              <img
                className={styles.imgModal}
                src={InvestImg}
                alt="Imagem de pessoa regando planta, mas os frutos são moedas."
              />
              <div className={styles.group}>
                <img src={LogoImaPay} alt="Logo" className={styles.logo} />
                <ul className={styles.groupBtn}>
                  <li className={styles.navItemOpen}>
                    <Link to="/register">Abrir conta</Link>
                  </li>
                  <li className={styles.navItemEnter}>
                    <Link to="/login">Já sou cliente</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.text}>
            <h3>Crie uma conta em minutos.</h3>
            <p>
              Com a Imã Pay, você pode criar sua conta em minutos. Não é
              necessário visitar uma agência ou esperar dias.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
