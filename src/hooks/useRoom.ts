import React, { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { database } from '../services/firebase';

type Questions = {
  id: string,
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}>

const useRoom = (roomId: string) => {

  const [questions, setQuestions] = React.useState<Questions[]>([])
  const [title, setTitle] = React.useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
    })
  }, [roomId])

  return {questions, title};
}

export default useRoom
