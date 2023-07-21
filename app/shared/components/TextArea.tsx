import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import {inputStyle} from '../../core/theme/theme';
import {Input} from '@rneui/themed';

type TextAreaProps = PropsWithChildren<{
  placeholder?: string;
  value?: string;
  nbLines?: number;
  onChangeText: (text: string) => void;
}>;

const TextArea = (props: TextAreaProps) => {
  const defaultNbLine = props.nbLines === undefined ? 4 : props.nbLines;

  const handleTextChange = (value: string) => {
    props.onChangeText(value);
  };

  return (
    <View>
      <Input
        multiline
        placeholder={props.placeholder}
        numberOfLines={defaultNbLine}
        value={props.value}
        onChangeText={handleTextChange}
        style={styles.textArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: inputStyle,
});

export default TextArea;
