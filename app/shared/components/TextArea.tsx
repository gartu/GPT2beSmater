import {Input} from '@rneui/base';
import React, {PropsWithChildren, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {inputStyle} from '../../core/theme/theme';

type TextAreaProps = PropsWithChildren<{
  placeholder?: string;
  value?: string;
  nbLines?: number;
  onChangeText: (text: string) => void;
}>;

const TextArea = (props: TextAreaProps) => {
  const [text, setText] = useState(props.value);
  const defaultNbLine = props.nbLines === undefined ? 4 : props.nbLines;

  const handleTextChange = (value: string) => {
    setText(value);
    props.onChangeText(value);
  };

  return (
    <View style={styles.container}>
      <Input
        multiline
        placeholder={props.placeholder}
        numberOfLines={defaultNbLine}
        value={text}
        onChangeText={handleTextChange}
        style={styles.textArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textArea: inputStyle,
});

export default TextArea;
