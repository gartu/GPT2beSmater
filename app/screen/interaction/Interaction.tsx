import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {openAiServiceHandler} from '../../core/api/openAi.service';
import {Divider} from '@rneui/themed';
import {Button, Input, Text} from '@rneui/base';
import {Picker} from '@react-native-picker/picker';
import contexts, {Option, Variable} from '../../contexts';
import {ScrollView} from 'react-native-gesture-handler';
import TextArea from '../../shared/components/TextArea';
import {logger} from '../../utils/console.logger';

type InteractionProps = {
  navigation: NavigationProp<any, 'Interaction'>;
};

export function Interaction({navigation}: InteractionProps): JSX.Element {
  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [output, setOutput] = useState('');
  const [botContextIdx, setBotContextIdx] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [userVariables, setUserVariables] = useState(
    {} as {[key: string]: number},
  );
  const [userVariablesOptionData, setUserVariablesOptionData] = useState(
    {} as {[key: string]: string},
  );

  useEffect(() => {
    // défini les entrées par défaut
    updateBotContextVariableOption(contexts[botContextIdx].variables[0])(0);
    updateCustomVariableOption(contexts[botContextIdx].variables[0])('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateBotContextVariableOption(
    variable: Variable,
  ): (optionIdx: number) => void {
    return (optionIdx: number) => {
      setUserVariables({
        ...userVariables,
        [variable.key]: optionIdx,
      });
    };
  }

  function updateCustomVariableOption(
    variable: Variable,
  ): (optionData: string) => void {
    return (optionData: string) => {
      setUserVariablesOptionData({
        ...userVariablesOptionData,
        [variable.key]: optionData,
      });
    };
  }

  const variableOptionHaveData = (variable: Variable): boolean => {
    const option = getVariableOption(variable);
    return option ? option.value.includes('%DATA%') : false;
  };

  const getVariableOption = (variable: Variable): Option | undefined => {
    if (variable.key in userVariables) {
      return variable.options[userVariables[variable.key]];
    }
    return undefined;
  };

  const send = async () => {
    setSendButtonDisabled(true);
    setLastInput(input);
    setInput('');
    const openAiService = await openAiServiceHandler.getInstance();

    const selectedVariables = contexts[botContextIdx].variables;
    const userOptions = selectedVariables.reduce(
      (prev, variable) => ({
        ...prev,
        [variable.key]: variable.options[
          userVariables[variable.key]
        ].value.replace('%DATA%', userVariablesOptionData[variable.key]),
      }),
      {},
    );

    logger.log(selectedVariables);
    logger.log('Before call');
    logger.log(input);
    logger.log(userOptions);
    const result = await openAiService.write(
      contexts[botContextIdx],
      input,
      userOptions,
    );
    setOutput(result);
    setSendButtonDisabled(false);
  };

  return (
    <ScrollView>
      <Text style={[styles.messageBox, styles.odd]}>{lastInput}</Text>
      <Text style={[styles.messageBox, styles.even]}>{output}</Text>
      <Divider />
      <Text style={styles.bold}>Configuration :</Text>
      <Picker selectedValue={botContextIdx} onValueChange={setBotContextIdx}>
        {contexts.map((item, index) => (
          <Picker.Item key={`ctx-${index}`} label={item.name} value={index} />
        ))}
      </Picker>

      {contexts[botContextIdx].variables.map(variable => (
        <View key={variable.key}>
          <Text style={styles.bold}>{variable.name} :</Text>
          <Picker
            selectedValue={userVariables[variable.key]}
            onValueChange={updateBotContextVariableOption(variable)}>
            {variable.options.map((option, index) => (
              <Picker.Item
                key={`${botContextIdx}-${variable.key}-${index}`}
                label={option.name}
                value={index}
              />
            ))}
          </Picker>
          {variableOptionHaveData(variable) ? (
            <Input
              placeholder={getVariableOption(variable)?.name}
              onChangeText={updateCustomVariableOption(variable)}
            />
          ) : (
            ''
          )}
        </View>
      ))}

      <TextArea
        nbLines={2}
        placeholder="Ma question est .."
        value={input}
        onChangeText={setInput}
      />
      <Button disabled={sendButtonDisabled} title="Envoyer" onPress={send} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bold: {
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  messageBox: {
    padding: 10,
    margin: 2,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderRadius: 5,
  },
  even: {
    backgroundColor: '#9886c6',
  },
  odd: {
    backgroundColor: '#60499d',
  },
});
