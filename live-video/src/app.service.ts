import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class AppService {

  @SubscribeMessage('message')
  async onMessage(client: Socket, msg: string) {
    client.emit('message', msg);
    client.broadcast.emit('message', msg);
  }

  @SubscribeMessage('frame')
  async onFrame(client, image) {
    client.broadcast.emit('frame', image);
  }
}
