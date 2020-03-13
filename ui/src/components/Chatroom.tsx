import React, { FC, useState } from 'react';
import styled from 'styled-components';

const ChatWrapper = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
  color: #333;
`

const Output = styled.div`
  height: 95vh;
`

const ChatInput = styled.input`
  border: 1px solid black;
  padding: .5em;
  height: 5vh;
  width: 100%;
`

interface IChatroom {
  messages: string[];
  socket: SocketIOClient.Socket;
}

const Chatroom: FC<IChatroom> = ({messages, socket}): JSX.Element => {
  const [msg, setMsg] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      console.log('test')
      socket.emit('message', msg);
      setMsg('');
    }
  }
  return (
    <ChatWrapper>
      <Output>
      {messages.map(x => {
        return <div>{x}</div>
      })}
      </Output>
      <ChatInput onKeyPress={handleKeyPress} value={msg} onChange={e => setMsg(e.target.value)} />
    </ChatWrapper>
  )
}

export default Chatroom;
