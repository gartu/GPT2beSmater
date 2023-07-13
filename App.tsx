/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PreferencesScreen as PreferencesScreen} from './app/preferencesScreen/PreferencesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {InteractionScreen} from './app/interactionScreen/InteractionScreen';
import {ParametersScreen} from './app/parametersScreen/ParametersScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </SafeAreaView>
      <Drawer.Navigator initialRouteName="InteractionScreen">
        <Drawer.Screen
          name="InteractionScreen"
          component={InteractionScreen}
          options={{title: 'Chat'}}
        />
        <Drawer.Screen
          name="PreferencesScreen"
          component={PreferencesScreen}
          options={{title: 'Préférences'}}
        />
        <Drawer.Screen
          name="ParametersScreen"
          component={ParametersScreen}
          options={{title: 'Paramètres'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    /*
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>*/
  );
}

export default App;
