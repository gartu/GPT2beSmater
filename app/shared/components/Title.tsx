/* eslint-disable prettier/prettier */
import {Text} from '@rneui/themed';
import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type TitleProps = PropsWithChildren<{}>;

export function Title({children}: TitleProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
