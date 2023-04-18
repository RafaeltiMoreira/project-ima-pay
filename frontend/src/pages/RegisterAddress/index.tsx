import styles from "./styles.module.css";
import Invest from "../../assets/invest.svg";
import { Error } from "../../components/Error";
import { useState } from "react";
import { Button } from "../../components/Button";

export function RegisterAddress() {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [success, setSucces] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    cep !== "" && rua !== "" && numero !== "" && bairro !== "";
    cidade !== "";
    estado !== "";

  const inputValid = () => {
    if (!isFormValid) {
      setRegisterError(true);
      setErrorMessage("Preencha todos os campos!");
      setTimeout(() => {
        setRegisterError(false);
      }, 1000);
      return false;
    }
    return true;
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, "");
    setCep(cepValue);
    if (cepValue.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepValue}/json/`
        );
        const data = await response.json();
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
      } catch (error) {
        console.error(error);
      }
    } else {
      setRua("");
      setBairro("");
      setCidade("");
      setEstado("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = inputValid();

    if (isValid) {

    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} id="form">
          <div className={styles.leftSide}>
            <div className={styles.imgArea}>
              <legend>Confirme seu endereço</legend>
            </div>
            <img src={Invest} alt="Invest" />
          </div>
          <div className={styles.rightSide}>
            {success && (
              <div className={styles.success}>Conta criada com sucesso!</div>
            )}
            {registerError && <Error msg={`${errorMessage}`} />}
            <div className={styles.inputWrapper}>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                id="cep"
                onChange={handleCepChange}
                value={cep}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">Rua</label>
              <input
                type="text"
                name="rua"
                id="rua"
                onChange={(e) => setRua(e.target.value)}
                value={rua}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="numero">Numero</label>
              <input
                type="text"
                name="numero"
                id="numero"
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Bairro</label>
              <input
                type="text"
                name="bairro"
                id="bairro"
                onChange={(e) => setBairro(e.target.value)}
                value={bairro}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                name="cidade"
                id="cidade"
                onChange={(e) => setCidade(e.target.value)}
                value={cidade}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                name="estado"
                id="estado"
                onChange={handleCepChange}
                value={estado}
              />
            </div>
            <Button size="400" action={handleSubmit} txt="Enviar" />
          </div>
        </form>
      </div>
    </>
  );
}
