import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {CoreStore} from '../../core/store/core.store';
import {Section} from '../../shared/components/Section';
import {openAiServiceHandler} from '../../core/api/openAi.service';
import {logger} from '../../utils/console.logger';

export function Preferences(): JSX.Element {
  const [apiKey, setApiKey] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    updateApiKey();
    updateUsername();
  }, []);

  // gestion de la clé d'API
  const updateApiKey = async () => {
    setApiKey(await CoreStore.getItem('API_KEY'));
  };
  const saveApiKey = async () => {
    await CoreStore.storeItem('API_KEY', apiKey);
    openAiServiceHandler.rebuild();
  };

  // gestion du nom d'utilisateur
  const updateUsername = async () => {
    setApiKey(await CoreStore.getItem('USER_NAME'));
  };
  const saveUsername = () => {
    CoreStore.storeItem('USER_NAME', username);
  };

  const apiCheck = async () => {
    const openAiService = await openAiServiceHandler.getInstance();
    openAiService.listModels();
    const result = await openAiService.writeRaw('Hello =)');
    logger.log(`result : ${result}`);
  };

  return (
    <View>
      <TextInput
        placeholder="Comment vous appelez-vous ?"
        value={username || ''}
        onChangeText={setUsername}
      />
      <Button title="Enregistrer" onPress={saveUsername} />

      <TextInput
        placeholder="Ajouter votre clé d'API OpenAI ici"
        value={apiKey || ''}
        onChangeText={setApiKey}
      />
      <Button title="Enregistrer" onPress={saveApiKey} />

      <Section title="API Check">
        Cliquez sur le bouton ci-dessous pour vérifier le bon fonctionnement de
        votre clé d'API.
      </Section>

      <Text />
      <Button title="Vérifier la connexion à l'API" onPress={apiCheck} />
    </View>
  );
}
