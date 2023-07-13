import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {CoreStore} from '../core/store/core.store';
import {NavigationProp} from '@react-navigation/native';
import {styles} from '../shared/styles/globalStyle';
import {botConfig} from '../botConfig';

type PreferencesScreenProps = {
  navigation: NavigationProp<any, 'PreferenceScreen'>;
};

export function PreferencesScreen({
  navigation,
}: PreferencesScreenProps): JSX.Element {
  const [username, setUsername] = useState('');
  const [context, setContext] = useState(botConfig.context);

  useEffect(() => {
    updateUsernameFromStorage();
    updateContextFromStorage();
  }, []);

  // gestion du nom d'utilisateur
  const updateUsernameFromStorage = async () => {
    setUsername(await CoreStore.getItem('USER_NAME'));
  };
  const saveUsername = () => {
    CoreStore.storeItem('USER_NAME', username);
  };

  const updateContextFromStorage = async () => {
    const storedContext = await CoreStore.getItem('BOT_CONTEXT');
    if (storedContext) {
      setContext(await CoreStore.getItem('BOT_CONTEXT'));
    }
  };
  const saveContext = () => {
    CoreStore.storeItem('BOT_CONTEXT', context);
  };

  return (
    <View>
      <Text style={[styles.fieldTitle]}>{'\n'}Prénom</Text>
      <TextInput
        placeholder="Comment vous appelez-vous ?"
        value={username || ''}
        onChangeText={setUsername}
      />
      <Button title="Enregistrer" onPress={saveUsername} />

      <Text style={[styles.fieldTitle]}>{'\n'}Contexte</Text>
      <TextInput
        placeholder="Contexte système"
        value={context || ''}
        onChangeText={setContext}
      />
      <Button title="Enregistrer" onPress={saveContext} />
    </View>
  );
}
