import React, {useEffect, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {CoreStore} from '../../core/store/core.store';
import {styles} from '../../shared/styles/globalStyle';
import {Input} from '@rneui/themed';
import {Button, Text} from '@rneui/base';
import {chat} from '../../contexts';
import TextArea from '../../shared/components/TextArea';
import {ScrollView} from 'react-native-gesture-handler';
import {ToastAndroid} from 'react-native';

type PreferencesProps = {
  navigation: NavigationProp<any, 'Preference'>;
};

export function Preferences({navigation}: PreferencesProps): JSX.Element {
  const [username, setUsername] = useState('');
  const [defaultContext, setDefaultContext] = useState('');

  useEffect(() => {
    updateFieldsFromStorage();
  }, []);

  const save = () => {
    CoreStore.storeItem('USERNAME', username);
    CoreStore.storeItem('DEFAULT_CHAT_CONTEXT', defaultContext);
  };

  // gestion du nom d'utilisateur
  const updateFieldsFromStorage = async () => {
    setUsername(await CoreStore.getItem('USERNAME'));
    const existingContext = await CoreStore.getItem('DEFAULT_CHAT_CONTEXT');
    setDefaultContext(existingContext || chat);
  };

  const updateContexts = () => {
    CoreStore.remove('LAST_UPDATED_CONTEXT_TIME');
    CoreStore.remove('CONTEXTS');
    ToastAndroid.show(
      `Relancer l'application afin de terminer la mise à jour.`,
      ToastAndroid.SHORT,
    );
  };

  return (
    <ScrollView>
      <Text style={[styles.fieldTitle]}>{'\n'}Prénom</Text>
      <Input
        placeholder="Comment vous appelez-vous ?"
        value={username || ''}
        onChangeText={setUsername}
      />
      <Text style={[styles.fieldTitle]}>{'\n'}Contexte du chat par défaut</Text>
      <TextArea
        nbLines={4}
        placeholder="Entrez ici le contexte du chat par défaut"
        value={defaultContext || ''}
        onChangeText={setDefaultContext}
      />
      <Button title="Enregistrer" onPress={save} />
      <Text></Text>
      <Button
        title="Mettre à jour les configurations de chat"
        onPress={updateContexts}
      />
    </ScrollView>
  );
}
