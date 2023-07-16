import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {openAiServiceHandler} from '../../core/service/openAi.service';
import {Divider} from '@rneui/themed';
import {Button, Text} from '@rneui/base';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import TextArea from '../../shared/components/TextArea';
import {
  BotContext,
  Variable,
  contextService,
} from '../../core/service/context.service';
import {ContextVariablePicker} from './components/ContextVariablePicker';

type InteractionProps = {
  navigation: NavigationProp<any, 'Interaction'>;
};

export function Interaction({navigation}: InteractionProps): JSX.Element {
  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [output, setOutput] = useState('');
  const [botContextIdx, setBotContextIdx] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [contextVariables, setContextVariables] = useState<Variable[]>([]);
  const [contexts, setContexts] = useState<BotContext[]>([]);
  const [selectedOptions, setSelectedOptions] = useState(
    {} as {[key: string]: string},
  );

  useEffect(() => {
    contextService.getContexts().then(ctx => {
      setContexts(ctx);
    });
  }, []);

  useEffect(() => {
    // défini les entrées par défaut
    // updateBotContextVariableOption(contexts[botContextIdx].variables[0])(0);
    // updateCustomVariableOption(contexts[botContextIdx].variables[0])('');
    if (contexts && contexts.length > botContextIdx) {
      setContextVariables(contexts[botContextIdx].variables);
    } else {
      setContextVariables([]);
    }
  }, [contexts, botContextIdx]);

  const send = async () => {
    setSendButtonDisabled(true);
    setLastInput(input);
    setInput('');
    const openAiService = await openAiServiceHandler.getInstance();

    const userOptions = Object.entries(selectedOptions).reduce(
      (prev, [variableKey, value]) => {
        return {
          ...prev,
          [variableKey]: value,
        };
      },
      {},
    );

    const result = await openAiService.write(
      contexts[botContextIdx],
      input,
      userOptions,
    );
    setOutput(result);
    setSendButtonDisabled(false);
  };

  function onVariableChangeBuilder(
    viariableKey: string,
  ): (selectedOption: string) => void {
    return (optionValue: string) => {
      setSelectedOptions({
        ...selectedOptions,
        [viariableKey]: optionValue,
      });
    };
  }

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

      {contextVariables.map(variable => (
        <ContextVariablePicker
          key={`${botContextIdx}-${variable.key}`}
          variable={variable}
          onVariableChange={onVariableChangeBuilder(variable.key)}
        />
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
