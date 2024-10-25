import OpenAI from 'openai';

export class OpenAIService {
  private client: OpenAI | null = null;

  initialize(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: This is for demo purposes only
    });
  }

  async streamCompletion(content: string, temperature: number, 
    onToken: (token: string) => void) {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    const stream = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'You are a helpful AI manuscript editor. Analyze the text and provide constructive feedback.'
      }, {
        role: 'user',
        content
      }],
      temperature,
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || '';
      if (token) {
        onToken(token);
      }
    }
  }
}

export const openAIService = new OpenAIService();