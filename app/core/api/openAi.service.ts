import {Configuration, OpenAIApi} from 'openai';
import {CoreStore} from '../store/core.store';
import {logger} from '../../utils/console.logger';

class OpenAiServiceHandler {
  private openAiService: OpenAiService | null = null;

  private async build(): Promise<OpenAiService> {
    const apiKey = await CoreStore.getItem('API_KEY');
    const configuration = new Configuration({
      apiKey: apiKey,
    });

    this.openAiService = new OpenAiService(new OpenAIApi(configuration));
    return this.openAiService;
  }

  public rebuild() {
    this.build();
  }

  getInstance(): Promise<OpenAiService> {
    if (this.openAiService === null) {
      return this.build();
    }
    return Promise.resolve(this.openAiService);
  }
}

export const openAiServiceHandler = new OpenAiServiceHandler();

class OpenAiService {
  constructor(private openAiApi: OpenAIApi) {}

  // TODO implémenter un timer entre 2 messages pour éviter les code 429 de rate limit

  public async listModels() {
    try {
      const res = await this.openAiApi.listModels();
      res.data.data
        .sort((a, b) => a.id.localeCompare(b.id))
        .forEach(el => logger.log(el.id));
    } catch (error) {
      logger.log(error);
    }
  }

  public async writeRaw(content: string): Promise<string> {
    try {
      const chatCompletion = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: 'You are a helpful assistant.'},
          {role: 'user', content},
        ],
      });
      const response = chatCompletion.data.choices[0].message;
      logger.log(response);

      return response?.content || '';
    } catch (error) {
      logger.log(error);
      return '';
    }
  }
}
