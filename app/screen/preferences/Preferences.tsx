import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CoreStore} from '../../core/store/core.store';
import {styles} from '../../shared/styles/globalStyle';
import {Input} from '@rneui/themed';
import {Button, Text} from '@rneui/base';
import {Section} from '../../shared/components/Section';

type PreferencesProps = {
  navigation: NavigationProp<any, 'Preference'>;
};

export function Preferences({navigation}: PreferencesProps): JSX.Element {
  const [username, setUsername] = useState('');

  useEffect(() => {
    updateUsernameFromStorage();
  }, []);

  // gestion du nom d'utilisateur
  const updateUsernameFromStorage = async () => {
    setUsername(await CoreStore.getItem('USERNAME'));
  };
  const saveUsername = () => {
    CoreStore.storeItem('USERNAME', username);
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
      <Section title="A venir">
        Des contextes personnalisés pourront être ajouté ici
      </Section>
    </View>
  );
}
