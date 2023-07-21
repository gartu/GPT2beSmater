import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Title} from './Title';
import {Text} from '@rneui/themed';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
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
    paddingHorizontal: 10,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
});
