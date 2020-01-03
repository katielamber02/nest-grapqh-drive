import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatService, ChatResolver],
  controllers: [ChatController]
})
export class ChatModule {}
