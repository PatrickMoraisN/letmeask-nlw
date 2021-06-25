import React from "react";
import imgLogo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { useParams } from 'react-router-dom';
import RoomCode from "../components/RoomCode";
import '../styles/room.scss'
import '../styles/question.scss'
import Question from "../components/Question";
import useRoom from "../hooks/useRoom";

type RoomParams = {
  id: string,
}

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
