import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai';
import {CoreStore} from '../store/core.store';
import {logger} from '../../utils/console.logger';
import {BotContext, Variable} from '../../shared/contexts.v1';

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

  public async listModels(): Promise<string[]> {
    try {
      const res = await this.openAiApi.listModels();
      return res.data.data
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(el => el.id);
    } catch (error) {
      logger.log(error);
    }
    return [];
  }

  public async write(
    botContext: BotContext,
    userContent: string,
    userOption: {[key: string]: string},
  ): Promise<string> {
    logger.log(userOption);
    const replacementKeys = botContext.variables.map((variable: Variable) => ({
      key: `%${variable.key}%`,
      value: userOption[variable.key],
    }));

    const updatedContext = replacementKeys.reduce(
      (prev, curr) => prev.replace(curr.key, curr.value || ''),
      botContext.context,
    );
    const content = botContext.request.replace('%DATA%', userContent);

    return this.writeRaw(updatedContext, content);
  }

  public async writeRaw(
    context: string,
    content: string,
    forceNewDialog?: boolean,
  ): Promise<string> {
    logger.log(context);
    logger.log(content);

    try {
      const model = await CoreStore.getItem('API_MODEL');
      const username = (await CoreStore.getItem('USERNAME')) || 'Anonyme';

      const newLine: ChatCompletionRequestMessage = {
        role: 'user',
        content: content.replace('%USERNAME%', username),
      };

      const chatHistory: ChatCompletionRequestMessage[] =
        (await CoreStore.getObject('CHAT_HISTORY')) || [];

      let messages: ChatCompletionRequestMessage[] = [];
      if (!forceNewDialog && chatHistory.length > 0) {
        messages = [...chatHistory, newLine];
      } else {
        messages = [
          {
            role: 'system',
            content: context.replace('%USERNAME%', username),
          },
          newLine,
        ];
      }

      const chatCompletion = await this.openAiApi.createChatCompletion({
        model,
        messages,
      });

      if (!forceNewDialog) {
        CoreStore.storeObject('CHAT_HISTORY', messages);
      }

      logger.log(chatCompletion.data.choices);
      const response = chatCompletion.data.choices[0].message;
      logger.log(response);

      return response?.content || '';
    } catch (error) {
      logger.log(error);
      return '';
    }
  }
}
