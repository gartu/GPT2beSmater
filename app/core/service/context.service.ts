import {config} from '../../../config';
import localContexts from '../../contexts';
import {BotContext} from '../../shared/contexts.v1';
import {logger} from '../../utils/console.logger';
import {CoreStore} from '../store/core.store';

class ContextService {
  private apiEndpoint = '';
  private contexts: BotContext[] = [];

  constructor() {
    this.buildContexts();
  }

  private async buildContexts() {
    if (await this.isCachedContextValid()) {
      this.updateContextsFromCache();
    } else {
      this.fetchContexts();
    }
  }

  private async updateContextsFromCache() {
    this.contexts = (await CoreStore.getObject<BotContext[]>('CONTEXTS')) || [];
  }

  private async isCachedContextValid(): Promise<boolean> {
    const lastUpdatedDate = +(await CoreStore.getItem(
      'LAST_UPDATED_CONTEXT_TIME',
    ));
    if (!lastUpdatedDate) {
      return false;
    }
    const isValid =
      lastUpdatedDate + config.CONTEXT.VALIDITY_TIME_MS > new Date().getTime();
    if (!isValid) {
      return false;
    }

    const contexts = await CoreStore.getObject<BotContext[]>('CONTEXTS');
    if (!contexts) {
      return false;
    }
    return contexts.length > 0;
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
      CoreStore.storeObject('CONTEXTS', this.contexts);
      CoreStore.storeItem(
        'LAST_UPDATED_CONTEXT_TIME',
        `${new Date().getTime()}`,
      );
    } catch (err) {
      this.contexts = localContexts;
    }
  }

  async getContexts(): Promise<BotContext[]> {
    if (this.contexts.length === 0 || !this.isCachedContextValid()) {
      await this.fetchContexts();
    }
    const defaultContext = await CoreStore.getItem('DEFAULT_CHAT_CONTEXT');
    return [
      {context: defaultContext, name: 'Chat', variables: [], request: '%DATA%'},
      ...this.contexts,
    ];
  }
}

export const contextService = new ContextService();
