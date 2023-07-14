/* eslint-disable prettier/prettier */
import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from '@rneui/base';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
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
        {title}
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
});
