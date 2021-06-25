import React, { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type Questions = {
  id: string,
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
  likeCount: number,
  likeId: string | undefined,
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likes: Record<string, {
    authorId: string,
  }>,
}>

const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [questions, setQuestions] = React.useState<Questions[]>([])
  const [title, setTitle] = React.useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    const unsubscribeRoomListener = roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key,like])=> like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return {questions, title};
}

export default useRoom
