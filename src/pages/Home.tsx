import React, { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import dark from '../services/dark';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';



const Home = () => {
  const [toggled, setToggled] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState('');
  const handleClick = () => {
      setToggled((s) => {
        dark(!s)
        return !s;
      });
  };

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return 
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Sala nao existe')
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
       <Toggle toggled={ toggled } onClick={handleClick} />
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas do seu público em tempo real!</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo da aplicação" className="logo"/>
          <button className="create-room" onClick={ handleCreateRoom }>
            <img src={googleIcon} alt="Logo do google" />
            <span>Cria sua sala com o google</span>
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input
              type="text"
              placeholder="Código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;
