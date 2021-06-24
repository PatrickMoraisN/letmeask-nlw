import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import '../styles/auth.scss'
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import dark from '../services/dark';


const Home = () => {
  const [toggled, setToggled] = React.useState(false);
  const handleClick = () => {
      setToggled((s) => {
        dark(!s)
        return !s;
      });
  };

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
          <form action="">
            <input
              type="text"
              placeholder="Nome da sala"
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
