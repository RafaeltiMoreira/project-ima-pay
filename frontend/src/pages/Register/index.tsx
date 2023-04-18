import styles from "./styles.module.css";
import { ArrowIcon } from "../../components/ArrowIcon";
import { Button } from "../../components/Button";
import Invest from "../../assets/invest.svg";
import { useState } from "react";
import { Error } from "../../components/Error";
import { validateEmail, validatePassword } from "../../utils/regex";
import { cpfMask } from "../../utils/cpf";
import { phoneMask } from "../../utils/phone";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { ModalTerms } from "../../components/ModalTerms";

export function Register() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const [success, setSucces] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [idCounter, setIdCounter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid =
    cpf !== "" &&
    name !== "" &&
    celular !== "" &&
    email !== "" &&
    password !== "";

  const isEmailValid = validateEmail.test(email);
  const isPasswordValid = validatePassword.test(password);
                                      
  const inputValid = () => {
    if (!isFormValid) {
      setRegisterError(true);
      setErrorMessage("Preencha todos os campos!");
      setTimeout(() => {
        setRegisterError(false);
      }, 1000);
      return false;
    }

    if (!isEmailValid) {
      setRegisterError(true);
      setErrorMessage("Digite um email válido!");
      setTimeout(() => {
        setRegisterError(false);
      }, 1000);
      return false;
    }

    if (!isPasswordValid) {
      setRegisterError(true);
      setErrorMessage("Digite uma senha forte!");
      setTimeout(() => {
        setRegisterError(false);
      }, 1000);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = inputValid();

    let isFormFilled = name && email && password && celular && cpf;

    if (isValid && isChecked) {
      const newUser: User = {
        id: idCounter,
        name,
        email,
        password,
        celular,
        cpf,
      };
      setIdCounter(idCounter + 1);
      setUsers([...users, newUser]);

      setSucces(true);
      setTimeout(() => {
        navigate("/login");
        setSucces(false);
      }, 1300);
      return true;
    } else if(!isChecked && isFormFilled) {
      setRegisterError(true);
      setErrorMessage("Por favor, concorde com os termos");
      setTimeout(() => {
        setRegisterError(false);
      }, 1000);
      return false;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} id="form">
          <div className={styles.leftSide}>
            <div className={styles.imgArea}>
              <ArrowIcon />
              <legend>Abra agora sua Conta Digital</legend>
            </div>
            <img src={Invest} alt="Invest" />
          </div>
          <div className={styles.rightSide}>
            {success && (
              <div className={styles.success}>Conta criada com sucesso!</div>
            )}
            {registerError && <Error msg={`${errorMessage}`} />}
            <div className={styles.inputWrapper}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                onChange={e => setCpf(cpfMask(e.target.value))}
                value={cpf}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={e => setName(e.target.value)}
                value={name}
                minLength={3}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="cel">Celular</label>
              <input
                type="tel"
                name="cel"
                id="cel"
                onChange={e => setCelular(phoneMask(e.target.value))}
                value={celular}
                maxLength={15}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Digite uma senha forte"
              />
            </div>
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="checkbox1" 
                checked={isChecked} 
                onChange={e => setIsChecked(e.target.checked)}
              />
              <div className={styles.terms}>
                <span>Li e concordo com os</span>
                <button type="button" onClick={() => setIsModalOpen(true)} className={styles.btn}>
                   Termos de Serviço
                </button>
              </div>
            </div>
            <ModalTerms isOpen={isModalOpen} closeModal={() => {setIsModalOpen(!isModalOpen)}}/>
            <Button size="400" action={handleSubmit} txt="Enviar" />
          </div>
        </form>
      </div>
    </>
  );
}
