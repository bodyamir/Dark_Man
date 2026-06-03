import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });
  }

  async generatePost(topic: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are NEX, an AI assistant for NEXORA social media platform. Generate engaging social media posts.',
        },
        {
          role: 'user',
          content: `Generate an engaging social media post about: ${topic}`,
        },
      ],
      max_tokens: 280,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  }

  async generateCaption(topic: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Generate creative and engaging captions for social media posts.',
        },
        {
          role: 'user',
          content: `Generate a caption for an image about: ${topic}`,
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  }

  async translateContent(content: string, targetLanguage: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Translate content to ${targetLanguage}. Only return the translation, no explanations.`,
        },
        {
          role: 'user',
          content,
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  }

  async summarizeContent(content: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Summarize the given content concisely.',
        },
        {
          role: 'user',
          content,
        },
      ],
      max_tokens: 200,
    });

    return response.choices[0].message.content;
  }

  async moderateContent(content: string): Promise<{ flagged: boolean; reason?: string }> {
    const response = await this.openai.moderations.create({
      input: content,
    });

    const moderation = response.results[0];
    return {
      flagged: moderation.flagged,
      reason: moderation.flagged ? Object.keys(moderation.categories).find(key => moderation.categories[key]) : undefined,
    };
  }

  async detectSpam(content: string): Promise<boolean> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Analyze if the given text is spam. Respond with only "true" or "false".',
        },
        {
          role: 'user',
          content,
        },
      ],
      max_tokens: 10,
    });

    return response.choices[0].message.content.toLowerCase().includes('true');
  }

  async recommendFriends(userId: string, userInterests: string[]): Promise<string[]> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Based on user interests, recommend similar users. Return JSON array of user IDs.',
        },
        {
          role: 'user',
          content: `User interests: ${userInterests.join(', ')}. Recommend 5 similar user profiles.`,
        },
      ],
      max_tokens: 100,
    });

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch {
      return [];
    }
  }

  async getAiAssistantResponse(query: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are NEX, NEXORA\'s AI assistant. Help users with questions and provide guidance about the platform.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  }
}
