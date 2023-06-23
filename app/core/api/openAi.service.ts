import {Configuration, OpenAIApi} from 'openai';
import {CoreStore} from '../store/core.store';

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

  public listModels() {
    try {
      this.openAiApi.listModels();
    } catch (error) {
      console.log(error);
    }
  }

  public async writeRaw(message: string): Promise<string> {
    // {
    //   model: "gpt-3.5-turbo",
    //   messages: [{role: "user", content: "Hello world"}],
    // }

    return `write ${message}`;
  }
}
