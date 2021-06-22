import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import Button from '../components/Button';


const Home = () => {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas do seu público em tempo real!</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo da aplicação" />
          <button className="create-room">
            <img src={googleIcon} alt="Logo do google" />
            <span>Cria sua sala com o google</span>
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input
              type="text"
              placeholder="Código da sala"
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
