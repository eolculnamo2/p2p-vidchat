import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import WebCam from 'react-webcam';
import io from 'socket.io-client'; 
import Chatroom from './Chatroom';

const socket = io('http://localhost:8080');
const FPS = 30;


const Cam: FC = (): JSX.Element => {
  const [audioOn, setAudioOn] = useState<boolean>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState<string>('');
  const webcamRef = useRef(null);

  socket.on('frame', (data: string) => {
    setCurrentFrame(data);
  })

  socket.on('message', (data: string) => {
    setMessages([...messages, data]);
  })

  const beginStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
 
    let recorder = new MediaRecorder(stream);
    let data:any = [];
    
    recorder.ondataavailable = event => {
      data.push(event.data);
      console.log(data);
    }
    recorder.start();

    setTimeout(() => {
      recorder.stop();
    }, 200);
    console.log('test')
  

    // send base64 image to websocket
    setInterval(() => {
        // @ts-ignore
        if (webcamRef?.current?.getScreenshot) {
          // @ts-ignore
          const img = webcamRef.current.getScreenshot();
          //console.log(webcamRef.current)
          socket.emit('frame', img);
        }
    }, 1000 / FPS)
  }

  return (
    <>
      <WebCam
        audio={audioOn}
        muted={true}
        onUserMedia={beginStream}
        ref={webcamRef}
      />
      <img src={currentFrame} />
      <Chatroom messages={messages} socket={socket} />
    </>
  )
}

export default Cam;
