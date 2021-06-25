import '../styles/question.scss';
import { ReactNode } from 'react';

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  },
  children?: ReactNode,
  isAnswered?: boolean,
  isHighlighted?: boolean,
}
const Question = ({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) => {
  return (
    <div className={`questions ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlight' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question
