import contexts from '../../contexts';
import {CoreStore} from '../store/core.store';

// si l'option contient %DATA%, un champs texte dédié sera proposé et utilisé comme remplacement
export type Option = {name: string; value: string};
export type Variable = {key: string; name: string; options: Option[]};
// l'entrée utilisateur de la request sera inséré à la place de %DATA%
export type BotContext = {
  name: string;
  context: string;
  request: string;
  variables: Variable[];
};

class ContextService {
  private contexts: BotContext[] = [];

  constructor() {
    this.fetchContexts();
  }

  private async fetchContexts(): Promise<void> {
    // TODO fetch
    this.contexts = contexts;
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
