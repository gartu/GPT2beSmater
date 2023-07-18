import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CoreStore} from '../../core/store/core.store';
import {styles} from '../../shared/styles/globalStyle';
import {Input} from '@rneui/themed';
import {Button, Text} from '@rneui/base';
import {Section} from '../../shared/components/Section';
import {chat} from '../../contexts';
import TextArea from '../../shared/components/TextArea';

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
    CoreStore.storeItem('DEFAULT_CONTEXT', defaultContext);
  };

  // gestion du nom d'utilisateur
  const updateFieldsFromStorage = async () => {
    setUsername(await CoreStore.getItem('USERNAME'));
    const existingContext = await CoreStore.getItem('DEFAULT_CONTEXT');
    setDefaultContext(existingContext || chat);
  };

  return (
    <View>
      <Text style={[styles.fieldTitle]}>{'\n'}Prénom</Text>
      <Input
        placeholder="Comment vous appelez-vous ?"
        value={username || ''}
        onChangeText={setUsername}
      />
      <Text style={[styles.fieldTitle]}>{'\n'}Contexte de chat par défaut</Text>
      <TextArea
        nbLines={4}
        placeholder="Entrez ici le contexte de chat par défaut"
        value={defaultContext || ''}
        onChangeText={setDefaultContext}
      />
      <Button title="Enregistrer" onPress={save} />
      <Section title="A venir">
        Des contextes personnalisés pourront être ajouté ici
      </Section>
    </View>
  );
}
