import styles from "./styles.module.css";
import { useState } from "react";
import { ArrowIcon } from "../../components/ArrowIcon";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";
import { users } from "../../models/users";
import { validateEmail } from "../../utils/regex";
import { useNavigate } from "react-router-dom";

export function Recovery() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const navigate = useNavigate();

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (let user of users) {
      if (email === "" || !validateEmail.test(email)) {
        setEmailErr(true);
        setMessageError("Digite um email válido");
        setTimeout(() => {
          setEmailErr(false);
          setEmail("");
        }, 1000)
        return true;
      } 

      if (email !== user.email) {
        setEmailErr(true);
        setMessageError("Email não cadastrado");
        setTimeout(() => {
          setEmailErr(false);
          setEmail("");
        }, 1000)
        return false;
      }

      setEmailSend(true);
      setTimeout(() => {
        navigate('/login');
      }, 1300)
      return true;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form>
          {emailSend && 
            <div className={styles.send}>Email Enviado</div>
          }
          <div>
            <ArrowIcon />
          </div>
          <fieldset>
            <div className={styles.fieldsetWrapper}>
              <legend>Recuperar senha</legend>
              <div className={styles.inputWrapper}>
                <label>Digite o endereço de e-mail de acesso na Imã Pay</label>
                <input
                  type="email"
                  name="form-email"
                  id="form-email"
                  placeholder="Digite seu e-mail"
                  onChange={handleInputEmail}
                  value={email}
                />
                {emailErr && <Error msg={`${messageError}`} />}
              </div>
            </div>
          </fieldset>
          <Button action={handleClick} txt="Enviar" />
        </form>
      </div>
    </>
  );
}
