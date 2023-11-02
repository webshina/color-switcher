import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [color, setColor] = useState('#000000'); // default to black

  useEffect(() => {
    // setup WebSocket connection
    const socket = io('https://c5f7-153-125-143-186.ngrok-free.app');

    socket.on('connect', () => {
      console.log('connected to socket');
    });

    // listen for all events
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('color-changed', (newColor) => {
      console.log('new color', newColor);
      setColor(newColor);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ backgroundColor: color, width: '100vw', height: '100vh' }}>
      {/* Your content goes here */}
    </div>
  );
};

export default Home;
