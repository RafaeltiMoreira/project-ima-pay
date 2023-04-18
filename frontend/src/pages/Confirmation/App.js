import React from "react";
import "./App.css";
import logo from "./assets/logo.webp";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsShare } from "react-icons/bs";

const App = () => {
  const messageSuccess = "Transferência realizada com sucesso";
  let valuePayed = "xxxx";
  let type = "Pix";
  const originData = "Dados de origem";
  const receiverData = "Dados de destino";
  let idTransaction = "HAJD2873HHG89LLvaew";

  return (
    <div>
      <div className="logo">
        <img id="logo" src={logo} alt="logo Ima Pay" />
      </div>

      <div className="container">
        <div className="success">
          {messageSuccess} <AiFillCheckCircle className="successIcon" />{" "}
        </div>
        <p id="originData">{originData}</p>
        <p id="receiverData">{receiverData}</p>

        <button className="share">
          {" "}
          <BsShare className="shareIcon" /> Enviar
          <br />
          comprovante
        </button>

        <div className="originBox">
          <p id="originName">Nome</p>
          <p id="originId">CPF</p>
          <p id="originAgency">Nº da agência</p>
          <p id="originAccount">Nº da conta</p>
          <p id="originValue">Valor enviado</p>
          <p id="originBank">Instituição</p>
        </div>

        <div className="receiverBox">
          <p id="receiverName">Nome</p>
          <p id="receiverId">CPF</p>
          <p id="receiverBank">Instituição</p>
          <p id="receiverValue">Valor recebido</p>
          <p id="receiverMsg">Mensagem</p>
        </div>
      </div>
    </div>
  );
};

export default App;
