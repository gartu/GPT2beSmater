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
