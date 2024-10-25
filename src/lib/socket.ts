import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin
  : 'http://localhost:3000';

class SocketService {
  private socket;

  constructor() {
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  analyzeText(content: string, temperature: number, 
    onToken: (token: string) => void,
    onComplete: () => void,
    onError: (error: string) => void) {
    
    this.socket.emit('analyze-text', { content, temperature });

    this.socket.on('token', onToken);
    this.socket.on('complete', onComplete);
    this.socket.on('error', onError);

    return () => {
      this.socket.off('token', onToken);
      this.socket.off('complete', onComplete);
      this.socket.off('error', onError);
    };
  }
}

export const socketService = new SocketService();