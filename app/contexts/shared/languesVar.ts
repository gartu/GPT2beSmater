import {Variable} from '../../shared/contexts.v1';

const languesVar: Variable = {
  key: 'LANGUAGE',
  name: 'Langue',
  options: [
    {
      name: 'Français',
      value: 'Français',
    },
    {
      name: 'Anglais',
      value: 'Anglais',
    },
    {
      name: 'Italien',
      value: 'Italien',
    },
    {
      name: 'Portugais',
      value: 'Portugais',
    },
    {
      name: 'Espagnol',
      value: 'Espagnol',
    },
    {
      name: 'Autre',
      value: '%DATA%',
    },
  ],
};

export default (key: string, name: string) => ({...languesVar, key, name});
