import {Inject, Injectable} from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as redis from 'redis';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class AppService {
  redisClient;

  constructor() {
     this.redisClient = redis.createClient({
       host: 'redis-server'
     });
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, msg: string) {
    this.redisClient.set('test', 'hi world');

    this.redisClient.get('test', (err: any, value: string) => {
      if (err) {
        throw err;
      }
      console.log(value);
    });

    client.emit('message', msg);
    client.broadcast.emit('message', msg);
  }

  @SubscribeMessage('frame')
  async onFrame(client, image) {
    client.broadcast.emit('frame', image);
  }
}
