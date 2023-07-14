import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CoreStore} from '../../core/store/core.store';
import {Section} from '../../shared/components/Section';
import {openAiServiceHandler} from '../../core/api/openAi.service';
import {logger} from '../../utils/console.logger';
import {NavigationProp} from '@react-navigation/native';
import {styles} from '../../shared/styles/globalStyle';
import {Button, Text} from '@rneui/base';
import {Input} from '@rneui/themed';
import TextArea from '../../shared/components/TextArea';

type ParametersProps = {
  navigation: NavigationProp<any, 'ParametersScreen'>;
};

export function Parameters({navigation}: ParametersProps): JSX.Element {
  const [apiKey, setApiKey] = useState('');
  const [apiModel, setApiModel] = useState('gpt-3.5-turbo');

  useEffect(() => {
    updateApiKeyFromStorage();
    updateApiModelFromStorage();
  }, []);

  // gestion de la clé d'API
  const updateApiKeyFromStorage = async () => {
    setApiKey(await CoreStore.getItem('API_KEY'));
  };
  const saveApiKey = async () => {
    await CoreStore.storeItem('API_KEY', apiKey);
    openAiServiceHandler.rebuild();
  };

  // gestion du modèle
  const updateApiModelFromStorage = async () => {
    setApiKey(await CoreStore.getItem('API_MODEL'));
  };
  const saveApiModel = () => {
    CoreStore.storeItem('API_MODEL', apiModel);
  };

  const apiCheck = async () => {
    const openAiService = await openAiServiceHandler.getInstance();
    const result = await openAiService.writeRaw(
      'Check, check. Respond check please ...',
    );
    logger.log(`result : ${result}`);
  };

  return (
    <View>
      <Text style={[styles.fieldTitle]}>{'\n'}Modèle à utiliser</Text>
      <Input
        placeholder="Modèle à utiliser"
        value={apiModel || ''}
        onChangeText={setApiModel}
      />
      <Button title="Enregistrer" onPress={saveApiModel} />

      <Text style={[styles.fieldTitle]}>{'\n'}Clé API d'OpenAI</Text>
      <TextArea
        nbLines={2}
        placeholder="Ajouter votre clé d'API OpenAI ici"
        value={apiKey}
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
