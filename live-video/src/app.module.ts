import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport } from "@nestjs/common/enums/transport.enum";

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CAM_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       url: 'redis://redis-server',
    //     }
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
