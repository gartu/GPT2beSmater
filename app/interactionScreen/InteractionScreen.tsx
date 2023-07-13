import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {openAiServiceHandler} from '../core/api/openAi.service';
import {styles} from '../shared/styles/globalStyle';

type InteractionScreenProps = {
  navigation: NavigationProp<any, 'InteractionScreen'>;
};

export function InteractionScreen({
  navigation,
}: InteractionScreenProps): JSX.Element {
  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {}, []);

  const send = async () => {
    setLastInput(input);
    setInput('');
    const openAiService = await openAiServiceHandler.getInstance();
    const result = await openAiService.writeRaw(input);
    setOutput(result);
  };

  return (
    <View>
      <Text style={[styles.messageBox, styles.odd]}>{lastInput}</Text>
      <Text style={[styles.messageBox, styles.even]}>{output}</Text>

      <TextInput
        placeholder="Ma question est .."
        value={''}
        onChangeText={setInput}
      />
      <Button title="Envoyer" onPress={send} />
    </View>
  );
}
