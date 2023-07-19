import {BotContext} from '../shared/contexts.v1';
import analogiesVar from './shared/analogiesVar';

const memotechnic: BotContext = {
  name: 'Moyen mémotechnique',
  context: `Tu es un génie de créativité et ton rôle de trouver d'efficaces et surprenants moyens mémotechniques sur le sujet mentionné entre \`\`\`.
  %ANALOGY%
  Ne paraphrase pas la demande.
  Donne au moins 3 idées.
  Répond en maximum 150 mots.`,
  request: `Sujet : 
  \`\`\`%DATA%\`\`\``,
  variables: [analogiesVar],
};

export default memotechnic;
