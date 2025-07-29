import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('message')
  async getMessageWithPrompt(@Body() body: { message: string }): Promise<string> {
    const { message } = body;

    const chatReply = await this.openaiService.getChatResponse(message);

    return chatReply;
  }
}
