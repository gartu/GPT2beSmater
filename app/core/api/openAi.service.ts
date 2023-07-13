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
  constructor(private openAiApi: OpenAIApi) {
    // logger.log('Modèles disponibles :');
    // this.listModels();
  }

  // TODO implémenter un timer entre 2 messages pour éviter les code 429 de rate limit

  private async listModels() {
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
      const model = await CoreStore.getItem('API_MODEL');
      const username = await CoreStore.getItem('USER_NAME');
      const context = await CoreStore.getItem('BOT_CONTEXT');
      const chatCompletion = await this.openAiApi.createChatCompletion({
        model,
        messages: [
          {
            role: 'system',
            content: context.replace('USER_NAME', username),
          },
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
