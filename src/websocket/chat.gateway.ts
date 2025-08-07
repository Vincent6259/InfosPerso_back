import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, specify your React app's origin
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private connectedClients: number = 0;

  // Called when a client connects
  handleConnection(client: Socket) {
    this.connectedClients++;
    console.log(`Client connected: ${client.id}`);
    console.log(`Total connected clients: ${this.connectedClients}`);
    
    // Broadcast to all clients that someone joined
    this.server.emit('userCount', {
      count: this.connectedClients,
      message: 'A new user has joined the chat'
    });
  }

  // Called when a client disconnects
  handleDisconnect(client: Socket) {
    this.connectedClients--;
    console.log(`Client disconnected: ${client.id}`);
    console.log(`Total connected clients: ${this.connectedClients}`);
    
    // Broadcast to all clients that someone left
    this.server.emit('userCount', {
      count: this.connectedClients,
      message: 'A user has left the chat'
    });
  }

  // Handle 'sendMessage' events from clients
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { sender: string; text: string }) {
    console.log(`Message received from ${payload.sender}: ${payload.text}`);
    
    // Broadcast the message to all connected clients
    this.server.emit('newMessage', {
      id: Date.now(),
      sender: payload.sender,
      text: payload.text,
      timestamp: new Date().toISOString()
    });
    
    // You could also send to specific rooms or clients:
    // client.broadcast.emit('newMessage', payload); // Send to all except sender
    // this.server.to('roomName').emit('newMessage', payload); // Send to a specific room
  }
}