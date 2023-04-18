import { useRef, useState } from "react";
import { ArrowIcon } from "../../components/ArrowIcon";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Error } from "../../components/Error";
import { users } from "../../models/users";
import { validateLogin } from "../../utils/validateLogin";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { cpfMask } from "../../utils/cpf";

export function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateLogin(cpf, password);

    if (validationError) {
      setLoginError(true);
      setErrorMessage(validationError);
      setTimeout(() => {
        setLoginError(false);
        setCpf("");
      }, 1000);
      return;
    }

    let userFound = false;
    for (let user of users) {
      if (user.cpf === cpf && user.password === password) {
        userFound = true;
        navigate(`/transfers/${user.id}`, { state: { user } });
        break;
      }
    }

    if (!userFound) {
      setLoginError(true);
      setErrorMessage("CPF ou senha inválidos");
      setTimeout(() => {
        setLoginError(false);
      }, 1000);
      return;
    }
  };

  const toggleShow = () => {
    if (inputRef.current) {
      if (inputRef.current.type === "password") {
        setSeePassword(true);
        inputRef.current.type = "text";
      } else {
        setSeePassword(false);
        inputRef.current.type = "password";
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form>
          <div className={styles.fieldsetWrapper}>
            <div className={styles.title}>
              <ArrowIcon />
              <legend>Acessar conta</legend>
            </div>
            {loginError && <Error msg={`${errorMessage}`} />}
            <div className={styles.inputWrapper}>
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                placeholder="Digite seu CPF"
                onChange={(e) => setCpf(cpfMask(e.target.value))}
                value={cpf}
              />
            </div>

            <div className={`${styles.inputWrapper} ${styles.inputPass}`}>
              <label>Senha</label>
              <input
                ref={inputRef}
                type="password"
                name="form-password"
                id="form-password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className={styles.iconArea}
                onClick={toggleShow}
              >
                {seePassword ? (
                  <BsEyeFill className={styles.eye} />
                ) : (
                  <BsEyeSlashFill className={styles.eye} />
                )}
              </button>
            </div>
          </div>
          <Button action={handleSubmit} txt="Entrar" />
          <div className={styles.linkArea}>
            <Link className={styles.link} to="/recovery">
              Esqueci minha senha
            </Link>
            <Link className={styles.link} to="/register">
              Ainda não sou cliente
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
