import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@rneui/themed';

type TwoButtonProps = PropsWithChildren<{
  btn1: {title: string; disabled?: boolean; onPress: () => void};
  btn2: {title: string; disabled?: boolean; onPress: () => void};
}>;

export function TwoButton({children, btn1, btn2}: TwoButtonProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Button
        title={btn1.title}
        disabled={btn1.disabled}
        onPress={btn1.onPress}
      />
      <Button
        title={btn2.title}
        disabled={btn2.disabled}
        onPress={btn2.onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
