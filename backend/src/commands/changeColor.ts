import * as readline from 'readline';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on('connect', () => {
  console.log('Connected to server');
  promptForColor();
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  process.exit();
});

function promptForColor() {
  rl.question('Enter a color (or "exit" to quit): ', (color) => {
    if (color === 'exit') {
      socket.disconnect();
      rl.close();
    } else {
      console.log(`Changing color to ${color}`);
      socket.emit('change-color', color);
      promptForColor();
    }
  });
}
