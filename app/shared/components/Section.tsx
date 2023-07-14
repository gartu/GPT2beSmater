/* eslint-disable prettier/prettier */
import React from 'react';
import {PropsWithChildren} from 'react';
import {View, useColorScheme} from 'react-native';
import {styles} from '../styles/globalStyle';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text} from '@rneui/base';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
