import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import '../styles/auth.scss'
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import dark from '../services/dark';
import { useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


const Home = () => {
  const [toggled, setToggled] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState('');
  const history = useHistory();
  const handleClick = () => {
      setToggled((s) => {
        dark(!s)
        return !s;
      });
  };

  const { user } = useAuth();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <img src={logoImg} alt="Logo da aplicação" />
          <h2>Criar uma nova sala</h2>
          <h1>{user?.name}</h1>
          <form onSubmit={ handleCreateRoom }>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Home;
