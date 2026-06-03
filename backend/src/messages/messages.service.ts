import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async sendMessage(senderId: string, sendMessageDto: SendMessageDto): Promise<Message> {
    const conversationId = this.generateConversationId(senderId, sendMessageDto.recipientId);

    const message = this.messagesRepository.create({
      conversationId,
      senderId,
      recipientId: sendMessageDto.recipientId,
      content: sendMessageDto.content,
      attachments: sendMessageDto.attachments || [],
      isEncrypted: sendMessageDto.isEncrypted || false,
    });

    return this.messagesRepository.save(message);
  }

  async getConversations(userId: string) {
    const messages = await this.messagesRepository.find({
      where: [
        { senderId: userId },
        { recipientId: userId },
      ],
      order: { createdAt: 'DESC' },
      take: 50,
    });

    const conversations = new Map();
    messages.forEach((msg) => {
      const otherUserId = msg.senderId === userId ? msg.recipientId : msg.senderId;
      if (!conversations.has(otherUserId)) {
        conversations.set(otherUserId, msg);
      }
    });

    return Array.from(conversations.values());
  }

  async getMessages(userId: string, conversationId: string, page: number) {
    const limit = 20;
    const [messages, total] = await this.messagesRepository.findAndCount({
      where: { conversationId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(userId: string, messageId: string) {
    const message = await this.messagesRepository.findOne({ where: { id: messageId } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isRead = true;
    message.readAt = new Date();
    await this.messagesRepository.save(message);

    return { message: 'Message marked as read' };
  }

  private generateConversationId(userId1: string, userId2: string): string {
    const sorted = [userId1, userId2].sort();
    return `${sorted[0]}_${sorted[1]}`;
  }
}
