import React from 'react'
import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';


type RoomCodeType = {
  code: string,
}
const RoomCode = (props: RoomCodeType) => {

  function copyRoomCode() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="Copy Room Code" />
      </div>
      <span>Sala: #{props.code}</span>
    </button>
  )
}

export default RoomCode
