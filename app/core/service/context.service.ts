import {config} from '../../../config';
import localContexts from '../../contexts';
import {BotContext} from '../../shared/contexts.v1';
import {logger} from '../../utils/console.logger';
import {CoreStore} from '../store/core.store';

class ContextService {
  private apiEndpoint = '';
  private contexts: BotContext[] = [];

  constructor() {
    this.fetchContexts();
  }

  private async fetchContexts(): Promise<void> {
    try {
      const response = await fetch(config.CONTEXT.ENDPOINT, {
        method: config.CONTEXT.METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      this.contexts = JSON.parse(await response.json());
    } catch (err) {
      this.contexts = localContexts;
    }
  }

  async getContexts(): Promise<BotContext[]> {
    if (this.contexts.length === 0) {
      await this.fetchContexts();
    }
    const defaultContext = await CoreStore.getItem('DEFAULT_CONTEXT');
    return [
      {context: defaultContext, name: 'Chat', variables: [], request: '%DATA%'},
      ...this.contexts,
    ];
  }
}

export const contextService = new ContextService();
