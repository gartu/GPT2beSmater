import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {openAiServiceHandler} from '../../core/api/openAi.service';
import {styles} from '../../shared/styles/globalStyle';
import {Divider} from '@rneui/themed';
import {Button, Input, Text} from '@rneui/base';

type InteractionProps = {
  navigation: NavigationProp<any, 'Interaction'>;
};

export function Interaction({navigation}: InteractionProps): JSX.Element {
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
      <Divider />
      <Input
        placeholder="Ma question est .."
        value={''}
        onChangeText={setInput}
      />
      <Button title="Envoyer" onPress={send} />
    </View>
  );
}
