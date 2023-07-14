import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {botConfig} from '../../botConfig';
import {CoreStore} from '../../core/store/core.store';
import {styles} from '../../shared/styles/globalStyle';
import TextArea from '../../shared/components/TextArea';
import {Input} from '@rneui/themed';
import {Button, Text} from '@rneui/base';

type PreferencesProps = {
  navigation: NavigationProp<any, 'Preference'>;
};

export function Preferences({navigation}: PreferencesProps): JSX.Element {
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
      <Input
        placeholder="Comment vous appelez-vous ?"
        value={username || ''}
        onChangeText={setUsername}
      />
      <Button title="Enregistrer" onPress={saveUsername} />

      <Text style={[styles.fieldTitle]}>{'\n'}Contexte</Text>
      <TextArea
        nbLines={3}
        placeholder="Contexte système"
        value={context}
        onChangeText={setContext}
      />
      <Button title="Enregistrer" onPress={saveContext} />
    </View>
  );
}
