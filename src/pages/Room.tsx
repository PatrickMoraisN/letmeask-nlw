import React from "react";
import imgLogo from "../assets/images/logo.svg";
import Button from "../components/Button";

const Room = () => {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="letmeask" />
          <div>codigo</div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala react</h1>
          <span>4 perguntas</span>
        </div>

        <form >
          <textarea
            placeholder="Pergunte algo!"
          />

          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>Faca seu login</button></span>
            <Button type="submit">Envia pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
