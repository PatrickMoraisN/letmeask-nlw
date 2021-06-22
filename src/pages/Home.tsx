import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg'

const Home = () => {
  return (
    <div>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas do seu público em tempo real!</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="Logo da aplicação" />
          <button>
            <img src={googleIcon} alt="Logo do google" />
            Cria sua sala com o google
          </button>
          <div>ou entre em uma sala</div>
          <form action="">
            <input
              type="text"
              placeholder="Código da sala"
            />
            <button type="submit">
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;
