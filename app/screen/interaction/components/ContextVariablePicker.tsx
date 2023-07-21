import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Option, Variable} from '../../../shared/contexts.v1';
import {Input, Text} from '@rneui/themed';

type ContextVariablePickerProps = {
  variable: Variable;
  onVariableChange: (optionValue: string) => void;
};

export function ContextVariablePicker({
  variable,
  onVariableChange,
}: ContextVariablePickerProps): JSX.Element {
  const [optionIdx, setOptionIdx] = useState(0);
  const [option, setOption] = useState<Option | undefined>(undefined);
  const [optionHaveData, setOptionHaveData] = useState(false);
  const [optionData, setOptionData] = useState<string>('');

  useEffect(() => {
    setOption(variable.options[optionIdx]);
    setOptionData('');
  }, [optionIdx, variable]);

  useEffect(() => {
    setOptionHaveData(Boolean(option?.value?.includes('%DATA%')));
  }, [option]);

  useEffect(() => {
    onVariableChange(option?.value.replace('%DATA%', optionData) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, optionData]);

  return (
    <View>
      <Text style={styles.bold}>{variable.name} :</Text>
      <Picker selectedValue={optionIdx} onValueChange={setOptionIdx}>
        {variable.options.map((opt, index) => (
          <Picker.Item
            key={`${variable.key}-${index}`}
            label={opt.name}
            value={index}
          />
        ))}
      </Picker>
      <Input
        style={optionHaveData ? styles.flex : styles.hidden}
        placeholder={option?.name || ''}
        onChangeText={setOptionData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  hidden: {
    display: 'none',
  },
  flex: {
    display: 'flex',
  },
});
