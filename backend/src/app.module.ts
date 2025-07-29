import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './openaichat/openaichat.controller';
import { OpenaiService } from './openai/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ChatController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
