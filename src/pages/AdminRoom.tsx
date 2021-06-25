import React from "react";
import imgLogo from "../assets/images/logo.svg";
import Button from "../components/Button";
import { useParams, useHistory } from 'react-router-dom';
import RoomCode from "../components/RoomCode";
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss'
import '../styles/question.scss'
import Question from "../components/Question";
import useRoom from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string,
}

const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="delete"/>
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
