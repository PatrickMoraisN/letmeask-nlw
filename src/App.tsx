import Home from "./pages/Home";
import { createContext } from "react";
import NewRoom from "./pages/NewRoom";

import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import { auth, firebase } from "./services/firebase";

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

export const AuthContext = createContext({} as AuthContextType);
function App() {
  const [user, setUser] = React.useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing Informations from Google");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
